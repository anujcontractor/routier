import jwt from "jsonwebtoken"

const generateToken = (res, userID) => {
    const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.cookie('jwt', token, {
        secure: false,
        httpOnly: true,
        maxAge: 60*60*1000,
        sameSite: 'strict'
    });

    return token;
}

export default generateToken;