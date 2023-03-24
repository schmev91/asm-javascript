var cart = document.querySelector('.cart-container')
, cartBtn = document.querySelector('.header-cart')
, closeCartBtn = document.querySelector('.cart-header .close i')
, itemsArr = []

function addToCart(){

    itemsArr.push({
        name: document.querySelector('.product-name').innerText,
        price: document.querySelector('.product-price').innerText,
        quantity: document.querySelector('.product-quantity').value,
        imgPath: document.querySelector('.product-image').src
    })
    console.log(itemsArr[itemsArr.length-1])
    reloadCart()
}
function reloadCart(){

}

function prepareProductPage(){

}

//ON - OFF CART PANEL
cartBtn.addEventListener('click',()=>{
    cart.classList.remove('hidden')
})
closeCartBtn.addEventListener('click',()=>{
    cart.classList.add('hidden')
})