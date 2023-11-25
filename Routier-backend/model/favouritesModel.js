import { Schema, model } from 'mongoose';

const favoritesSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  places: [{
    name :{
        type:String,
        required:true
    },
    addedDate: {
      type: Date,
      default: Date.now,
    },
  }],
  restaurants: [{
    name: {
      type: String,
      required: true,
    },
    addedDate: {
      type: Date,
      default: Date.now,
    },
  }],
  thingsToDo: [{
    name: {
      type: String,
      required: true,
    },
    addedDate: {
      type: Date,
      default: Date.now,
    },
  }],
});

const fav = mongoose.model('Favorites', favoritesSchema)
export default fav;





