const express = require("express")
const router = express.Router() 
const utilities = require('../utilities/index')

const accountCont = require('../controllers/accountController')

//accessing the build
const buildLogin = accountCont.buildLogin

// Route to build login page
router.get("/login", utilities.handleErrors(buildLogin))

//Route to build registration page 
router.get("/registration", utilities.handleErrors(accountCont.buildRegister))

//Route for registration 
router.post('/register', utilities.handleErrors(accountCont.registerAccount))

// Export both routers
module.exports = router;