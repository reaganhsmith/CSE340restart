const express = require("express")
const router = express.Router() 
const utilities = require('../utilities/index')

const accountCont = require('../controllers/accountController')

//accessing the build
const buildLogin = accountCont.buildLogin

// Route to build inventory by classification view
router.get("/account/login", utilities.handleErrors(buildLogin))


// Export both routers
module.exports = router;