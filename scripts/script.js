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
let btnDelete = document.getElementById("btnDelete");

const getProducts = async () => {
    let response = await fetch(urlProducts);
    let data = await response.json();
    console.log(response)
    return data;
}

//Cards
const showProducts = async () => {
    let products = await getProducts();
    products.forEach(product => {
        const { name, price, images } = product

        templateCard.getElementById("productTitle").textContent = name;
        templateCard.getElementById("image").setAttribute("src", images[0]);
        templateCard.getElementById("price").textContent = price;
        const clone = templateCard.cloneNode(true);
        fragmentCards.appendChild(clone);
    });
    items.appendChild(fragmentCards);
}


const getProductsCart = async () => {
    let response = await fetch(urlShoppingCart);
    let data = await response.json();
    console.log(response)
    return data;
}

const showProductsCart = async () => {
    let products = await getProductsCart();
    products.forEach(product => {
        const { id, name, price } = product
        templateShoppingCart.getElementById("idProduct").textContent = id;
        templateShoppingCart.getElementById("name").textContent = name;
        templateShoppingCart.getElementById("price").textContent = price;
        templateShoppingCart.getElementById("btnDelete").setAttribute("id", product.id);
        const clone = templateShoppingCart.cloneNode(true);
        fragmentShoppingCart.appendChild(clone);
    });
    itemsShoppingCart.appendChild(fragmentShoppingCart);
}



// btnDelete.addEventListener('click', async () => {
//     let idModificar = document.getElementById('id').value;
//     let resp = await fetch(`http://localhost:4002/products/${idModificar}`, {
//         method: 'DELETE',
//     })
//     let data = resp.json();
//     console.log(data);
// })

document.addEventListener('DOMContentLoaded', () => {
    showProducts()
    showProductsCart()
})