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

const showbyid = (req, res, next) => {
  let placeID = req.params.id; // Use req.params.id to get the place ID from the URL parameters
  Place.findById(placeID)
    .then(response => {
      if (response) {
        res.json({
          response,
        });
      } else {
        res.status(404).json({
          message: 'Place not found!',
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred!',
      });
    });
};
const addPlace = (req, res, next) => {
  const { name, description, images, tags } = req.body;

  const newPlace = new Place({
    name,
    description,
    images,
    tags,
  });

  newPlace
    .save()
    .then((response) => {
      res.json({
        response,
        message: "Place added successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occurred while adding the place!",
      });
    });
};

//delete place
const deletePlace = (req, res, next) => {
  let placeID = req.params.id; // Use req.params.id to get the place ID from the URL parameters
  Place.findByIdAndRemove(placeID)
    .then(() => {
      res.json({
        message: "Place deleted successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occurred!",
      });
    });
};


export default {show,showbyid,addPlace,deletePlace};