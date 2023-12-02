import Todo from "../model/todoModel.js";

// index all todos
const index = (req, res, next) => {
  Todo.find()
    .populate("location")
    .populate("reviews")
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occurred!",
      });
    });
};

// show single todo
const show = (req, res, next) => {
  let todoID = req.params.id;
  Todo.findById(todoID)
    .populate("location")
    .populate("reviews")
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occurred!",
      });
    });
};

// store new todo
const store = (req, res, next) => {
  let todo = new Todo({
    name: req.body.name,
    location: req.body.location,
    time2visit: req.body.time2visit,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    address: req.body.address,
    phone : req.body.phone,
    website: req.body.website,
    rating: req.body.rating,
    tags : req.body.tags,
  });
  todo
    .save()
    .then((response) => {
      res.json({
        message: "Todo added successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occurred!",
      });
    });
};

// update existing todo
const update = (req, res, next) => {
  let todoID = req.body.todoID;
  let updateData = {
    name: req.body.name,
    location: req.body.location,
    time2visit: req.body.time2visit,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    address: req.body.address,
    phone : req.body.phone,
    website: req.body.website,
    rating: req.body.rating,
    tags : req.body.tags,
  };
  Todo.findByIdAndUpdate(todoID, { $set: updateData })
    .then(() => {
      res.json({
        message: "Todo updated successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occurred!",
      });
    });
};

// destroy a todo
const destroy = (req, res, next) => {
  let todoID = req.body.todoID;
  Todo.findByIdAndRemove(todoID)
    .then(() => {
      res.json({
        message: "Todo deleted successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occurred!",
      });
    });
};

export default {
  index,
  show,
  store,
  update,
  destroy,
};
