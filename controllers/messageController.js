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

  const data = await messageModel.getMessages()
  const table = await utilities.messageInfo(data)

      res.render("messages/inbox", {
        title: "Inbox",
        nav,
        errors: null,
        table,
      })
  
    }


/* ***************************
 *  This is the function to build the inbox page
 * ************************** */
async function newMessage(req, res, next) {

  let nav = await utilities.getNav()

      res.render("messages/newMessage", {
        title: "Send New Message",
        nav,
        errors: null,
      })
  
    }


/* ***************************
 *  This is the function to build the inbox page
 * ************************** */
async function archiveMess(req, res, next) {

  let nav = await utilities.getNav()

      res.render("messages/archives", {
        title: "Archived Messages",
        nav,
        errors: null,
      })
  
    }
    

module.exports = {
  inboxHome,
  newMessage,
  archiveMess
}