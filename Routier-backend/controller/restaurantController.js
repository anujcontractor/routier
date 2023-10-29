 import Restaurant from '../model/restaurantModel.js'
 const index=(req,res,next)=>{
        Restaurant.find()
        .then(response=>{
            res.json({
                response
            })
        })
        .catch(error=>{
            res.json({
                message:'An error occured!'
            })
        })
    }

    // show single restaurant
    const show=(req,res,next)=>{
        let restaurantID=req.body.restaurantID;
        Restaurant.findById(restaurantID)
        .then(response=>{
            res.json({
                response
            })
        })
        .catch(error=>{
            res.json({
                message:'An error occured!'
            })
        })
    }

    const store=(req,res,next)=>{
        let restaurant=new Restaurant({
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            cusine:req.body.cusine,
            rating:req.body.rating,
            price:req.body.price,
            image:req.body.image,
            description:req.body.description,
            veg:req.body.veg,
            nonveg:req.body.nonveg,
            type:req.body.type,
            time:req.body.time,
            website:req.body.website,
            menu:req.body.menu,
            reviews:req.body.reviews
        })
        if(req.file){
            restaurant.image=req.file.path
        }
        restaurant.save()
        .then(response=>{
            res.json({
                message:'Restaurant added successfully!'
            })
        })
        .catch(error=>{
            res.json({
                message:'An error occured!'
            })
        })
    }

    const update=(req,res,next)=>{
        let restaurantID=req.body.restaurantID;
        let updateData={
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            cusine:req.body.cusine,
            rating:req.body.rating,
            price:req.body.price,
            image:req.body.image,
            description:req.body.description,
            veg:req.body.veg,
            nonveg:req.body.nonveg,
            type:req.body.type,
            time:req.body.time,
            website:req.body.website,
            menu:req.body.menu,
            reviews:req.body.reviews
        }
        Restaurant.findByIdAndUpdate(restaurantID,{$set:updateData})
        .then(()=>{
            res.json({
                message:'Restaurant updated successfully!'
            })
        })
        .catch(error=>{
            res.json({
                message:'An error occured!'
            })
        })
    }

    const destroy=(req,res,next)=>{
        let restaurantID=req.body.restaurantID;
        Restaurant.findByIdAndRemove(restaurantID)
        .then(()=>{
            res.json({
                message:'Restaurant deleted successfully!'
            })
        })
        .catch(error=>{
            res.json({
                message:'An error occured!'
            })
        })
    }

export default {
    index,show,store,update,destroy};
