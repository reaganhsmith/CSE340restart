const utilities = require('../utilities/index')
const messageModel = require('../models/message-model')
const accountModel = require('../models/account-model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()



/* ***************************
 *  This is the function to build the inbox page
 * ************************** */
async function inboxHome(req, res, next) {
  let nav = await utilities.getNav()

  const account_id = parseInt(req.params.account_id)
  const accountData = await accountModel.getAccountById(account_id)
  const accountInfo = accountData.account_id



      res.render("messages/inbox", {
        title: "Inbox",
        nav,
        errors: null,
        account_id: accountInfo,

      })
  
    }


/* ***************************
 *  This is the function to build the inbox page
 * ************************** */
async function newMessage(req, res, next) {

  const account_id = parseInt(req.params.account_id)
  let nav = await utilities.getNav()
  // const accountData = await accountModel.getAccountById(account_id)

  const accountSelect = await utilities.selectAccount()

      res.render("messages/newMessage", {
        title: "Send New Message",
        nav,
        errors: null,
        account_id: account_id,
        accountSelect,

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