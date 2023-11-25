import Restaurant from "../model/restaurantModel.js";
import Place from "../model/placeinfoModel.js";

const index = (req, res, next) => {
  Restaurant.find()
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

// show single restaurant
const show = (req, res, next) => {
  let restaurantID = req.params.id;
  Restaurant.findById(restaurantID)
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

// const store=(req,res,next)=>{
//   let restaurant = new Restaurant({
//     name: req.body.name,
//     phone: req.body.phone,
//     email: req.body.email,
//     cusine: req.body.cusine,
//     rating: req.body.rating,
//     price: req.body.price,
//     image: req.body.image,
//     description: req.body.description,
//     veg: req.body.veg,
//     nonveg: req.body.nonveg,
//     type: req.body.type,
//     time: req.body.time,
//     website: req.body.website,
//     menu: req.body.menu,
//     reviews: req.body.reviews,
//   });
//   restaurant
//     .save()
//     .then((response) => {
//       res.json({
//         message: "Restaurant added successfully!",
//       });
//     })
//     .catch((error) => {
//       res.json({
//         message: "An error occured!",
//       });
//     });
// }
const update = (req, res, next) => {
  let restaurantID = req.body.restaurantID;
  let updateData = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    cusine: req.body.cusine,
    rating: req.body.rating,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    veg: req.body.veg,
    nonveg: req.body.nonveg,
    type: req.body.type,
    time: req.body.time,
    website: req.body.website,
    menu: req.body.menu,
    reviews: req.body.reviews,
  };
  Restaurant.findByIdAndUpdate(restaurantID, { $set: updateData })
    .then(() => {
      res.json({
        message: "Restaurant updated successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

const destroy = (req, res, next) => {
  let restaurantID = req.body.restaurantID;
  Restaurant.findByIdAndRemove(restaurantID)
    .then(() => {
      res.json({
        message: "Restaurant deleted successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};
const store = async (req, res) => {
  const restaurantData = req.body;

  try {
    const newRestaurant = await Restaurant.create(restaurantData);
    // Find the corresponding place and update the restaurants array
    const placeID = restaurantData.location;
    const place = await Place.findById(placeID);

    if (place) {
      // Add the new restaurant ID to the restaurants array
      place.restaurants.push(newRestaurant._id);

      // Save the updated place
      await place.save();
    }
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export default {
  index,
  show,
  store,
  update,
  destroy,
};
