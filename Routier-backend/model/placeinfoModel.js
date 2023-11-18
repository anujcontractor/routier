import mongoose from "mongoose";
const { Schema } = mongoose;

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
    tags: {
        type: [String], 
        default: [],    
    },
    restaurants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
    }],
    stays:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stay',
    }],
    todos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo',
    }],
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
},{
    timestamps:true
});

const Place = mongoose.model("Place", placeSchema);
export default Place;
