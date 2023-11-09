import mongoose from 'mongoose';
const {Schema} = mongoose;

const placeSchema= new Schema({
    name :{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
},{
    timestamps:true
});

const Place=mongoose.model('Place',placeSchema);
export default Place;