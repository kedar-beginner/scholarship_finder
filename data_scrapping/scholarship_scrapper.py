
import re
import os
import spacy
from datetime import datetime, timezone
from urllib.parse import urljoin
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from pymongo import MongoClient, UpdateOne
from bson.objectid import ObjectId

# Load NLP Model
nlp = spacy.load("en_core_web_sm")

COURSE_ALIASES = {
    "ug": ["ug", "undergraduate", "bachelor", "bachelors", "under-graduate", "degree"],
    "pg": ["pg", "postgraduate", "master", "masters", "post-graduate"],
    "btech": ["b.tech", "btech", "bachelor of technology", "b.e", "engineering"],
    "mtech": ["m.tech", "mtech", "master of technology"],
    "bsc": ["b.sc", "bsc", "bachelor of science"],
    "mba": ["mba", "m.b.a", "master of business administration"],
    "class 12": ["12th", "class 12", "class xii", "10+2"]
}

CATEGORY_ALIASES = {
    "women": ["girl", "girls", "female", "women"],
    "sc/st": ["sc", "st", "dalit", "tribal"],
    "pwd": ["pwd", "disabled", "handicapped"]
}

def normalize_terms(text, taxonomy_map):
    if not text:
        return []
    text_lower = text.lower()
    found_tags = set()
    for canonical_key, aliases in taxonomy_map.items():
        for alias in aliases:
            if re.search(r"\b" + re.escape(alias) + r"\b", text_lower):
                found_tags.add(canonical_key)
    return list(found_tags)

def extract_gpa(text):
    if not text:
        return 0.0
    match = re.search(r"(?:cgpa|gpa|marks)\s*(?:>=|>|of|min)?\s*([0-9]+\.[0-9]+|[0-9]{2})", text, re.IGNORECASE)
    if match:
        val = float(match.group(1))
        return val if val <= 10.0 else round(val / 10.0, 2) 
    return 0.0

def extract_amount(text):
    if not text:
        return "Variable"
    match = re.search(r"(?:INR|₹|Rs\.?)\s*([\d,]+)", text, re.IGNORECASE)
    if match:
        return match.group(0)
    return "Variable"

def deep_scrape_scholarships():
    options = Options()
    options.add_argument("--headless=new")
    driver = webdriver.Chrome(options=options)
    wait = WebDriverWait(driver, 10)
    
    base_url = "https://www.buddy4study.com"
    driver.get(f"{base_url}/scholarships")
    
    wait.until(EC.presence_of_element_located((By.CLASS_NAME, "Listing_categoriesCard___CHju")))
    soup = BeautifulSoup(driver.page_source, "html.parser")
    
    unique_links = set()
    for card in soup.find_all("div", class_="Listing_categoriesCard___CHju"):
        for a in card.find_all("a", href=True):
            if "/scholarship/" in a["href"]:
                unique_links.add(urljoin(base_url, a["href"]))
                
    scraped_docs = []
    
    SYSTEM_COMPANY_ID = ObjectId("64abcd1234567890abcdef12")
    SYSTEM_USER_ID = ObjectId("64abcd1234567890abcdef34")
    
    for link in unique_links: 
        try:
            driver.get(link)
            wait.until(EC.presence_of_element_located((By.TAG_NAME, "article")))
            detail_soup = BeautifulSoup(driver.page_source, "html.parser")
            
            title_tag = detail_soup.find("h1")
            title = title_tag.get_text(strip=True) if title_tag else "Untitled"
            
            full_text = " ".join([p.get_text(strip=True) for p in detail_soup.find_all("p")])
            
            apply_btn = detail_soup.find("a", text=re.compile("Apply Now", re.IGNORECASE))
            apply_link = urljoin(base_url, apply_btn["href"]) if apply_btn and apply_btn.has_attr("href") else link
            
            doc = {
                "title": title,
                "description": full_text[:500] + "...", 
                "eligibility": full_text,
                "special_cat": normalize_terms(full_text, CATEGORY_ALIASES),
                "amount": extract_amount(full_text),
                "location": "All India",
                "s_Type": "Merit-based",
                "grants": 1,
                "gpa": extract_gpa(full_text),
                "course": normalize_terms(full_text, COURSE_ALIASES), 
                "deadline": datetime.now(timezone.utc), # Defaults to current date; replace with parsed date if available
                "apply_link": apply_link,
                "company": SYSTEM_COMPANY_ID,
                "created_by": SYSTEM_USER_ID,
                "applications": []
            }
            scraped_docs.append(doc)
            print(f"✓ Cleaned: {title[:30]}...")
        except Exception as e:
            print(f"Skipping {link}: {e}")
            
    driver.quit()
    return scraped_docs

def load_to_mongodb(docs):
    if not docs:
        return
        
    mongo_uri = os.environ.get("MONGO_URI", "mongodb")
    client = MongoClient(mongo_uri)
    db = client["scholarship_db"]
    collection = db["scholarships"]
    
    operations = [
        UpdateOne({"apply_link": doc["apply_link"]}, {"$set": doc}, upsert=True)
        for doc in docs
    ]
    
    result = collection.bulk_write(operations)
    print(f"DB Update Complete: {result.upserted_count} inserted, {result.modified_count} updated.")
    client.close()

if __name__ == "__main__":
    clean_data = deep_scrape_scholarships()
    load_to_mongodb(clean_data)