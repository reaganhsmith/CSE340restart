const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

const messageModel = require("../models/message-model.js")

/*  **********************************
 *  New Message Data Validation Rules
 * ********************************* */
validate.newMessageRules = () => {
    return [
        body("message_to")
        .trim()
        .isLength({min: 1})
        .withMessage("please select a recipiant"),

        body("message_subject")
        .trim()
        .isLength({min: 1})
        .withMessage("Please provide a subject"),
  
        body("message_body")
        .trim()
        .isLength({min: 1})
        .withMessage("Please include a message"),

    ]
  }


validate.checkMessData = async (req, res, next) => {
    const{ message_to, message_from, message_subject, message_body} = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
    const account_id = parseInt(req.params.account_id)
     let nav = await utilities.getNav()
     const accountSelect = await utilities.selectAccount()

     res.render("messages/newMessage", {
       title: "Send New Message",
       nav,
       errors,
       account_id: account_id,
       accountSelect,
       message_to,
       message_from,
       message_subject: message_subject,
       message_body
     })
     return
    }
    next()
}

validate.checkReplyData = async (req, res, next) => {
    const{ message_to, message_from, message_subject, message_body} = req.bodyy
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {

        const message_id = parseInt(req.params.message_id)
        console.log(message_id)
        let nav = await utilities.getNav()

        const account_id = res.locals.accountData.account_id

        const messageData = await messageModel.getMessageById(message_id)
        const messageSubject = messageData.message_subject
        const messageBody = messageData.message_body
        const replyPost = `/messages/reply/${messageData.message_id}`

        const accountSelect = await utilities.selectAccount()

        const messageFrom = messageData.message_from
        const fromName = await messageModel.getFromFN(messageFrom)

      res.render("messages/reply", {
        title: messageSubject,
        nav,
        errors,
        account_id: account_id,
        accountSelect,
        message_to,
        message_from,
        message_subject: message_subject,
        message_body,
        messageFrom: fromName.account_firstname,
        messageBody: messageBody,
        accountSelect,
        replyPost,
      })
     return
    }
    next()
}






module.exports = validate