const utilities = require('../utilities/index')
const messageModel = require('../models/message-model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()



/* ***************************
 *  This is the function to build the inbox page
 * ************************** */
async function inboxHome(req, res, next) {
  const account_id = parseInt(req.params.account_id)
  let nav = await utilities.getNav()
  const data = await messageModel.getMessagesInfo(21)
  const table = await utilities.messageInfo(data)

      res.render("account/inbox", {
        title: "Inbox",
        nav,
        errors: null,
        table,
      })
  
    }



    

module.exports = {
  inboxHome
}