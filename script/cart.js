class cartItem {
    constructor(name, price, quantity, imgPath) {
        this.name = name
        this.price = price
        this.quantity = quantity
        this.imgPath = imgPath
    }
    toHtml() {
        return `<li>
        <div class="cart-item">
            <div class="item-thumbnail">
                <img src="${this.imgPath}" alt="">
            </div>
            <div class="info">
                <a class="item-name">${this.name}</a>
                <div>
                    <span class="item-quantity">${this.quantity}</span> x <span class="item-price">${this.price}</span>
                </div>
            </div>
            <div class="close" onclick="removeCartItem('${this.name}')">
                <i class="fa-regular fa-circle-xmark"></i>
            </div>
        </div>
    </li>`
    }
    getPrice() {
        return Number(this.price.slice(0, this.price.indexOf('$')))
    }
    getQuantity() {
        return Number(this.quantity)
    }
    increaseQuantity(amount) {
        this.quantity = Number(this.quantity) + Number(amount)
    }
}

var cart = document.querySelector('.cart-container')
    , cartBtn = document.querySelector('.header-cart')
    , closeCartBtn = document.querySelector('.cart-header .close i')
    , cartFooter = document.querySelector('.cart-content .footer')
    , itemList = document.querySelector('.cart-content>ul')
    , itemsArr = []


function addToCart() {
    const productName = document.querySelector('.product-name').innerText,
        productQuantity = document.querySelector('.product-quantity').value

    let duplicateIndex,
        isDuplicate

    if (itemsArr.length) {
        isDuplicate = itemsArr.some((item, index) => {
            if (item.name == productName) {
                duplicateIndex = index
                return true
            }
            return false
        })
    }

    if (isDuplicate) {
        itemsArr[duplicateIndex].increaseQuantity(productQuantity)
    } else {
        itemsArr.push(new cartItem(
            productName,
            document.querySelector('.product-price').innerText,
            productQuantity,
            document.querySelector('.product-image').src
        ))
    }


    reloadCart()
}

function removeCartItem(name) {
    let removeItemIndex
    itemsArr.some((item, index) => {
        if (item.name == name) {
            removeItemIndex = index
            return true
        }
        return false
    })
    itemsArr.splice(removeItemIndex, 1)
    reloadCart()
}

function cartFooterRender(subtotal) {
    let rounded
    , toString = String(subtotal)
    if(toString.indexOf('.') >= 0) {
        rounded = toString.slice(toString.indexOf('.'))
        if(rounded.length > 3) rounded = rounded.slice(0, 3)
    }
    return `<div>
    <p><Strong>Tạm tính: </Strong><span class="cart-subtotal">${rounded ? toString.slice(0, toString.indexOf('.')).concat(rounded) : subtotal}$</span></p>
</div>
<button type="button">THANH TOÁN</button>`
}

function reloadCart() {
    itemList.innerHTML = ''
    cartFooter.innerHTML = ''
    if (itemsArr.length) {
        itemsArr.forEach((item, index) => {
            itemList.innerHTML += item.toHtml(index)
        })
        cartFooter.innerHTML = cartFooterRender(
            itemsArr.reduce(
                (total, item) => total + item.getPrice() * item.getQuantity()
                , 0
            )
        )

    }
    //setQuantity
    let cartQuantity = document.querySelector('.header-cartQuantity')
    if(itemsArr.length)
    {
        cartQuantity.innerHTML = itemsArr.length
        cartQuantity.style.display = 'block'
    } else cartQuantity.style.display = 'none'
}

//ON - OFF CART PANEL
cartBtn.addEventListener('click', () => {
    cart.classList.remove('hide-cart')
})
closeCartBtn.addEventListener('click', () => {
    cart.classList.add('hide-cart')
})