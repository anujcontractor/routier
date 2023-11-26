import mongoose from "mongoose";
const { Schema } = mongoose;


const favoritesSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  itemId : {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  itemType: {
    type: String,
    required: true,
  }
});

const fav = mongoose.model('Favorites', favoritesSchema)
export default fav;