let isLogin = localStorage.getItem("x-auth-token")
let log = document.querySelector(".log")

function checkUser() {
    if (!isLogin) {
        window.location.replace("/pages/login.html")
    }
}

checkUser()
log.addEventListener("click", ()=> {
    localStorage.removeItem("x-auth-token")
    window.open("../index.html", "_self");
})


