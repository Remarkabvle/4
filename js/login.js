const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function() {
    
    showLoginModal();
});

function showLoginModal() {
    const loginModal = document.getElementById("loginModal");
    loginModal.style.display = "block";
}

let loginForm = document.querySelector(".login-form");
const API__URL = "https://dummyjson.com"
const btn = document.querySelector(".btn")

let inputUsername = document.querySelector(".input__username")
let inputPassword = document.querySelector(".input__password")

loginForm.addEventListener("submit", (e)=>{
   e.preventDefault()

        let user = {
            username: inputUsername.value,
            password: inputPassword.value
        }
   signIn(user);

})

async function signIn(user) {
    await fetch(`${API__URL}/auth/login`,{
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)  
    })
    .then(res => res.json())
    .then(res => {console.log("res>>>>",res)
    if(res.message == "Invalid credentials"){
        return alert("Username or password is incorrect")
    } 
    localStorage.setItem("x-auth-token", res.token)
    window.open("./pages/admin.html", "_self")
})
    .catch(err => console.log(err))

}

