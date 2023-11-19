import mongoose from "mongoose";
const { Schema } = mongoose;

const placeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
    restaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
      },
    ],
    stays: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stay",
      },
    ],
    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ToDo",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);
// Add a restaurant to the place
placeSchema.methods.addRestaurant = function (restaurantId) {
  this.restaurants.push(restaurantId);
};

// Add a todo to the place
placeSchema.methods.addTodo = function (todoId) {
  this.todos.push(todoId);
};

// Add a stay to the place
placeSchema.methods.addStay = function (stayId) {
  this.stays.push(stayId);
};

const Place = mongoose.model("Place", placeSchema);
export default Place;
