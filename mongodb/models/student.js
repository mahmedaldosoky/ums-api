import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    nationalId: {
      type: String,
      required: true,
      unique: true,
    },
    guardianNationalId: {
      type: String,
      required: true,
    },
    academicYear: {
      type: Number,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export default mongoose.model("User", studentSchema);
