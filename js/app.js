const loading = document.querySelector(".loading")
const API__URL = "https://dummyjson.com"
const seeMore = document.querySelector(".btn__see-more")
let limitCount = 4
let count = 1

createLoadingItem(limitCount)

async function fetchData(url) {
    const data = await fetch(`${url}/products?limit=${limitCount * count}`, {
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

fetchData(API__URL)



let wrapper = document.querySelector(".wrapper")

function createCard(figures){
    let card = ""
    figures.products.forEach(element => {
        card += `
        <div class="card">
            <img src=${element.images[0]} alt="">
            <h2 class="card__brand">${element.brand}</h2>
            <p class="card__price">Price:${element.price}$</p>
            <p class="card__description">${element.description}</p>
            <h3 class="card__rating">Rating:${element.rating}</h3>
            </div> 
            

            `
        });
        wrapper.innerHTML = card
    }
    seeMore.addEventListener("click", ()=>{ 
        count++
        fetchData(API__URL)
        seeMore.innerHTML = "Loading..."
        seeMore.setAttribute("disabled", true)
    })

    function createLoadingItem(count) {
        let loadingItems = ""
        for(let i =0; i < count; i++){
            loadingItems += `
            <div class="loading__item">
                <div class="loading__image bg__animation"></div>
                <div class="loading__title bg__animation"></div>
                <div class="loading__title bg__animation"></div>
            </div>
            `
        }
}