const express = require("express")
const router = express.Router() 
const utilities = require('../utilities/')
const messValidate = require('../utilities/message-validation')

const messageCont = require("../controllers/messageController")

//Route to view imbox
router.get("/",
utilities.checkAllLogin,
 utilities.handleErrors(messageCont.inboxHome))


//Route to build registration page 
router.get("/newMessage",
utilities.checkAllLogin,
 utilities.handleErrors(messageCont.newMessage))

//Route to build registration page 
router.get("/archives",
utilities.checkAllLogin,
 utilities.handleErrors(messageCont.archiveMess))

// Router post for sent message
router.post("/sent",
utilities.checkAllLogin,
messValidate.newMessageRules(),
messValidate.checkMessData,
utilities.handleErrors(messageCont.sentMessage))

//Route for each message
router.get("/:message_id",
utilities.checkAllLogin,
 utilities.handleErrors(messageCont.MessageID))

// Router post for sent message
router.post("/delete",
utilities.checkAllLogin,
utilities.handleErrors(messageCont.deleteMessage))

//Route to message page 
router.post("/reply/:message_id",
utilities.checkAllLogin,
 utilities.handleErrors(messageCont.reply)) 

 //Route to archive post 
router.post("/archive",
utilities.checkAllLogin,
 utilities.handleErrors(messageCont.archiveMessage)) 


//Route to read post 
router.post("/read",
utilities.checkAllLogin,
 utilities.handleErrors(messageCont.readMessage)) 


 //Route to unread post 
router.post("/unread",
utilities.checkAllLogin,
 utilities.handleErrors(messageCont.unreadMessage)) 

 //Route to build inbox home post
router.post("/",
utilities.checkAllLogin,
 utilities.handleErrors(messageCont.inboxHome)) 


 // Router post for sent message
router.post("/sendreply/:message_id",
utilities.checkAllLogin,
messValidate.newMessageRules(),
messValidate.checkReplyData,
utilities.handleErrors(messageCont.sentMessage))

// Export both routers
module.exports = router;


