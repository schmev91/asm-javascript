var cart = document.querySelector('.cart-container')
, cartBtn = document.querySelector('.header-cart')
, closeCartBtn = document.querySelector('.cart-container .cart-close i')

cartBtn.addEventListener('click',()=>{
    cart.classList.remove('hidden')
})
console.log(cart)
closeCartBtn.addEventListener('click',()=>{
    cart.classList.add('hidden')
})