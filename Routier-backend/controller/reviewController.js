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
      placeName,
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
      placeName,
      placeType,
      location,
      starRating,
      visitDate,
      visitedWith: visitedWith.split(",").map((item) => item.trim()),
      title,
      reviewText,
      photos,
    });

    // await review.populate("location");
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
          if (starRating >= 3 && !req.user.prefferedStay.includes(stay._id)) {
            req.user.prefferedStay.push(stay._id);
            await req.user.save();
          }
          break;
        case "todo":
          const todo = await ToDo.findById(location);
          todo.reviews.push(review._id);
          await todo.save();
          if (starRating >= 3 && !req.user.prefferedTodo.includes(todo._id)) {
            req.user.prefferedTodo.push(todo._id);
            await req.user.save();
          }
          break;
        case "restaurant":
          const restaurant = await Restaurant.findById(location);
          restaurant.reviews.push(review._id);
          await restaurant.save();
          if (starRating >= 3 && !req.user.prefferedRestaurant.includes(restaurant._id)) {
            req.user.prefferedRestaurant.push(restaurant._id);
            await req.user.save();
          }
          break;
        case "place":
          const place = await Place.findById(location);
          place.reviews.push(review._id);
          await place.save();
          if (starRating >= 3 && !req.user.prefferedplaces.includes(place._id)) {
            req.user.prefferedplaces.push(place._id);
            await req.user.save();
          }
          break;
        default:
          return res.status(400).json({ message: "Invalid placeType" });
      }

      req.user.reviews.push(review._id);
      await req.user.save();
    }
    res.status(201).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export { submitReview };
