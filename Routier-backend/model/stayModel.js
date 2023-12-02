import mongoose from "mongoose";
const { Schema } = mongoose;

const staySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
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
    rating: {
      type: Number,
      required: true,
    },
    propertyrulesandinfo: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    nearbyplaces: {
      type: String,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    tags: {
      type: [String],
      default: []
    },
  },
  { timestamps: true }
);

const Stay = mongoose.model("Stay", staySchema);
export default Stay;
