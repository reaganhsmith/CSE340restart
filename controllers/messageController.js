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
  const account_id = res.locals.accountData.account_id
  const messageData = await messageModel.getMessageInfo(account_id)
  const messageTable = await utilities.buildInboxGrid(messageData)


  const archivedMessages = await messageModel.countArchives(account_id)

      res.render("messages/inbox", {
        title: "Inbox",
        nav,
        errors: null,
        // account_id: messageTo,
        // messageSubject: messageData.message_subject,
        messageTable,
        archivedMessages,
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

  const account_id = res.locals.accountData.account_id

  const messageData = await messageModel.getMessageArchives(account_id)
  const messageTable = await utilities.buildInboxGrid(messageData)

  const archivedMessages = await messageModel.countArchives(account_id)

      res.render("messages/archives", {
        title: "Archives",
        nav,
        errors: null,
        // account_id: messageTo,
        // messageSubject: messageData.message_subject,
        messageTable,
        archivedMessages,
      })
  
    }



/* ***************************
 *  This is the function to send a message
 * ************************** */
async function sentMessage(req, res, next) {

  let nav = await utilities.getNav()
  const accountSelect = await utilities.selectAccount()

  const {message_to, message_subject, message_body, message_from} = req.body
  const messageResults = await messageModel.sendMessage(
    message_to,
    message_subject,
    message_body,
    message_from
  )

  const sentAccountData = await accountModel.getAccountById(message_to)
  const accountName = sentAccountData.account_firstname

  const account_id = res.locals.accountData.account_id

  const messageData = await messageModel.getMessageInfo(account_id)
  const messageTable = await utilities.buildInboxGrid(messageData)
  const archivedMessages = await messageModel.countArchives(account_id)


  if(messageResults){
    req.flash(
      "notice",
      `Congratulations, you sent a message to ${accountName}!`
    )
    res.render("messages/inbox", {
      title: "Inbox",
      nav,
      errors: null,
      messageTable,
      archivedMessages,
    })
  } else{
    req.flash("notice", "sorry unable to send message")
    res.status(501).render("messages/newMessage",{
      title: "Send New Message",
      nav,
      errors: null,
      accountSelect,
    })
  }
}



/* ***************************
 *  Build message info section
 * ************************** */
async function MessageID(req, res, next) {
  let nav = await utilities.getNav()
  const message_id = req.params.message_id

  const messageData = await messageModel.getMessageById(message_id)

  if (!messageData) {
      req.flash('error', 'That message does not exist');
      return res.status(400).render('messages/inbox', {
        title: 'Inbox',
        nav,
        errors: null,
      });
    }

  const messageSubject = messageData.message_subject
  const account_id = messageData.message_from
  const messageBody = messageData.message_body

  const fromData = accountModel.getAccountById(account_id)
  const messageFrom = fromData.account_firstname
  console.log(messageFrom)

  res.render("./messages/message", {
    title: messageSubject,
    nav,
    errors: null,
    messageFrom: account_id,
    messageBody: messageBody,

  })
}



/* ***************************
 *  This is the function to delete a message
 * ************************** */
/* ***************************
 *  This is the function to send a message
 * ************************** */
async function deleteMessage(req, res, next) {
}





module.exports = {
  inboxHome,
  newMessage,
  archiveMess,
  sentMessage,
  MessageID,
  deleteMessage
}