const pswdBtnLogin = document.querySelector("#pswdBtnLogin");
pswdBtnLogin.addEventListener("click", function() {
const pswdInput = document.getElementById("loginPassword");
 const type = pswdInput.getAttribute("type");
if (type == "password") {
    pswdInput.setAttribute("type", "text");
    pswdBtnLogin.innerHTML = "Hide Password";
} else {
    pswdInput.setAttribute("type", "password");
    pswdBtnLogin.innerHTML = "Show Password";
}
});

const pswdBtn = document.querySelector("#pswdBtn");
pswdBtn.addEventListener("click", function() {
const pswdInput = document.getElementById("regPassword");
 const type = pswdInput.getAttribute("type");
if (type == "password") {
    pswdInput.setAttribute("type", "text");
    pswdBtn.innerHTML = "Hide Password";
} else {
    pswdInput.setAttribute("type", "password");
    pswdBtn.innerHTML = "Show Password";
}
});