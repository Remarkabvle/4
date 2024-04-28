const wrapper = document.querySelector(".wrapper")
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []

function createCard(data){
    let cards = ""
    data.forEach((product)=> {
        cards += `
        <div class="card" data-id=${product.id}>
            <img class="card__image" src=${product.images[0]} alt="">
            <h3>${product.title}</h3>
            <p>${product.price} USD</p>
            <button class="header__btn__sigin">Buy now</button>
            <i class="fa-regular fa-heart"></i>
        </div>
        `
    })
    wrapper.innerHTML = cards
}

const addToWishlist = (id)=>{
    let wishlist = JSON.parse(localStorage.getItem("wishlist"))
    let updatedWishlist = wishlist.filter(el => el.id !== +id)
    localStorage.setItem("wishlist",JSON.stringify(updatedWishlist))
    createCard(updatedWishlist)
}
createCard(wishlist)
wrapper.addEventListener("click", (e)=>{
    if(e.target.className === "card__image"){
        let id = e.target.closest(".card").dataset.id
        window.open(`./product.html?productId=${id}`, "_self")
    }else if(e.target.className.includes("fa-heart")){
        let id = e.target.closest(".card").dataset.id
        addToWishlist(id)      
    }
})




