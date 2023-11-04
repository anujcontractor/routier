import { Router } from "express";
const router = Router();
import { submitReview } from "../controller/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";
// import multer from 'multer';
// import upload from '../server.js';

// router.post('/submit', multer().array('photos', 5), reviewController.submitReview);
router.post("/submit", protect, submitReview);

export default router;

// const reviewRoutes = (upload) => {
//     // router.get('/submit', reviewController.showForm);

//     router.post('/submit', upload.array('photos', 5), reviewController.submitReview);

//     // Add more review-related routes as needed

//     return router;
//   }

//   export default reviewRoutes;
