const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}
const invInv = {}
const createError = {}
const managment = {}
const buildClass = {}
const buildInv = {}
/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory for inventory id
 * ************************** */
invInv.buildByInventory = async function (req, res, next) {
  const inv_id = req.params.inventoryId
  const vehicleData = await invModel.getInventoryByIdentityId(inv_id)
  const carInfo = await utilities.buildVehicleInformation(vehicleData)
  let nav = await utilities.getNav()
  const VehicleMake = vehicleData[0].inv_make
  const VehicleModel = vehicleData[0].inv_model
  res.render("./inventory/vehicle", {
    title: VehicleMake +" "+ VehicleModel,
    nav,
    carInfo,
  })
}


/* ***************************
 *  Adds to the managment page
 * ************************** */
managment.addCar = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/managment", {
    title: "Manage Cars",
    nav,
  })
}


/* ***************************
 *  Build for add-classification
 * ************************** */
buildClass.newClass = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  })
}

/* ***************************
 *  Build for add-classification
 * ************************** */
buildInv.newInv = async function (req, res, next) {
  let nav = await utilities.getNav()
  let form = await utilities.addInventoryForm()
  res.render("./inventory/add-inventory", {
    title: "Add New Inventory",
    nav,
    errors: null,
    form,
  })
}


/* ***************************
 *  Adds new inventory to the database 
 * ************************** */
async function addInv(req, res) {
  let nav = await utilities.getNav()
  const {inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color, classification_id} = req.body

  const regResults = await invModel.addInv(
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail, 
    inv_price, 
    inv_year, 
    inv_miles, 
    inv_color,
    classification_id
    
  )

  if(regResults){
    req.flash(
      "notice",
      `Congratulations, you added a ${inv_model} ${inv_model} to the inventory`
    )
    res.status(201).render("inv/add-inventory",{
      title: "Add New Inventory",
      nav,
      errors: null
    })
  } else{
    req.flash("notice", "sorry unable to add car to inventory")
    res.status(501).render("inv/add-inventory",{
      title: "Add New Inventory",
      nav,
      errors: null,
    })
  }
}


/* ****************************************
*  Process new classifcation 
* *************************************** */
async function addClass(req, res) {
  let nav = await utilities.getNav()
  const {classification_name} = req.body

  const regResult = await invModel.addClass(
    classification_name
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you added ${classification_name} to your classifications.`
    )
    res.status(201).render("inv/add-inventory", {
      title: "Add New Inventory",
      nav
    })
  } else {
    req.flash("notice", "Sorry, that did not work, please try again.")
    res.status(501).render("account/add-classification", {
      title: "Add New Classification",
      nav
    })
  }
}



/* ***************************
 *  Build function that throws an error
 * ************************** */
createError.generateError = async function (req, res, next) {
  throw new Error('Intentional error!');
};





module.exports = {invCont, 
  invInv, 
  createError, 
  managment,
  buildClass,
  buildInv, 
  addInv,
  addClass};
