import Place from "../model/placeinfoModel.js";

const show = (req, res, next) => {
    Place.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
}

const showbyid=(req,res,next)=>{
  let placeID=req.body.placeID;
  Place.findById(placeID)
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


export default {show,showbyid};