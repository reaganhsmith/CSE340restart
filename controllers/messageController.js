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
  const messageData = await messageModel.getSender(account_id)

  const archivedMessages = await messageModel.countArchives(account_id)
  const messageTable = await utilities.buildInboxGrid(messageData)

      res.render("messages/inbox", {
        title: "Inbox",
        nav,
        errors: null,
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
        message_body,
      })
  
    }


/* ***************************
 *  This is the function to build the inbox page
 * ************************** */
async function archiveMess(req, res, next) {
  let nav = await utilities.getNav()
  const account_id = res.locals.accountData.account_id
  const messageData = await messageModel.getMessageArchives(account_id)

  const archivedMessages = await messageModel.countArchives(account_id)
  const messageTable = await utilities.buildInboxGrid(messageData)

      res.render("messages/archives", {
        title: "Archives",
        nav,
        errors: null,
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



  const account_id = res.locals.accountData.account_id

  const messageData = await messageModel.getSender(account_id)
  const archivedMessages = await messageModel.countArchives(account_id)
  const messageTable = await utilities.buildInboxGrid(messageData)



  if(messageResults){
    req.flash(
      "notice",
      `Congratulations, you sent a message!`
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
  const message_id = parseInt(req.params.message_id)

  const account_id = res.locals.accountData.account_id
  const messageData = await messageModel.getMessageById(message_id)


  const replyLink = `/messages/reply/${messageData.message_id}`

  const messageSubject = messageData.message_subject
  const messageBody = messageData.message_body
  
  const messageRead = messageData.message_read


  const messageFrom = messageData.message_from
  
  const fromName = await messageModel.getFromFN(messageFrom)

  res.render("./messages/message", {
    title: messageSubject,
    nav,
    errors: null,
    fromName: fromName.account_firstname,
    messageBody: messageBody,
    message_id,
    replyLink, 
    messageRead: messageRead,
  })
}



/* ***************************
 *  This is the function to delete a message
 * ************************** */
async function deleteMessage(req, res, next) {
  let nav = await utilities.getNav()

  const {
    message_id
  } = req.body

  const messageResults = await messageModel.deleteMessage(
    message_id
  )

  const account_id = res.locals.accountData.account_id


  const messageData = await messageModel.getSender(account_id)
  const archivedMessages = await messageModel.countArchives(account_id)
  const messageTable = await utilities.buildInboxGrid(messageData)


  if(messageResults){
    req.flash(
      "notice",
      `Message Deleted!`
    )
    res.render("messages/inbox", {
      title: "Inbox",
      nav,
      errors: null,
      messageTable,
      archivedMessages,
    })
  } else{
    req.flash("notice", "sorry unable to delete message")

      const messageInfo = await messageModel.getMessageById(message_id)
      const messageSubject = messageInfo.message_subject
      const messageBody = messageInfo.message_body

      const message_from = messageInfo.message_from
      const fromName = await messageModel.getFromFN(message_from)

    res.status(501).render("./messages/message", {
      title: messageSubject,
      nav,
      errors: null,
      messageFrom: fromName.account_firstname,
      messageBody: messageBody,
    })
  }
}

/* ***************************
 *  This is the function to archive a message
 * ************************** */
async function archiveMessage(req, res, next) {
  let nav = await utilities.getNav()

  const {
    message_id
  } = req.body

  const messageResults = await messageModel.archiveMessage(
    message_id
  )

  const account_id = res.locals.accountData.account_id
  const messageData = await messageModel.getSender(account_id)
  const archivedMessages = await messageModel.countArchives(account_id)
  const messageTable = await utilities.buildInboxGrid(messageData)


  if(messageResults){
    req.flash(
      "notice",
      `Message archived!`
    )
    res.render("messages/inbox", {
      title: "Inbox",
      nav,
      errors: null,
      messageTable,
      archivedMessages,
    })
  } else{
    req.flash("notice", "sorry unable to delete message")


      const messageInfo = await messageModel.getMessageById(message_id)
      const messageSubject = messageInfo.message_subject
      const messageBody = messageInfo.message_body

      const message_from = messageInfo.message_from
      const fromName = await messageModel.getFromFN(message_from)

    res.status(501).render("./messages/message", {
      title: messageSubject,
      nav,
      errors: null,
      messageFrom: fromName.account_firstname,
      messageBody: messageBody,
    })
  }
}




/* ***************************
 *  This is the function to read a message
 * ************************** */
async function readMessage(req, res, next) {
  let nav = await utilities.getNav()

  const {
    message_id
  } = req.body

  const messageResults = await messageModel.readMessage(
    message_id
  )

  const account_id = res.locals.accountData.account_id

  const messageData = await messageModel.getSender(account_id)
  const archivedMessages = await messageModel.countArchives(account_id)
  const messageTable = await utilities.buildInboxGrid(messageData)

  const messageInfo = await messageModel.getMessageById(message_id)
console.log(messageInfo.message_read)
  if(messageResults){

    if(messageInfo.message_read == true){
     req.flash(
      "notice",
      `Message marked as read!`
    ) 
    }else{
      req.flash(
        "notice",
        `Message marked as unread!`
      ) 
    }
    
    res.render("messages/inbox", {
      title: "Inbox",
      nav,
      errors: null,
      messageTable,
      archivedMessages,
    })
  } else{
    req.flash("notice", "sorry unable to read message")


      const messageInfo = await messageModel.getMessageById(message_id)
      const messageSubject = messageInfo.message_subject
      const messageBody = messageInfo.message_body

      const message_from = messageInfo.message_from
      const fromName = await messageModel.getFromFN(message_from)

    res.status(501).render("./messages/message", {
      title: messageSubject,
      nav,
      errors: null,
      messageFrom: fromName.account_firstname,
      messageBody: messageBody,
    })
  }
}


/* ***************************
 *  This is the function to build the inbox page
 * ************************** */
async function reply(req, res, next) {
  const message_id = parseInt(req.params.message_id)
  let nav = await utilities.getNav()
  const account_id = res.locals.accountData.account_id

  const messageData = await messageModel.getMessageById(message_id)
  const replyPost = `/messages/reply/${messageData.message_id}`


  const messageSubject = messageData.message_subject
  const message_subject = " "
  const message_body = " "
  const messageBody = messageData.message_body

  const accountSelect = await utilities.selectAccount()

  const message_from = messageData.message_from
  const fromName = await messageModel.getFromFN(message_from)

      res.render("messages/reply", {
        title: messageSubject,
        nav,
        errors: null,
        messageFrom: fromName.account_firstname,
        messageBody: messageBody,
        accountSelect,
        account_id: account_id,
        message_subject,
        message_body,
        replyPost,

      })
    }

/* ***************************
 *  This is the function to unread a message
 * ************************** */
async function unreadMessage(req, res, next) {
  let nav = await utilities.getNav()

  const {
    message_id
  } = req.body

  const messageResults = await messageModel.unreadMessage(
    message_id
  )

  const account_id = res.locals.accountData.account_id

  const messageData = await messageModel.getSender(account_id)
  const archivedMessages = await messageModel.countArchives(account_id)
  const messageTable = await utilities.buildInboxGrid(messageData)


  if(messageResults){
    req.flash(
      "notice",
      `Message marked as read!`
    )
    res.render("messages/inbox", {
      title: "Inbox",
      nav,
      errors: null,
      messageTable,
      archivedMessages,
    })
  } else{
    req.flash("notice", "sorry unable to delete message")


      const messageInfo = await messageModel.getMessageById(message_id)
      const messageSubject = messageInfo.message_subject
      const messageBody = messageInfo.message_body

      const message_from = messageInfo.message_from
      const fromName = await messageModel.getFromFN(message_from)

    res.status(501).render("./messages/message", {
      title: messageSubject,
      nav,
      errors: null,
      messageFrom: fromName.account_firstname,
      messageBody: messageBody,
    })
  }
}




module.exports = {
  inboxHome,
  newMessage,
  archiveMess,
  sentMessage,
  MessageID,
  deleteMessage,
  archiveMessage,
  readMessage,
  reply,
  unreadMessage
}