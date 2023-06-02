const express = require("express")
const router = express.Router() 
const utilities = require('../utilities/')

const invController = require("../controllers/invController")

// Accessing the build
const invCont = invController.invCont;
const invInv = invController.invInv;
const managment = invController.managment;


// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invCont.buildByClassificationId));

// Route to build inventroy by inventory ID
router.get("/detail/:inventoryId",utilities.handleErrors(invInv.buildByInventory));

router.get("/inv", managment.addCar)

// Export both routers
module.exports = router;
