import express from 'express';
import placeinfoController from '../controller/placeinfoController.js';
const router = express.Router();

/*
router.get("/placeinfoRoutes", async (req, res) => {
    try{
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        
        let category = req.query.category || "All";

        const categoryOptions = [
            "Beaches",
            "Cultural",
            "Adventure",
            "Business",
            "Shopping",
            "Wildlife",
            "Mountains",
            "Caves",
            "Rural",
            "Film",
            "National Park",
        ];

        category === "All"
            ?(category = [...categoryOptions])
            :(category = req.query.category.split(","));


        const places = await placeinfoModel.find({name: {$regex:search, $options:"i"}})
        .where("category")
        .in([...category])
        .skip(page * limit)
        .limit(limit)

        const total = await placeinfoModel.countDocuments({
            category: {$in: [...category]},
            name: {$regex: search, $options: "i"},
        })

        const response = {
            error: false,
            total,
            page: page+1,
            limit,
            category: categoryOptions,
            placeinfoRoutes,  
        }

        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:true, message:"Internal Server Error"});
    }
})
*/

router.get('/', placeinfoController.show);
router.get('/:id', placeinfoController.showbyid);
router.post('/add', placeinfoController.addPlace);
router.delete('/:id', placeinfoController.deletePlace);
router.post('/:id/addRestaurant', placeinfoController.addRestaurantToPlace);
router.post('/:id/addStay', placeinfoController.addStayToPlace);
router.post('/:id/addTodo', placeinfoController.addTodoToPlace);

export default router;