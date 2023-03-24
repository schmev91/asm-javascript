class cartItem {
    constructor (name, price, quantity, imgPath){
        this.name = name
        this.price = price
        this.quantity = quantity
        this.imgPath = imgPath
    }
    toHtml(itemId){
        return `<li>
        <div itemId="${itemId}" class="cart-item">
            <div class="item-thumbnail">
                <img src="${this.imgPath}" alt="">
            </div>
            <div class="info">
                <a class="item-name">${this.name}</a>
                <div>
                    <span class="item-quantity">${this.quantity}</span> x <span class="item-price">${this.price}</span>
                </div>
            </div>
            <div class="close">
                <i class="fa-regular fa-circle-xmark"></i>
            </div>
        </div>
    </li>`
    }
    getPrice(){
        return Number(this.price.slice(0,this.price.indexOf('$')))
    }
}

var cart = document.querySelector('.cart-container')
, cartBtn = document.querySelector('.header-cart')
, closeCartBtn = document.querySelector('.cart-header .close i')
, cartFooter = document.querySelector('.cart-content .footer')
, itemList = document.querySelector('.cart-content>ul')
, itemsArr = []


function addToCart(){

    itemsArr.push(new cartItem(
        document.querySelector('.product-name').innerText,
        document.querySelector('.product-price').innerText,
        document.querySelector('.product-quantity').value,
        document.querySelector('.product-image').src
    ))
    console.log(itemsArr[itemsArr.length-1])
    reloadCart()
}
function reloadCart(){
    itemList.innerHTML=''
    if(itemsArr.length){
        itemsArr.forEach((item, index)=>{
            itemList.innerHTML+=item.toHtml(index)
        })
        cartFooter.innerHTML = cartFooterRender(
            itemsArr.reduce(
                (total, item)=>total+item.getPrice()
                ,0
                )
        )

    }
}
function cartFooterRender(subtotal){
    return `<div>
    <p><Strong>Tạm tính: </Strong><span class="cart-subtotal">${subtotal}$</span></p>
</div>
<button type="button">THANH TOÁN</button>`
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