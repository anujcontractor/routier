import Favorites, { findOne, findOneAndDelete, find } from '../model/favouritesModel.js';
import { findById } from '../model/userModel.js';
import { findById as _findById } from '../model/restaurantModel.js';
import { findById as __findById } from '../model/todoModel.js';
import { findById as ___findById } from '../model/placeinfoModel.js';
import { findById as ____findById } from '../model/stayModel.js';


export async function addFavorite(req, res) {
    const { userId, itemName, itemType } = req.body;

    try {
        // Check if user exists
        const user = await findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if item exists
        let item;
        if (itemType === 'restaurant') {
            item = await _findById(itemName);
        } else if (itemType === 'todo') {
            item = await __findById(itemName);
        } else if (itemType === 'place') {
            item = await ___findById(itemName);
        } else if (itemType === 'stay') {
            item = await ____findById(itemName);
        }

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Check if item already exists in favorites
        const favorite = await findOne({ userId, itemName, itemType });
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
}
export async function removeFavorite(req, res) {
    const { userId, itemName, itemType } = req.body;

    try {
        const user = await findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if item exists in favorites
        const favorite = await findOneAndDelete({ userId, itemName, itemType });
        if (!favorite) {
            return res.status(404).json({ message: 'Item not found in favorites' });
        }

        res.json({ message: 'Favorite removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export async function getFavorites(req, res) {
    const userId = req.params.userId;

    try {
        const user = await findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get favorites
        const favorites = await find({ userId });

        for (const favorite of favorites) {
            if (favorite.itemType === 'restaurant') {
                favorite.item = await _findById(favorite.itemName);
            } else if (favorite.itemType === 'todo') {
                favorite.item = await __findById(favorite.itemName);
            } else if (favorite.itemType === 'place') {
                favorite.item = await ___findById(favorite.itemName);
            } else if (favorite.itemType === 'stay') {
                favorite.item = await ____findById(favorite.itemName);
            }
        }

        res.json({ favorites });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
