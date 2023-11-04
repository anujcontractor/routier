// controllers/reviewController.js
import Review from "../model/reviewModel.js";
import expressAsyncHandler from "express-async-handler";

// export function showForm(req, res) {
//   res.render('reviewForm');
// }

const submitReview = expressAsyncHandler(async (req, res) => {
  try {
    const {placeType, location, starRating, visitDate, visitedWith, title, reviewText } =
      req.body;

    const photos = req.files.map((file) => file.path);

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
    // res.redirect('/reviews');
    res.status(201).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export { submitReview };
