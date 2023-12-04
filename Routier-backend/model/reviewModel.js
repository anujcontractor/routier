import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  placeName: String,
  placeType: String,
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
    required: true,
  },
  starRating: Number,
  visitDate: Date,
  visitedWith: [String],
  title: String,
  reviewText: String,
  photos: [String], // Store file paths to uploaded photos
});

const review = mongoose.model("Review", reviewSchema);
export default review;
