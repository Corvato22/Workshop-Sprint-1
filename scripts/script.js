const urlShoppingCart = "http://localhost:4002/products/"
const urlProducts = "http://localhost:4001/products/"
//Cards
let templateCard = document.getElementById("template-card").content;
let fragmentCards = document.createDocumentFragment();
let items = document.getElementById("items");

//ShoppingCart
let templateShoppingCart = document.getElementById("template-shopping-cart").content;
let fragmentShoppingCart = document.createDocumentFragment();
let itemsShoppingCart = document.getElementById("itemsShoppingCart");

const getProducts = async () => {
    let response = await fetch(urlProducts);
    let data = await response.json();
    return data;
}

const postItem = async (item) => {

    let response = await fetch(urlProducts);
    let data = await response.json();
    let dataBase = data.find(x => x.id == item)
    console.log(dataBase)

    let id = dataBase.id
    let name = dataBase.name
    let price = dataBase.price
    console.log(id, name, )

    await fetch(urlShoppingCart, {
        method: 'POST',
        body: JSON.stringify({
            id,
            name,
            price
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })

    console.log("item", item)
}

//Cards
const showProducts = async () => {
    let products = await getProducts();
    products.forEach(product => {
        const { name, price, images } = product
        templateCard.getElementById("productTitle").textContent = name;
        templateCard.getElementById("image").setAttribute("src", images[0]);
        templateCard.getElementById("price").textContent = price;
        templateCard.querySelector(".btn-dark").setAttribute("id", product.id);

        const clone = templateCard.cloneNode(true);
        fragmentCards.appendChild(clone);
    });
    items.appendChild(fragmentCards);
}

const getProductsCart = async () => {
    let response = await fetch(urlShoppingCart);
    let data = await response.json();
    return data;
}


const deleteItem = async (item) => {
    let idModificar = (item)
    let resp = await fetch(`http://localhost:4002/products/${idModificar}`, {
        method: 'DELETE',
    })
    let data = resp.json();
    console.log(data);
    console.log("item", item)
    item.preventDefault()
}

const showProductsCart = async () => {
    let products = await getProductsCart();
    products.forEach(product => {
        const { id, name, price } = product
        templateShoppingCart.getElementById("idProduct").textContent = id;
        templateShoppingCart.getElementById("name").textContent = name;
        templateShoppingCart.getElementById("price").textContent = price;
        templateShoppingCart.querySelector(".btnDelete").setAttribute("id", product.id);

        const clone = templateShoppingCart.cloneNode(true);
        fragmentShoppingCart.appendChild(clone);
    })
    itemsShoppingCart.appendChild(fragmentShoppingCart);
}



// const btnDelete = document.querySelector(".btn-delete");

// btnDelete.addEventListener('click', () => {
//         alert("Hola")
//     })


// const btnAdd = document.getElementById("btn-add");



// const addProducts = async () => {
//     const btnAdd = document.getElementById("btn-add");
//     btnAdd.addEventListener('click', () => {
//         alert("Hola")
// let response = await fetch(urlShoppingCart);
// let data = await response.json();
// console.log(response)
// return data;
//     })
// };


// btnDelete.onclick = async function (e) {
//     alert("funciona")

//     id = product.id
//     name = product.name
//     price = product.price

//     await fetch(urlShoppingCart, {
//         method: 'POST',
//         body: JSON.stringify({
//             id,
//             name,
//             price
//         }),
//         headers: {
//             "Content-Type": "application/json; charset=UTF-8"
//         }
//     })
//     e.preventDefault();
// }

// window.onload = function (){
//     const btnAdd = document.getElementById("btn-add");
//     btnAdd.addEventListener('click', () => {
//         alert("Hola")
// let response = await fetch(urlShoppingCart);
// let data = await response.json();
// console.log(response)
// return data;
//     })
// }



document.addEventListener('DOMContentLoaded', () => {
    showProducts()
    showProductsCart()
})