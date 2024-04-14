const Course = require("../models/courseSchema");
const User = require("../models/userSchema");
const Category = require("../models/categorySchema");
const cloudinary = require("../utils/cloudinary");

// Create Course Controller
exports.courseCreate = async (req, res) => {
  try {
    const {
      id,
      category,
      course_name,
      description,
      creator,
      course_url,
      lang,
      actual_price,
      discounted_price,
      what_you_will_learn,
      content,
    } = req.body;

    let image = "";

    // Check if the prices are valid
    if (actual_price <= 0 || discounted_price <= 0) {
      return res.status(400).json({ error: "Price must be a positive number" });
    }

    // // Check if discounted price is not greater than actual price
    // if (discounted_price >= actual_price) {
    //   return res.status(400).json({ error: 'Discounted price cannot be greater than the actual price' });
    // }

    // Check if the course name already exists
    const existingCourse = await Course.findOne({ course_name });

    if (existingCourse) {
      // If the course name already exists, return an error
      return res.status(400).json({ error: "Course name must be unique" });
    }

    if (req.file) {
      image = req.file.filename;

      // Upload image to Cloudinary
      const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

      // Extract the secure URL from the Cloudinary result
      const imageUrl = cloudinaryResult.secure_url;

      // Creating a new course
      const newCourse = new Course({
        id,
        category,
        image: imageUrl,
        course_name,
        description,
        creator,
        course_url,
        lang,
        actual_price,
        discounted_price,
        what_you_will_learn,
        content,
      });

      // Save the new course
      await newCourse.save();
      // Send success response
      res.status(200).json({ message: "Course Created Successfully." });
    } else {
      res.status(400).json({ message: "Please provide an image file." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch All Courses Controller
exports.fetchAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate({
        path: "creator",
        select: "-password",
      })
      .populate({
        path: "category",
      });
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching courses" });
  }
};

exports.getCoursesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find courses where the user ID matches
    const courses = await Course.find({ creator: userId }).populate("category");
    // Send the courses data as response
    res.status(200).json({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Course Controller
exports.courseUpdate = async (req, res) => {
  const { courseId } = req.params;
  const {
    category,
    course_name,
    description,
    course_url,
    creator,
    lang,
    actual_price,
    discounted_price,
    what_you_will_learn,
    content,
  
  } = req.body;

  let image = "";

     // Check if the prices are valid
     if (actual_price <= 0 || discounted_price <= 0) {
      return res.status(400).json({ error: "Price must be a positive number" });
    }

      // Check if the prices are valid
  // if (actual_price <= 0 || discounted_price <= 0) {
  //   return res.status(400).json({ error: 'Price must be a positive number' });
  // }

  // // Check if discounted price is not greater than actual price
  // if (discounted_price >= actual_price) {
  //   return res.status(400).json({ error: 'Discounted price cannot be greater than the actual price' });
  // }

      // Check if the course name already exists
      const existingCourse = await Course.findOne({ course_name });

      if (existingCourse) {
        // If the course name already exists, return an error
        return res.status(400).json({ error: "Course name must be unique" });
      }

  // Upload image to Cloudinary
  const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

  // Extract the secure URL from the Cloudinary result
  const imageUrl = cloudinaryResult.secure_url;



  try {
    const course = Course.findById(courseId);
    if (course) {
      if (req.file) {
        const image = req.file.filename;
        await Course.findByIdAndUpdate(courseId, { image: imageUrl });
      }
      const updateCourse = await Course.findByIdAndUpdate(
        courseId,
        {
          category,
          course_name,
          description,
          course_url,
          image: imageUrl,
          creator,
          lang,
          actual_price,
          discounted_price,
          what_you_will_learn,
          content,
        },
        { new: true }
      );
      res.json(updateCourse);
    } else {
      res.status(401).json({ message: "Course Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating course" });
  }
};

// Disable Course Controller
exports.courseDisable = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (course) {
      // Remove the course from all users' carts
      const users = await User.find({ cart: courseId });

      for (const user of users) {
        const updatedCart = user.cart.filter((item) => item.equals(courseId));
        user.cart = updatedCart;
        await user.save();
      }

      // Remove cartItems with course set to null from users' carts
      await User.updateMany(
        { cart: { $elemMatch: { course: null } } },
        { $pull: { cart: { course: null } } }
      );

      // Remove the course from all users' playlists
      await User.updateMany(
        { playlist: courseId },
        { $pull: { playlist: courseId } }
      );

      // Delete the course
      await Course.findByIdAndDelete(courseId);

      res.status(200).json({ message: "Course Deleted" });
    } else {
      res.status(400).json({ message: "Course Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting course" });
  }
};

// Fetch Course-Details Controller
exports.fetchCourseDetails = async (req, res) => {
  const { courseId } = req.params;

  try {
    const courseDetails = await Course.findById(courseId)
      .populate("creator")
      .populate("category");
    res.status(200).json(courseDetails);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching course details",
        error: error.message,
      });
  }
};

exports.createcategory = async (req, res) => {
  const { category_name } = req.body;

  try {
    // Check if the category name already exists
    const existingCategory = await Category.findOne({ category_name });

    if (existingCategory) {
      // If the category name already exists, return an error
      return res.status(400).json({ error: "Category name must be unique" });
    }

    // If the category name is unique, create a new category
    const newCategory = new Category({ category_name });
    await newCategory.save();
    res
      .status(201)
      .json({
        message: "Category inserted successfully",
        categoryId: newCategory._id,
      });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Error handling category" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find({});

    // Extract only the category names from the fetched categories
    // const categoryNames = categories.map(cat => cat.category_name);

    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Error fetching categories" });
  }
};

exports.updateCategory = async (req, res) => {
  const categoryId = req.params.id; // Assuming category ID is passed in the request URL
  const { category_name } = req.body;

  try {
    // Check if the category name already exists
    let existingCategory = await Category.findOne({ category_name }); // Corrected to 'Category'

    if (existingCategory && existingCategory._id.toString() !== categoryId) {
      // If the category name already exists and does not match the current category, return an error
      return res.status(400).json({ error: "Category name must be unique" });
    }

    // Check if the category exists
    existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
      // If the category doesn't exist, return an error
      return res.status(404).json({ error: "Category not found" });
    }

    // Update the category name
    existingCategory.category_name = category_name;
    await existingCategory.save();

    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Error updating category" });
  }
};

exports.deleteCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    console.log("Deleting category with ID:", categoryId);

    // Check if the category exists
    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
      console.log("Category not found");
      return res.status(404).json({ error: "Category not found" });
    }

    // If the category exists, delete it
    await Category.deleteOne({ _id: categoryId });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Error deleting category" });
  }
};
