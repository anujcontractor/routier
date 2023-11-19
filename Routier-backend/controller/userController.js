import expressAsyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && await user.matchPasswords(password)){
        const token = generateToken(res, user._id);
        res.status(201).json({
            user,
            token,
            // _id: user._id,
            // name: user.name,
            // email: user.email,
        });
    }else{
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password} = req.body;

    const userExist = await User.findOne({email});

    if(userExist){
        throw new Error("User already exists");
    }

    const newUser = await User.create({
        name,
        email,
        password
    });

    if(newUser){
        const token = generateToken(res, newUser._id);
        res.status(201).json({
            newUser,
            token,
            // _id: newUser._id,
            // name: newUser.name,
            // email: newUser.email,
        });
    }else{
        res.status(400);
        throw new Error("Invalid User");
    }
});

const getUserProfile = expressAsyncHandler(async (req, res) => {
    const user = req.user;

    res.status(200).json(user);
    res.json("Profile");
});

const logoutUser = expressAsyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(200).send({ message: "User logged out" });
});

export { authUser, registerUser, getUserProfile, logoutUser };