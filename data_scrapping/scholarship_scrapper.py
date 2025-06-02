from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from urllib.parse import urljoin

from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime, timezone

# ---------- 1) Setup headless Chrome and suppress noisy logs ----------
options = Options()
options.add_argument("--headless")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-software-rasterizer")
options.add_argument("--log-level=3")  # only fatal errors

driver = webdriver.Chrome(options=options)
wait = WebDriverWait(driver, 10)

# ---------- 2) Collect only valid scholarship links ----------
base_url = "https://www.buddy4study.com/scholarships"
query   = "?filter=eyJSRUxJR0lPTiI6W10sIkdFTkRFUiI6W10sIkVEVUNBVElPTiI6W10sIkNPVU5UUlkiOltdLCJDT1VSU0UiOltdLCJTVEFURSI6W10sIkZPUkVJR04iOltdLCJzb3J0T3JkZXIiOiJERUFETElORSJ9&page="
always_open = "https://www.buddy4study.com/open-scholarships?filter=eyJSRUxJR0lPTiI6W10sIkdFTkRFUiI6W10sIkVEVUNBVElPTiI6W10sIkNPVU5UUlkiOltdLCJDT1VSU0UiOltdLCJTVEFURSI6W10sIkZPUkVJR04iOltdLCJzb3J0T3JkZXIiOiJERUFETElORSJ9"

unique_links = set()
for page_num in (1, 3):
    if page_num == 1:
      url = base_url
    elif page_num == 2:
      url = f"{base_url}{query}{page_num}"
    else:
      url = f"{always_open}"

    driver.get(url)
    # wait until at least one card is present
    try:
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, "Listing_categoriesCard___CHju")))
    except:
        print(f"[!] No cards loaded on page {page_num}, skipping")
        continue

    soup = BeautifulSoup(driver.page_source, "html.parser")
    for card in soup.find_all("div", class_="Listing_categoriesCard___CHju"):
        for a in card.find_all("a", href=True):
            href = a["href"]
            # keep only real scholarship links
            if href.startswith("/scholarship") and not any(x in href for x in ("/page/", "nurtneo")):
                unique_links.add(urljoin(base_url, href))

print(f">>> Found {len(unique_links)} scholarship links")

# ---------- 3) Scrape each scholarship detail page ----------
scholarship_data = []
for link in sorted(unique_links):
    driver.get(link)
    # wait for the main title to appear (indicates page fully loaded)
    try:
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, "scholarshipHeader_mainTitle__RAoQS")))
    except:
        print(f"[!] Timeout or unexpected structure: {link}")
        continue

    soup = BeautifulSoup(driver.page_source, "html.parser")

    def text_or_none(sel, cls):
        tag = soup.select_one(f"{sel}.{cls}")
        return tag.get_text(strip=True) if tag else None

    def attr_or_none(sel, cls, attr):
        tag = soup.select_one(f"{sel}.{cls}")
        return tag[attr] if tag and tag.has_attr(attr) else None

    # image src
    image_source = attr_or_none("div", "scholarshipHeader_brandScholarImg__cwkNm img", "src")

    # scholarship name
    scholarship_name = text_or_none("h1", "scholarshipHeader_mainTitle__RAoQS")

    # eligibility, region, award, deadline
    info_ps = [p.get_text(strip=True)
               for p in soup.select("div.ScholarshipDetails_eligibilityDetailsCont__KqkAH p")]
    while len(info_ps) < 4:
        info_ps.append(None)
    eligibility, region, award, deadline = info_ps[:4]

    # about the program & source
    about_ps = [p.get_text(strip=True)
                for p in soup.select("div.ScholarshipDetails_aboutProgram__6iIDA p")]
    about_the_program = about_ps[0] if len(about_ps) > 0 else None
    source           = about_ps[1] if len(about_ps) > 1 else None

    # apply link (2nd <a> in the article)
    anchors = soup.select("article.ScholarshipDetails_studyLine__ka4X2 a")
    apply_link = anchors[1]["href"] if len(anchors) > 1 and anchors[1].has_attr("href") else None

    scholarship_data.append({
        "url": link,
        "image source": image_source,
        "scholarship name": scholarship_name,
        "eligibility": eligibility,
        "region": region,
        "award": award,
        "deadline": deadline,
        "about the program": about_the_program,
        "source": source,
        "apply link": apply_link
    })

driver.quit()

# ---------- 4) Output ----------
# print(f"\n>>> Total scholarships scraped: {len(scholarship_data)}")
# for idx, item in enumerate(scholarship_data, 1):
#     print(f"\n[{idx}] {item['scholarship name']}")
#     for k, v in item.items():
#         if k != "scholarship name":
#             print(f"    {k}: {v}")



# Replace with your actual MongoDB Atlas connection string
# client = MongoClient("mongodb+srv://datascrapper:pass123@cluster0.mongodb.net/?retryWrites=true&w=majority")
# db = client["scholarshipDB"]

# scholarship_col = db["scholarships"]
# company_col = db["companies"]


# 1. MongoDB connection
client = MongoClient("mongodb+srv://datascrapper:pass123@cluster0.ynqxc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db = client["scholarshipDB"]
scholarship_col = db["scholarships"]
company_col = db["companies"]

# 2. Insert companies (avoid duplicates based on 'name')
company_cache = {}  # To map source -> ObjectId

for item in scholarship_data:
    company_name = item["scholarship name"] or "Unknown Source"
    logo_url = item["image source"] or ""

    # Check if company already exists
    existing = company_col.find_one({"name": company_name})
    if existing:
        company_id = existing["_id"]
    else:
        company_doc = {
            "name": company_name,
            "logo": logo_url,
            "userId": ObjectId()  # Replace with a real userId if available
        }
        company_id = company_col.insert_one(company_doc).inserted_id

    company_cache[company_name] = company_id

# 3. Insert scholarships
for item in scholarship_data:
    try:
        # Parse deadline string to a Date object (fallback to current date)
        deadline = item["deadline"]
        try:
            deadline_date = datetime.strptime(deadline, "%d-%b-%Y")
        except:
            # print(f"Invalid date format for {scholarship_data['title']}: {deadline_str}")
            # scholarship_data["deadline"] = None
            deadline_date = datetime.now(timezone.utc)

        scholarship_doc = {
            "title": item["scholarship name"] or "Untitled",
            "description": item["about the program"] or "No description available",
            "eligibility": item["eligibility"] or "none",
            "special_cat": [],
            "amount": item["award"] or "0",
            "location": item["region"] or "Not specified",
            "s_Type": "Merit-based",  # Hardcoded or use logic if available
            "grants": 1,  # Default or based on data
            "gpa": 3.0,  # Default
            "course": [],
            "deadline": deadline_date,
            "apply_link": item["apply link"] or "",
            "company": company_cache.get(item["scholarship name"], ObjectId()),  # fallback ObjectId
            "created_by": ObjectId(),  # Replace with actual user if needed
            "applications": []
        }

        scholarship_col.insert_one(scholarship_doc)

    except Exception as e:
        print(f"Failed to insert scholarship: {item['scholarship name']}, Error: {e}")

