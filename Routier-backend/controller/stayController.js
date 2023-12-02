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
  let stayID = req.params.id;
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

//need to check if this works or not
export const updateTags = async (req, res) => {
  const { stayId } = req.body;
  const { tags } = req.body;

  try {
    const updatedStay = await Stay.findByIdAndUpdate(
      stayId,
      { tags },
      { new: true }
    );

    if (!updatedStay) {
      return res.status(404).json({ message: "Stay not found" });
    }

    return res.status(200).json(updatedStay);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
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

export default { index, show, register, updateTags };
