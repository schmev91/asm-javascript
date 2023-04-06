var styleSheet = document.getElementsByTagName("link")[1],
    main = document.querySelector("main"),
    mainPages = ['home', 'shop', 'blog', 'policy', 'contact', 'fact', 'aboutus']

function setMain(html) {
    main.innerHTML = html
}
function setStyle(path) {
    styleSheet.href = path
}
function changePage(path) {
    window.scrollTo(0, 0);
    let isHome = path == 'home'
        , isProduct = !mainPages.includes(path)
    //html
    fetch(`sub-pages/${path}-main.html`)
        .then(res => res.text())
        .then(text => {
            setMain(text)
            if (isHome) {
                productLoader(bestSellingProducts)
                bannerLoader()
            }
        })
    //css
    setStyle(`asset/stylesheet/${isProduct ? "product" : path}.css`)
    if (isProduct) setTimeout(() => productScript(), 1000)
}

function setNavigate(className, path) {
    document.getElementsByClassName(className)[0].addEventListener('click', function () {
        let navBar = document.querySelector('.nav-bar')
            , inUse = 'in-use'
        navBar.getElementsByClassName(inUse)[0].classList.remove(inUse)
        navBar.getElementsByClassName(className)[0].classList.add(inUse)
        changePage(path)
    })
}

//===PRODUCT===
function productScript() {
    var items = document.getElementsByClassName("img-option-item"),
        image = document.querySelector(".img>img"),
        inUseNode = items[0]

    for (i = 0; i < items.length; i++) {
        items[i].addEventListener("click", (e) => {
            image.src = e.target.src
            e.target.parentNode.classList.add("img-option-displaying")
            inUseNode.classList.remove("img-option-displaying")
            inUseNode = e.target.parentNode
        })
    }
}

function quantityEditor({ value, step }) {
    let quantityNode = document.querySelector('.product-quantity'),
        quantityValue = Number(quantityNode.value)
    if (value == '-' && quantityValue == 1) return

    quantityValue += value == '+' ? Number(step) : -Number(step)
    quantityNode.value = quantityValue

}
//===END-PRODUCT===

var bannerIndex = 1
function bannerHandler(value) {
    bannerIndex += value
    if (bannerIndex > 3) {
        bannerIndex = 1
    } else if (bannerIndex < 1) {
        bannerIndex = 3
    }
    fetch(`./script/asset/banner/${bannerIndex}.html`)
        .then(res => res.text())
        .then(data=>{
            changeBanner(data, bannerIndex)
        })

}
function changeBanner(content, backgroundIndex) {
    let bannerNode = document.getElementsByClassName('banner')[0]
    bannerNode.innerHTML = content
    bannerNode.style.backgroundImage = `url(./asset/img/banner/${backgroundIndex}.png)`

}
function bannerLoader(){
    fetch(`./script/asset/banner/${bannerIndex}.html`)
        .then(res => res.text())
        .then(data=>{
            changeBanner(data, bannerIndex)
            document.getElementsByClassName('banner-leftButton')[0]
            .addEventListener('click',function(){bannerHandler(-1)})
            document.getElementsByClassName('banner-rightButton')[0]
            .addEventListener('click',function(){bannerHandler(1)})
        })

}

class product {
    constructor(alias, className, name, type, price, imgPath) {
        this.alias = alias,
            this.className = className,
            this.name = name,
            this.type = type,
            this.price = price
        this.imgPath = imgPath
    }
}
var bestSellingProducts = []
bestSellingProducts.push(
    new product('lucky_fish'
        , 'goto-lucky_fish'
        , 'Chuông thủy âm hình cá Mizu Bell'
        , 'MAY MẮN VÀ HẠNH PHÚC'
        , 16.96
        , '../asset/img/best-selling/bs1.webp'))
bestSellingProducts.push(
    new product('music_bell'
        , 'goto-music_bell'
        , 'Bùa hộ mệnh chuông nhạc, thủy âm dễ thương'
        , 'MAY MẮN VÀ HẠNH PHÚC'
        , 16.96
        , '../asset/img/best-selling/bs2.webp'))
bestSellingProducts.push(
    new product('lucky_mallet'
        , 'goto-lucky_mallet'
        , 'Cái vồ may mắn từ đền Narita với bùa cỡ nhỏ bên trong'
        , '7 VỊ THẦN'
        , 16.96
        , '../asset/img/best-selling/bs3.webp'))
bestSellingProducts.push(
    new product('lucky_coin'
        , 'goto-lucky_coin'
        , 'Đồng 5 yên may mắn và sức khỏe'
        , '5 YÊN & ĐỒNG TIỀN MAY MẮN'
        , 4.96
        , '../asset/img/best-selling/bs4.webp'))

function productLoader(productList) {
    let section = document.querySelector('.section.best-selling')
        , newRow = document.createElement('div')
    newRow.classList.add('row')

    for (product of productList) {
        newRow.innerHTML += `<div class="row-item">
        <img src="${product.imgPath}" class="${product.className}" onclick="changePage('${product.alias}')" alt="">
        <div class="brief">
            <div class="type">
                <p>${product.type}</p>
            </div>
            <div class="name" class="${product.className}" onclick="changePage('${product.alias}');prepareProductPage()">
                <p>${product.name}</p>
            </div>
            <div class="price">
                <p>${product.price}$</p>
            </div>
            
        </div>
    </div>`
}
//     `<div class="cart">
//     <a>THÊM VÀO GIỎ</a>
    
// </div>`
    section.appendChild(newRow)
}

//ONCE - Home page loader
fetch('sub-pages/home-main.html')
    .then(res => res.text())
    .then(content => {
        setMain(content)
        productLoader(bestSellingProducts)
        bannerLoader()
    })

//home
setNavigate("goto-home", "home")

//contact
setNavigate("goto-contact", "contact")

//===OVERLAY===
function overlayLoader(path) {
    fetch(path)
        .then(res => res.text())
        .then(data => {
            document.querySelector('.overlay').innerHTML = data
        })

    displayOverlay()
}
function hideOverlay() {
    document.querySelector('.overlay').classList.add('hidden')
}
function displayOverlay() {
    document.querySelector('.overlay').classList.remove('hidden')
}
