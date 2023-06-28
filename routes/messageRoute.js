const express = require("express")
const router = express.Router() 
const utilities = require('../utilities/')

const messageCont = require("../controllers/messageController")




//Route to view imbox
router.get("/", utilities.handleErrors(messageCont.inboxHome))


//Route to build registration page 
router.get("/newMessage", utilities.handleErrors(messageCont.newMessage))

//Route to build registration page 
router.get("/archives", utilities.handleErrors(messageCont.archiveMess))

// Router post for sent message
router.post("/sent",
utilities.handleErrors(messageCont.sentMessage))


// Export both routers
module.exports = router;


