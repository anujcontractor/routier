import Favorites from '../model/favouritesModel.js';
import User from '../model/userModel.js';
import Restaurant from '../model/restaurantModel.js';
import ThingToDo from '../model/todoModel.js';
import PlaceInfo from '../model/placeinfoModel.js';
import Stay from '../model/stayModel.js';

class FavoritesController {
  async addFavorite(req, res) {
    const { itemId, itemType } = req.body;

    try {
      // Check if user exists
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if item exists
      let item;
      switch (itemType) {
        case 'restaurant':
          item = await Restaurant.findById(itemId);
          break;
        case 'thingToDo':
          item = await ThingToDo.findById(itemId);
          break;
        case 'placeInfo':
          item = await PlaceInfo.findById(itemId);
          break;
        case 'stay':
          item = await Stay.findById(itemId);
          break;
        default:
          return res.status(400).json({ message: 'Invalid item type' });
      }

      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      // Check if item already exists in favorites
      const favorite = await Favorites.findOne({
        userId: req.user._id,
        itemId,
        itemType,
      });
      if (favorite) {
        return res.status(400).json({ message: 'Item already exists in favorites' });
      }

      // Create new favorite
      const newFavorite = new Favorites({
        userId: req.user._id,
        itemId,
        itemType,
      });

      await newFavorite.save();

      res.json({ message: 'Favorite added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async removeFavorite(req, res) {
    const { itemId, itemType } = req.body;

    try {
      // Check if user exists
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if item exists in favorites
      const favorite = await Favorites.findOneAndDelete({
        userId: req.user._id,
        itemId,
        itemType,
      });
      if (!favorite) {
        return res.status(404).json({ message: 'Item not found in favorites' });
      }

      res.json({ message: 'Favorite removed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getFavorites(req, res) {
    try {
      // Check if user exists
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Get favorites
      const favorites = await Favorites.find({ userId: req.user._id });

      res.json({ favorites });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new FavoritesController();
