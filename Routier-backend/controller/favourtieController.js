import Favorites from '../model/favouritesModel.js';
import User from '../model/userModel.js';
import Restaurant from '../model/restaurantModel.js';
import ThingToDo from '../model/todoModel.js';
import PlaceInfo from '../model/placeinfoModel.js';
import Stay from '../model/stayModel.js';


  const addFavorite = async(req, res) => {
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
        case 'todo':
          item = await ThingToDo.findById(itemId);
          break;
        case 'place':
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
      req.user.favorites.push(newFavorite._id);
      await req.user.save();

      res.json({ message: 'Favorite added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  const removeFavorite = async(req, res) => {
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

  /*const getFavorites = async(req, res) => {
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
  }*/
  const getFavorites = async(req, res) => {
    try {
      // Check if user exists
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const favorites = await Favorites.find({ userId: req.user._id });
      const favoriteDetails = [];
  
      for (const favorite of favorites) {
        const itemDetails = await getItemDetails(favorite.itemId, favorite.itemType);
        favoriteDetails.push({
          favoriteId: favorite._id,
          itemDetails,
        });
      }
  
      res.json({favoriteDetails});
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching favorites');
    }
  }
  
  async function getItemDetails(itemId, itemType) {
    let itemDetails;
    switch (itemType) {
      case 'restaurant':
        itemDetails = await Restaurant.findById(itemId);
        break;
      case 'todo':
        itemDetails = await ThingToDo.findById(itemId);
        break;
      case 'place':
        itemDetails = await PlaceInfo.findById(itemId);
        break;
      case 'stay':
        itemDetails = await Stay.findById(itemId);
        break;
      default:
        throw new Error(`Invalid item type: ${itemType}`);
    }
  
    return itemDetails;
  }


export { addFavorite, removeFavorite, getFavorites };
