import Stay from "../model/stayModel.js";
//const {response} = require('express')
import expressAsyncHandler from "express-async-handler";

//show the list of stay
const index = (req, res, next) => {
  Stay.find()
    .populate("location")
    .populate("reviews")
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
};

//Search a particular stay
const show = (req, res, next) => {
  let stayID = req.body.StayID;
  Stay.findById(stayID)
    .populate("location")
    .populate("reviews")
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured",
      });
    });
};

//store a stay
const register = expressAsyncHandler(async (req, res) => {
  const stay = new Stay({
    name: req.body.name,
    address: req.body.address,
    location: req.body.location,
    email: req.body.email,
    phone: req.body.phone,
    image: req.body.image,
    description: req.body.description,
    rating: req.body.rating,
    propertyrulesandinfo: req.body.propertyrulesandinfo,
    price: req.body.price,
    nearbyplaces: req.body.nearbyplaces,
    reviews: req.body.reviews,
  });
  stay.save();
  if (stay) {
    res.json({
      message: "Stay added successfully!",
    });
  } else {
    res.json({
      message: "An error occured!",
    });
  }
});

export default { index, show, register };
