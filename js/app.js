const API_URL = "https://dummyjson.com";
const formSelect = document.querySelector("#form__select");
const inputSearch = document.querySelector(".input__search");
const seeMore = document.querySelector(".btn__see-more")
let limitCount = 4
let count = 1

async function fetchCategory(url) {
  let data = await fetch(`${url}/products/categories`, {
    method: "GET",
  });
  data
    .json()
    .then((res) => mapApi(res))
    .catch((err) => console.log(err));
}

fetchCategory(API_URL);

function mapApi(data) {
  let selectOption = `<option class="form__option" value="all">all</option>`;
  data.forEach((el) => {
    selectOption += `
             <option class="form__option" value="${el}">${el}</option>
        `;
  });

  formSelect.innerHTML = selectOption;
}
const wrapper = document.querySelector(".wrapper");

async function fetchProducts(api, option, searchValue) {
  let url = "";
  if (option === "all") {
    if (searchValue) {
      url = `${api}/products/search/?q=${searchValue}`;
    } else {
      url = `${api}/products`;
    }
  } else {
    url = `${api}/products/category/${option}`;
  }
  const data = await fetch(url, {
    method: "GET",
  });

  data
    .json()
    .then((res) => createCard(res))
    .catch((err) => console.log(err))
    .finally(()=>{
        seeMore.innerHTML = "See more"
        seeMore.removeAttribute("disabled")
    })
    
    
}

fetchProducts(API_URL, "all");

function createCard(data) {
  let cards = "";

  data.products.forEach((element) => {
    cards += `
        <div class="card">
        <img src=${element.images[0]} alt="">
        <h2 class="card__brand">${element.brand}</h2>
        <p class="card__price">Price:${element.price}$</p>
        <p class="card__description">${element.description}</p>
        <h3 class="card__rating">Rating:${element.rating}</h3>
        </div> 
        `;
  });
  wrapper.innerHTML = cards;
}

formSelect.addEventListener("change", (e) => {
  let optionValue = e.target.value;
  fetchProducts(API_URL, optionValue);
});

inputSearch.addEventListener("input", (e) => {
  let value = e.target.value.trim();
  if (value) {
    fetchProducts(API_URL, "all", value);
    select.value = "all";
  }
});

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

fetchData(API_URL)



seeMore.addEventListener("click", ()=>{ 
    count++
    fetchData(API__URL)
    seeMore.innerHTML = "Loading..."
    seeMore.setAttribute("disabled", true)
})