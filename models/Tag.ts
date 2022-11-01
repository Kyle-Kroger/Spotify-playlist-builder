import mongoose from "mongoose";
import { TagType } from "../lib/types";

const tagSchema = new mongoose.Schema<TagType>({
  name: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    required: true,
  },
  tracks: {
    type: [String],
  },
  playlistId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(Date.now()),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(Date.now()),
  },
});

tagSchema.pre("save", function (next) {
  this.updatedAt = new Date(Date.now());
  next();
});

export default (mongoose.models.Tag as mongoose.Model<TagType>) ||
  mongoose.model("Tag", tagSchema);
