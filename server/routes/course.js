const express = require("express");
const router = express.Router();

const { isAdmin, isInstructor } = require("../controllers/authControllers");
const multer = require("multer");
const {
  courseCreate,
  fetchAllCourses,
  courseDisable,
  courseUpdate,
  fetchCourseDetails,
  createcategory,
  getCategories,
  getCoursesByUserId,
  updateCategory,
  deleteCategory,
} = require("../controllers/courseController");

// Courses routes...

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../admin/public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create Course Route with a single image
router.post(
  "/create-course",
  isAdmin,
  isInstructor,
  upload.single("image"), // Allow only a single file upload with the field name "image"
  courseCreate
);

// Fetch All courses Route
router.get("/fetch-allcourses", fetchAllCourses);


// Update course Route
router.put(
  "/update-course/:courseId",
  isAdmin,
  upload.single("image"),
  courseUpdate
);

router.get('/courses/user/:userId', getCoursesByUserId);

// Delete course Route
router.put("/disable-course/:courseId", courseDisable);

// // Filter courses route
// router.get("/filter-courses/:category", filterCourses);

// Fetch course details route
router.get("/fetch-courseDetails/:courseId", fetchCourseDetails);

// Create category route
router.post("/create-category", createcategory);

// Get categories route
router.get("/categories", getCategories);

router.put("/update-category/:id", updateCategory);

router.delete("/delete-category/:categoryId", deleteCategory);


module.exports = router;
