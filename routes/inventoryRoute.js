const express = require("express")
const router = express.Router() 
const utilities = require('../utilities/')

const invController = require("../controllers/invController")
const invValidate = require("../utilities/inventory-validation");

// Accessing the build
const invCont = invController.invCont;
const invInv = invController.invInv;
const managment = invController.managment;


// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invCont.buildByClassificationId));

// Route to build inventroy by inventory ID
router.get("/detail/:inventoryId",utilities.handleErrors(invInv.buildByInventory));

//Route to add a classification or inventory
router.get("/", utilities.handleErrors(managment.addCar))

//Route to add a classification
router.get("/inv/add-classification", utilities.handleErrors(invController.buildClass.newClass))

//route to add inventory
router.get("/inv/add-inventory", utilities.handleErrors(invController.buildInv.newInv))

//router post
router.post("/add-inventory",
invValidate.invRules(),
invValidate.checkInvData,
 utilities.handleErrors(invController.addInv.newInv))

//router post
router.post("/",
invValidate.classRules(),
invValidate.checkClassData,
utilities.handleErrors(invController.addClass.addNewClass))

// Export both routers
module.exports = router;
