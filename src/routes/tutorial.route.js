
const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
    create,
    findAll,
    findOne,
    update,
    remove,
    validateTutorialInputs
  } = require("../controllers/tutorial.controller");

  // Create a new Tutorial
router.post("/create", upload.single("image"),validateTutorialInputs,create);

// Retrieve all Tutorials
router.get("/findAll", findAll);

// Retrieve a single Tutorial with id
router.get("/findOne/:id", findOne);

// Update a Tutorial with id
router.put("/update/:id", validateTutorialInputs,update);

// Delete a Tutorial with id
router.delete("/remove/:id", remove );

  module.exports = router;