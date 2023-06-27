const invModel = require("../models/inventory-model")
const accModel = require("../models/account-model")
const messageModel = require("../models/message-model")
const Util = {}
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}


/* **************************************
* Build the car view HTML
* ************************************ */


Util.buildVehicleInformation = async function(vehicleData){
  let carInfo = "";
  if(vehicleData.length > 0){
    carInfo += '<div class="CarSection">';
    vehicleData.forEach(vehicle => {
      carInfo += '<div><img src="' + vehicle.inv_image
                 +'" alt="Image of '+ vehicle.inv_make + ' ' 
                 + vehicle.inv_model + ' on CSE Motors" /></div>';
      carInfo += '<div class="CarDetails">';
      carInfo += '<h2>' + vehicle.inv_make + ' ' + vehicle.inv_model + ' Details </h2>';
      carInfo +=  '<h3> Price: $' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</h3>';
      carInfo += '<p> <strong> Description: </strong>' + vehicle.inv_description + '</p>';
      carInfo += '<p> <strong> Color: </strong>' + vehicle.inv_color + '</p>';
      carInfo += '<p> <strong> Miles: </strong>' + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + '</p>';
      carInfo += '</div>';
    });
    carInfo += '</div>';
  } else { 
    carInfo += '<p class="notice"> Sorry, there is no information about this vehicle. </p>';
  }
  return carInfo;
}



/* **************************************
* build form inventory
* ************************************ */
Util.addInventoryForm = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let form = '<select id="newClass" name="classification_id" required >'
  form += '<option value =""> Please select a classification </option>'
  data.rows.forEach((row) => {
    form += '<option value="'+row.classification_id + '">'
    + row.classification_name + '</option>'
  })
  form += '</select>'
  return form
}




/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     if (res.locals.accountData.account_type == "Employee" || res.locals.accountData.account_type =="Admin")
      {
        res.locals.allow = 1;
        
      }
      else{
        res.locals.allow = 0;
      }
      next()
    })
  } else {
   next()
  }
 }




 /* ****************************************
 *  Check Login
 * ************************************ */
 Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
 }


/* ****************************************
 *  Check if they are allowed or not on a page by account type 
 * ************************************ */
Util.checkAccountType = (req, res, next) => {
 if (res.locals.accountData){
    if (res.locals.allow) {
      next()
  }
  else{
    req.flash("notice", "You do not have access to this page")
    return res.redirect("/account/")
  }
 }
 else{
  req.flash("notice", "Please log in.")
  return res.redirect("/account/login")
 }
  
 }

/* ****************************************
 *  Deletes the cookies and jwt
 * ************************************ */
Util.deleteJwt = (req, res, next) =>{
  if(req.cookies.jwt)
{
  res.clearCookie("jwt", {httpOnly: true})
  return res.status(403).redirect("/")
  
}else{
  next()
}
}

/* ****************************************
 *  Build table to show message info 
 * ************************************ */
  Util.messageInfo = async function(data){
    let messages
    if(1 > 0){
      messages += '<div class="messageSection">'
      messages += '<table>'
      messages += '<tr> <th>Received</th> <th>Subject</th> <th>From</th> <th>Read</th> </tr>'
      // data.forEach(message => {

      //   messages += '<th>'
      //   messages += '<td>' + message.message_created + '</td>'
      //   messages += '<td>' + message.message_subject + '</td>'
      //   messages += '<td>' + message.message_to + '</td>'
      //   messages += '<td>' + message.message_read + '</td>'
      //   messages += '</th>'
        
      // });
      messages += '</table>'
      messages += '</div>'
    } else { 
      messages += '<p class="notice"> Sorry, there are no messages. </p>';
    }
    return messages;
  }
    



/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util




