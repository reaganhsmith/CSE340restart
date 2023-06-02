const express = require("express")
const router = express.Router() 
const utilities = require('../utilities/index')
const regValidate = require('../utilities/account-validation')

const accountCont = require('../controllers/accountController')

//accessing the build
const buildLogin = accountCont.buildLogin

// Route to build login page
router.get("/login", utilities.handleErrors(buildLogin))

//Route to build registration page 
router.get("/registration", utilities.handleErrors(accountCont.buildRegister))

//Route for registration 
router.post('/register', 
regValidate.registationRules(), 
regValidate.checkRegData,
utilities.handleErrors(accountCont.registerAccount))

router.post('/login',
regValidate.loginRules(),
regValidate.checkRegLogin,
utilities.handleErrors(accountCont.buildLogin))

// Process the login attempt
router.post(
    "/login",
    (req, res) => {
      res.status(200).send('login process')
    }
  )

  
// Export both routers
module.exports = router;