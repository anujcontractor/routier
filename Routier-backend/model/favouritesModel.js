const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Favorites', favoritesSchema);





