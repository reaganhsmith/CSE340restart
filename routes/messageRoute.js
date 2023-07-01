const express = require("express")
const router = express.Router() 
const utilities = require('../utilities/')

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
utilities.handleErrors(messageCont.sentMessage))

//Route for each message
router.get("/:message_id",
utilities.checkAllLogin,
 utilities.handleErrors(messageCont.MessageID))

// Router post for sent message
router.post("/delete",
utilities.checkAllLogin,
utilities.handleErrors(messageCont.deleteMessage))

//Route to build registration page 
router.post("/newMessage",
utilities.checkAllLogin,
 utilities.handleErrors(messageCont.newMessage)) 

// Export both routers
module.exports = router;


