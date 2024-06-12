import express from "express";

import Student from "../mongodb/models/student.js";

const router = express.Router();

// Create a new student
router.post("/", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a student by ID
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a student by ID
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// // Email login route with Passport.js configuration
// router.post("/email", (req, res, next) => {
//   passport.use(
//     new LocalStrategy(
//       {
//         usernameField: "email",
//         passwordField: "password",
//       },
//       async (email, password, done) => {
//         try {
//           // Find the user with the provided email
//           const user = await Student.findOne({ email });

//           // If the user doesn't exist or the password is incorrect, return an error
//           if (!user || !user.isValidPassword(password)) {
//             return done(null, false, { message: "Invalid email or password" });
//           }

//           // Authentication successful, return the user
//           return done(null, user);
//         } catch (err) {
//           return done(err);
//         }
//       }
//     )
//   );

//   // Authenticate with email
//   passport.authenticate("local", { session: false })(req, res, next);
// });

export default router;
