const wrapper =  document.querySelector(".wrapper")
const API_URL = "https://dummyjson.com"
const seeMore = document.querySelector(".btn__see-more")
let limitCount = 6
let count = 1

async function fetchData(api){
    const data = await fetch(`${api}/products?limit=${limitCount * count}`, {
        method: "GET"
    })

    data
        .json()
        .then(res => createCard(res))
        .catch(err => console.log(err))
        .finally(()=>{
          seeMore.innerHTML = "See more"
          seeMore.removeAttribute("disabled")
      })
}

fetchData(API_URL)

function createCard(data){
    let cards = ""

    data.products.forEach((product)=> {
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

const addToWishlist = async (id)=>{
    count =  0
    console.log("addToWishlist>>>>",id);
    let data = await fetch(`${API_URL}/products/${id}`)
    data
        .json()
        .then(product => {
            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
            let index = wishlist.findIndex(el => el.id === product.id)
            let updatedWishlist = []
            if (index < 0) {
                updatedWishlist = [...wishlist,product]
            }else{
                updatedWishlist = wishlist.filter(el => el.id !== product.id)
            }
            localStorage.setItem("wishlist",JSON.stringify(updatedWishlist))
        })
        .catch(err => console.log(err))
}
wrapper.addEventListener("click", (e)=>{
    if(e.target.className === "card__image"){
        let id = e.target.closest(".card").dataset.id
        window.open(`./pages/product.html?productId=${id}`, "_self")
    }else if(e.target.className.includes("fa-heart")){
        let id = e.target.closest(".card").dataset.id
        addToWishlist(id)   
    }
})

seeMore.addEventListener("click", ()=>{ 
  count++
  fetchData(API__URL)
  seeMore.innerHTML = "Loading..."
  seeMore.setAttribute("disabled", true)
})
