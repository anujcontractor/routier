import { Schema, model } from 'mongoose';

const favoritesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
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

export default model('Favorites', favoritesSchema);





