// controllers/reviewController.js
import Review from "../model/reviewModel.js";
import expressAsyncHandler from "express-async-handler";
import Place from "../model/placeinfoModel.js";
import ToDo from "../model/todoModel.js";
import Stay from "../model/stayModel.js";
import Restaurant from "../model/restaurantModel.js";

// export function showForm(req, res) {
//   res.render('reviewForm');
// }

const submitReview = expressAsyncHandler(async (req, res) => {
  try {
    const {
      placeType,
      location,
      starRating,
      visitDate,
      visitedWith,
      title,
      reviewText,
      photos,
    } = req.body;

    // const photos = req.files.map((file) => file.path);
    // const placeID = location;
    // const place = await Place.findById(placeID);
    const review = new Review({
      user: req.user._id,
      placeType,
      location,
      starRating,
      visitDate,
      visitedWith: visitedWith.split(",").map((item) => item.trim()),
      title,
      reviewText,
      photos,
    });

    await review.save();
    // const place = await Place.findById(location);

    // if (place)
    // {
    //   place.reviews.push(review._id);
    //   await place.save();
    // }
    if (review) {
      switch (placeType) {
        case "stay":
          const stay = await Stay.findById(location);
          stay.reviews.push(review._id);
          await stay.save();
          break;
        case "todo":
          const todo = await ToDo.findById(location);
          todo.reviews.push(review._id);
          await todo.save();
          break;
        case "restaurant":
          const restaurant = await Restaurant.findById(location);
          restaurant.reviews.push(review._id);
          await restaurant.save();
          break;
        case "place":
          const place = await Place.findById(location);
          place.reviews.push(review._id);
          await place.save();
          break;
        default:
          break;
      }

    }
    res.status(201).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export { submitReview };
