const Favorites = require('../model/favouritesModel');
const User = require('../model/userModel');
const Restaurant = require('../model/restaurantModel');
const ToDo = require('../model/todoModel');
const Place = require('../model/placeinfoModel');
const Stay = require('../models/stayModel');


module.exports = {
    addFavorite: async (req, res) => {
        const { userId, itemName, itemType } = req.body;
        
        try {
            // Check if user exists
            const user = await User.findById(userId);
            if (!user) {
            return res.status(404).json({ message: 'User not found' });
            }
        
            // Check if item exists
            let item;
            if (itemType === 'restaurant') {
            item = await Restaurant.findById(itemName);
            } else if (itemType === 'todo') {
            item = await ToDo.findById(itemName);
            } else if (itemType === 'place') {
            item = await Place.findById(itemName);
            } else if (itemType === 'stay') {
            item = await Stay.findById(itemName);
            }
        
            if (!item) {
            return res.status(404).json({ message: 'Item not found' });
            }
        
            // Check if item already exists in favorites
            const favorite = await Favorites.findOne({ userId, itemName, itemType });
            if (favorite) {
            return res.status(400).json({ message: 'Item already exists in favorites' });
            }
        
            // Create new favorite
            const newFavorite = new Favorites({
            userId,
            itemName,
            itemType,
            });
        
            await newFavorite.save();
        
            res.json({ message: 'Favorite added successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    removeFavorite: async (req, res) => {
        const { userId, itemName, itemType } = req.body;
        
        try {
            const user = await User.findById(userId);
            if (!user) {
            return res.status(404).json({ message: 'User not found' });
            }
        
            // Check if item exists in favorites
            const favorite = await Favorites.findOneAndDelete({ userId, itemName, itemType });
            if (!favorite) {
            return res.status(404).json({ message: 'Item not found in favorites' });
            }
        
            res.json({ message: 'Favorite removed successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getFavorites: async (req, res) => {
    const userId = req.params.userId;
    
    try {
        const user = await User.findById(userId);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
    
        // Get favorites
        const favorites = await Favorites.find({ userId });
    
        for (const favorite of favorites) {
        if (favorite.itemType === 'restaurant') {
            favorite.item = await Restaurant.findById(favorite.itemName);
        } else if (favorite.itemType === 'todo') {
            favorite.item = await ToDo.findById(favorite.itemName);
        } else if (favorite.itemType === 'place') {
            favorite.item = await Place.findById(favorite.itemName);
        } else if (favorite.itemType === 'stay') {
            favorite.item = await Stay.findById(favorite.itemName);
        }
        }
    
        res.json({ favorites });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    },          
};
