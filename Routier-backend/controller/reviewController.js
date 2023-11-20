// controllers/reviewController.js
import Review from "../model/reviewModel.js";
import expressAsyncHandler from "express-async-handler";
import Place from "../model/placeinfoModel.js";

// export function showForm(req, res) {
//   res.render('reviewForm');
// }

const submitReview = expressAsyncHandler(async (req, res) => {
  try {
    const {placeType, location, starRating, visitDate, visitedWith, title, reviewText, photos } =
      req.body;

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
    const place = await Place.findById(location);

    if (place)
    {
      place.reviews.push(review._id);
      await place.save();
    }
    res.status(201).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export { submitReview };
