const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const Teacher = require("../models/FormSchemas");
const LocalStrategy = require("../config/passport").LocalStrategy;
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const crypto = require("crypto");
const fs = require("fs");
const cloudinary = require('../utils/cloudinary');
const Skills = require("../models/skillsSchema");
const Language = require("../models/langSchema");

// Read the email template file
const emailTemplateSource = fs.readFileSync(
  "registrationConfirmation.html",
  "utf8"
);

// Compile the template using Handlebars
const emailTemplate = handlebars.compile(emailTemplateSource);

// User Login Controller
exports.userLogin = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Error:", err);
      return next(err);
    }
    if (!user) {
      console.log("Login failed:", info.message);
      return res.status(401).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Error:", err);
        return next(err);
      }
      // Inside your login route
      // Assuming 'user' contains the user data
      const userPayload = {
        username: user.username,
        role: user.role,
        userId: user._id,
      };
      const token = jwt.sign(userPayload, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      console.log("Login successful:", user.username);
      const sanitizedUser = {
        _id: user._id,
        username: user.username,
        admin: user.admin,
      };
      return res.json({
        message: "Logged in successfully",
        token: token,
      });
    });
  })(req, res, next);
};


// User Register Controller
exports.userRegister = async (req, res) => {
  const { username, email, password, cpassword } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    if (password === cpassword) {
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: "user",
      });
      await newUser.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      // Define email data

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Registration Confirmation - SHIKSHA",
        html: emailTemplate({ username }),
      };
      // Send the email
      await transporter.sendMail(mailOptions);

      res.json({ message: "User registered successfully" });
    } else {
      res.json({ message: "Enter same passwords" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};



// User Logout Controller
exports.userLogout = (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
};
exports.userUpdate = async (req, res) => {
  const userId = req.user._id;
  const { firstname, lastname, mobilenumber, gender } = req.body;

  try {
    const user = User.findById(userId);
    if (userId) {
      const updateUser = await User.findByIdAndUpdate(
        userId,
        {
          firstname,
          lastname,
          mobilenumber,
          gender,
        },
        { new: true }
      );
      res.json(updateUser);
    } else {
      res.status(401).json({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

// Validate Username before register
exports.validateUsername = async (req, res) => {
  const username = req.params.username;

  if (username.length >= 4 && !username.includes(" ")) {
    const userExist = await User.findOne({ username: username });
    if (userExist) {
      res.json({ message: "Username Already Used" });
    } else {
      res.json({ message: "Available" });
    }
  } else {
    res.json({ message: "Invalid" });
  }
};

// Validate Email before register
exports.validateEmail = async (req, res) => {
  const email = req.params.email;

  if (email) {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.json({ message: "Email already used" });
    } else {
      res.json({ message: "Available" });
    }
  } else {
    res.json({ message: "Email not provided" });
  }
};
// Fetch All Courses Controller
exports.fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};
// Fetch All Courses Controller
exports.changeRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    const user = await User.findById(userId);
    if (user) {
      const updateUser = await User.findByIdAndUpdate(
        userId,
        {
          role,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } else {
      res.status(401).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};
// Delete Course Controller
exports.userDelete = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user) {
      // Delete the course
      await User.findByIdAndDelete(userId);

      res.status(200).json({ message: "User Deleted" });
    } else {
      res.status(400).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};
// Function to generate a random OTP
function generateOTP() {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

// Function to send OTP to the user's email
exports.sendOTP = async (req, res) => {
  try {
    const email = req.body.email;

    // Generate a random OTP
    const otp = generateOTP();

    // Create a transporter object using your email service's SMTP settings
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Define email data
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.json({ message: "OTP sent successfully", otp: otp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending OTP" });
  }
};


exports.Forgot = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne(
      { email }
    );
    

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique token
    const token = crypto.randomBytes(20).toString("hex");
    const tokenExpiration = Date.now() + 3600000; // 1 hour from now


    const updatedUser = await User.findOneAndUpdate(
      { email },
      { 
        $set: { 
          resetPasswordToken: token, 
          resetPasswordExpires: tokenExpiration 
        } 
      },
      { new: true }
    );

    // Create a transporter object using your email service's SMTP settings
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Send the reset email
    const resetLink = `${process.env.ADMIN_URL}/reset-password/${token}`;
    const mailOptions = {
      to: email,
      subject: "Password Reset Request",
      html: `You are receiving this because you (or someone else) have requested the reset of the password for your account.<br><br>
             Please click on the following link, or paste this into your browser to complete the process:<br><br>
             <a href="${resetLink}">Reset Password</a><br><br>
             If you did not request this, please ignore this email and your password will remain unchanged.<br>`,
    };

    // Use the initialized transporter
    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.Reset = async (req, res) => {
  const { token, newPassword } = req.body;
  
  try {
    // Find the user by the reset token and ensure it has not expired
    const resetRecord = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!resetRecord) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    const updatedUser = await User.findByIdAndUpdate(
      resetRecord._id,
      {
        password: hashedPassword,
        $unset: { resetPasswordToken: "", resetPasswordExpires: "" }, // Clear reset token and expiration
      },
      { new: true }
    );

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.Teacher = async (req, res) => {
  try {
    const {
      fname,
      lname,
      dob,
      email,
      lspoken,
      skills,
      experience,
      worksofhours
    } = req.body;

    // Upload profile image to Cloudinary
    const profileCloudinaryResult = await cloudinary.uploader.upload(req.files['profile'][0].path);
    const profileImageUrl = profileCloudinaryResult.secure_url;

    // Upload resume file to Cloudinary
    const resumeCloudinaryResult = await cloudinary.uploader.upload(req.files['resume'][0].path);
    const resumeFileUrl = resumeCloudinaryResult.secure_url;

    const newTeacher = new Teacher({
      fname,
      lname,
      dob,
      email,
      lspoken,
      skills,
      experience,
      worksofhours,
      profile: profileImageUrl,
      resume: resumeFileUrl
    });

    await newTeacher.save();

    res.status(200).json({
      message: "Teacher qualification added successfully",
      teacher: newTeacher
    });
  } catch (error) {
    console.error("Error adding teacher qualification:", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

exports.currentuser = async (req, res) => {
  try {
    // Retrieve the current user's ID from the authentication mechanism
    const currentUserId = req.user.id; // Assuming req.user contains the current user's information

    // Fetch the current user's information from your data store using the currentUserId
    const user = await User.findById(currentUserId).exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the current user's information in the response
    res.json({ user });
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.SkillsName = async (req, res) => {
  try {
    // Fetch all skills from the database
    const skills = await Skills.find({}, 'skills_name');

    // Extract only the skills names from the fetched skills
    const skillsNames = skills.map(cat => cat.skills_name);

    res.status(200).json({ skills: skillsNames });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Error fetching skills' });
  }
};

exports.Language = async (req, res) => {
  try {
    // Fetch all skills from the database
    const language = await Language.find({}, 'language_name');

    // Extract only the language names from the fetched language
    const languageNames = language.map(cat => cat.language_name);

    res.status(200).json({ language: languageNames });
  } catch (error) {
    console.error('Error fetching language:', error);
    res.status(500).json({ error: 'Error fetching language' });
  }
};


exports.Teachers = async (req, res) => {
  try {
    // Assuming the role is stored in a 'role' field
    const instructors = await User.find({ role: 'instructor' });
    res.status(200).json({ instructors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching instructors" });
  }
};


exports.TeacherData = async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    res.status(200).json({ teachers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching TeacherData" });
  }
};


exports.Payment = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate({
      path: 'playlist',
      populate: [
        { path: 'category' },
        { path: 'creator' }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.playlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
