const utilities = require('../utilities/index')
const messageModel = require('../models/message-model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()



/* ***************************
 *  This is the function to build the inbox page
 * ************************** */
async function inboxHome(req, res, next) {

    let nav = await utilities.getNav()
  
      res.render("account/inbox", {
        title: "Inbox",
        nav,
        errors: null,
        inboxAmount,
      })
  
    }

    

module.exports = {
  inboxHome
}