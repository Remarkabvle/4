let menu = document.querySelector(".header__hamburger");
let header = document.querySelector(".header");
let navBar = document.querySelector(".header__list");
let Close = document.querySelector(".header__item--close");


window.addEventListener("scroll", function () {
    showHeaderShrink();
});


Close.addEventListener("click", function () {
    navBar.classList.remove("header__show__list")
})

function showHeaderShrink() {
    if (scrollY > 0) {
        header.classList.add("show__header__shrink");
    } else {
        header.classList.remove("show__header__shrink");
    }
}


