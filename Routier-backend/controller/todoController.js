import todo from '../model/todoModel.js'


const byid=(req,res,next)=>{
       todo.find()
       .then(response=>{
           res.json({
               message: 'This is working'
           })
       })
       .catch(error=>{
           res.json({
               message:'An error occured!'
           })
       })
   }

   // show single thing to do
   const showbyid=(req,res,next)=>{
       let todoID=req.body.todoID;
       todo.findById(todoID)
       .then(response=>{
           res.json({
               response
           })
       })
       .catch(error=>{
           res.json({
               message:'An error occured!'
           })
       })
   }


export default {
   byid,showbyid};
