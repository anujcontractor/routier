import expressAsyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    const token = generateToken(res, user._id);
    await user.populate("reviews");
    const preferredPlacesTags = [];
    const preferredTodoTags = [];
    const preferredStayTags = [];
    const preferredRestaurantTags = [];

    // Function to add tags to the respective arrays
    const addTags = (tagsArray, targetArray) => {
      if (tagsArray && tagsArray.length > 0) {
        tagsArray.forEach((tag) => {
          targetArray.push(tag);
        });
      }
    };

    // Populate and add tags to the respective arrays
    await user.populate("prefferedplaces", "tags");
    addTags(
      user.prefferedplaces.map((item) => item.tags).flat(),
      preferredPlacesTags
    );

    await user.populate("prefferedTodo", "tags");
    addTags(
      user.prefferedTodo.map((item) => item.tags).flat(),
      preferredTodoTags
    );

    await user.populate("prefferedStay", "tags");
    addTags(
      user.prefferedStay.map((item) => item.tags).flat(),
      preferredStayTags
    );

    await user.populate("prefferedRestaurant", "tags");
    addTags(
      user.prefferedRestaurant.map((item) => item.tags).flat(),
      preferredRestaurantTags
    );

    // Add the arrays to the user object
    user.preferredPlacesTags = preferredPlacesTags;
    user.preferredTodoTags = preferredTodoTags;
    user.preferredStayTags = preferredStayTags;
    user.preferredRestaurantTags = preferredRestaurantTags;
    await user.populate("favorites");
    res.status(201).json({
      user,
      token,
      // _id: user._id,
      // name: user.name,
      // email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(403);
    throw new Error("User already exists");
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  if (newUser) {
    const token = generateToken(res, newUser._id);
    res.status(201).json({
      newUser,
      token,
      // _id: newUser._id,
      // name: newUser.name,
      // email: newUser.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User");
  }
});

const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  await user.populate("reviews");
  const preferredPlacesTags = [];
  const preferredTodoTags = [];
  const preferredStayTags = [];
  const preferredRestaurantTags = [];

  // Function to add tags to the respective arrays
  const addTags = (tagsArray, targetArray) => {
    if (tagsArray && tagsArray.length > 0) {
      tagsArray.forEach((tag) => {
        targetArray.push(tag);
      });
    }
  };

  // Populate and add tags to the respective arrays
  await user.populate("prefferedplaces", "tags");
  addTags(
    user.prefferedplaces.map((item) => item.tags).flat(),
    preferredPlacesTags
  );

  await user.populate("prefferedTodo", "tags");
  addTags(
    user.prefferedTodo.map((item) => item.tags).flat(),
    preferredTodoTags
  );

  await user.populate("prefferedStay", "tags");
  addTags(
    user.prefferedStay.map((item) => item.tags).flat(),
    preferredStayTags
  );

  await user.populate("prefferedRestaurant", "tags");
  addTags(
    user.prefferedRestaurant.map((item) => item.tags).flat(),
    preferredRestaurantTags
  );

  // Add the arrays to the user object
  user.preferredPlacesTags = preferredPlacesTags;
  user.preferredTodoTags = preferredTodoTags;
  user.preferredStayTags = preferredStayTags;
  user.preferredRestaurantTags = preferredRestaurantTags;
  await user.populate("favorites");

  res.status(200).json({
    user,
  });
});

const logoutUser = expressAsyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).send({ message: "User logged out" });
});

const show = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json({
      user,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export { authUser, registerUser, getUserProfile, logoutUser, show };
