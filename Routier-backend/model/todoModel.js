import mongoose from "mongoose";

const { Schema } = mongoose;
const todoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    time2visit: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const todo = mongoose.model("ToDo", todoSchema);
export default todo;
