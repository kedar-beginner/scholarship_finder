import { Scholarship } from "../models/scholarships.model.js";

// Helper function to map specific courses to hierarchical degree levels
const getUserDegreeLevel = (course) => {
  if (!course) return "";

  const ugCourses = new Set([
    "btech",
    "b.tech",
    "bachelor of technology",
    "be",
    "b.e",
    "bsc",
    "b.sc",
    "bachelor of science",
    "mbbs",
    "ba",
    "b.a",
    "bcom",
    "b.com",
    "bba",
    "bca",
    "b.pharm",
    "bpharm"
  ]);

  const pgCourses = new Set([
    "mtech",
    "m.tech",
    "master of technology",
    "me",
    "m.e",
    "msc",
    "m.sc",
    "master of science",
    "mba",
    "m.b.a",
    "ma",
    "m.a",
    "mcom",
    "m.com",
    "mca",
    "mpharm",
    "md",
    "ms"
  ]);

  const normalized = course.toLowerCase().trim();

  if (ugCourses.has(normalized)) return "ug";
  if (pgCourses.has(normalized)) return "pg";
  
  return "";
};

export const getForYouFeed = async (req, res) => {
  try {
    const user = req.user; 

    // Normalize user inputs
    const userCourse = user.course ? user.course.toLowerCase().trim() : "";
    const userLevel = getUserDegreeLevel(userCourse); 
    const userLocation = user.location ? user.location.toLowerCase().trim() : "";

    const pipeline = [
      // STAGE 1: HARD PRUNING (The B-Tree Index)
      // Instantly drops expired scholarships or those requiring a higher GPA
      {
        $match: {
          deadline: { $gte: new Date() },
          gpa: { $lte: user.gpa || 0 }
        }
      },

      // STAGE 2: HIERARCHICAL SCORING ENGINE
      {
        $addFields: {
          courseScore: {
            $cond: {
              // Exact match (e.g., user is 'btech' and scholarship targets 'btech')
              if: { $in: [userCourse, "$course"] },
              then: 40,
              else: {
                $cond: {
                  // Hierarchical match (e.g., user is 'btech', derived level is 'ug', scholarship targets 'ug')
                  if: { 
                    $and: [
                      { $ne: [userLevel, ""] },
                      { $in: [userLevel, "$course"] }
                    ] 
                  },
                  then: 25,
                  else: {
                    $cond: {
                      // Universal match: Open to all courses (empty array)
                      if: { $eq: [{ $size: "$course" }, 0] },
                      then: 15,
                      else: 0
                    }
                  }
                }
              }
            }
          },
          locationScore: {
            $cond: {
              if: { $regexMatch: { input: "$location", regex: new RegExp(userLocation, "i") } },
              then: 20,
              else: {
                $cond: {
                  if: { $regexMatch: { input: "$location", regex: /all india/i } },
                  then: 10,
                  else: 0
                }
              }
            }
          },
          categoryScore: {
            $cond: {
              if: { $in: [user.category, "$special_cat"] },
              then: 25,
              else: 0
            }
          }
        }
      },

      // STAGE 3: AGGREGATE FINAL SCORE
      {
        $addFields: {
          finalMatchScore: {
            $add: ["$courseScore", "$locationScore", "$categoryScore"]
          }
        }
      },

      // STAGE 4: FILTER, SORT & PAGINATE
      // Drop any scholarship that scored 0 on course mapping
      { 
        $match: { 
          courseScore: { $gt: 0 } 
        } 
      },

      // Rank by relevance score first, tie-break with urgency (closest deadline)
      {
        $sort: {
          finalMatchScore: -1,
          deadline: 1
        }
      },

      // Keep payload lightweight for the frontend
      { $limit: 100 }
    ];

    const recommendedScholarships = await Scholarship.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      count: recommendedScholarships.length,
      data: recommendedScholarships
    });

  } catch (error) {
    console.error("Recommendation Engine Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate personalized scholarship feed."
    });
  }
};