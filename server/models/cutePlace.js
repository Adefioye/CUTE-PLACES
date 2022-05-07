import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const CutePlace = mongoose.model("CutePlace", placeSchema);

export default CutePlace;
