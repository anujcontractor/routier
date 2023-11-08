import Stay from '../model/stayModel.js';
//const {response} = require('express')

//Search a particular stay
const show = (req, res, next) => {
    let stayID = req.body.StayID
    Stay.findById(stayID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured'
        })
    })
}

export default {show};