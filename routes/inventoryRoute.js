const express = require("express")
const router = express.Router() 

const invController = require("../controllers/invController")
// Accessing the objects
const invCont = invController.invCont;
const invInv = invController.invInv;

// Route to build inventory by classification view
router.get("/type/:classificationId", invCont.buildByClassificationId);

// Route to build inventroy by inventory ID
router.get("/detail/:inventoryId", invInv.buildByInventory);

// Export both routers
module.exports = router;

