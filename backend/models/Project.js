import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    projectName: {
      type: String,
      required: true
    },

    projectType: {
      type: String,
      required: true
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true
    },

    frontend: {
      type: String,
      required: true
    },

    backend: {
      type: String,
      required: true
    },

    database: {
      type: String,
      required: true
    },

    pages: [
      {
        type: String
      }
    ],

    features: [
      {
        type: String
      }
    ],
    downloadLink: {
      type: String,
        }   
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);