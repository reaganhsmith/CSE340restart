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

//Route to say they have logged in successfully  
router.get("/", 
utilities.checkLogin, utilities.handleErrors(accountCont.loggedIn))

//Route for registration 
router.post('/registration', 
regValidate.registationRules(), 
regValidate.checkRegData,
utilities.handleErrors(accountCont.registerAccount))

router.post(
  '/login',
regValidate.loginRules(),
regValidate.checkRegLogin,
utilities.handleErrors(accountCont.accountLogin))

// Process the login attempt
router.post(
    "/login",
    (req, res) => {
      res.status(200).send('login process')
    }
  )



//route to update the users account
router.get("/update", utilities.handleErrors(accountCont.editAccount))

//route post for update login info
router.post("/update",
regValidate.checkUpdateData,
utilities.handleErrors(accountCont.updateAccount)
)

  
// Export both routers
module.exports = router;