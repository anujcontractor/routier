import mongoose from "mongoose";
const { Schema } = mongoose;
const restaurantSchema = new Schema(
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
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cusine: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
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
    veg: {
      type: Boolean,
      required: true,
    },
    nonveg: {
      type: Boolean,
      required: true,
    },
    type: {
      //like fastfood,restaurant,cafe etc
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    menu: {
      type: String,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
