const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function() {
    
    showLoginModal();
});

function showLoginModal() {
    const loginModal = document.getElementById("loginModal");
    loginModal.style.display = "block";
}
