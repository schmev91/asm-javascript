var styleSheet = document.getElementsByTagName("link")[1],
    main = document.querySelector("main"),
    mainPages = ['home', 'shop', 'blog', 'policy', 'contact', 'fact', 'aboutus']

function setMain(html) {
    main.innerHTML = html
}
function setStyle(path) {
    styleSheet.href = path
}
function changePage(alias) {
    window.scrollTo(0, 0);
    let isHome = alias == 'home'
        , isProduct = !mainPages.includes(alias)
        , path = `sub-pages/${alias}-main.html`

    if (isProduct) path = `sub-pages/products/${alias}-main.html`

    //html
    fetch(path)
        .then(res => res.text())
        .then(content => {
            setMain(content)
            if (isHome) {
                productLoader(bestSellingProducts)
                bannerLoader()
                flashSaleLoadder()
            }
            return
        })
        .then(() => {
            if (isProduct) productScript()
        })
    //css
    setStyle(`asset/stylesheet/${isProduct ? "product" : alias}.css`)

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
        .then(data => {
            changeBanner(data, bannerIndex)
        })

}
function changeBanner(content, backgroundIndex) {
    let bannerNode = document.getElementsByClassName('banner')[0]
    bannerNode.innerHTML = content
    bannerNode.style.backgroundImage = `url(./asset/img/banner/${backgroundIndex}.png)`

}
function bannerLoader() {
    fetch(`./script/asset/banner/${bannerIndex}.html`)
        .then(res => res.text())
        .then(data => {
            changeBanner(data, bannerIndex)
            document.getElementsByClassName('banner-leftButton')[0]
                .addEventListener('click', function () { bannerHandler(-1) })
            document.getElementsByClassName('banner-rightButton')[0]
                .addEventListener('click', function () { bannerHandler(1) })
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
async function productDataGetter() {
    await fetch('script/asset/productData.txt')
        .then(res => res.text())
        .then(productData => {
            let rawData = productData.split(/\r\n/)
            bestSellingProducts = rawData.map(dataChunk => {
                return new product(...dataChunk.split('|'))
            })

        })
}

function productLoader() {
    let section = document.querySelector('.section.best-selling')
        , rowAmount = bestSellingProducts.length / 4
        , productIndex = 0
        , ITEM_AMOUNT = 4

    for (let index = 1; index <= rowAmount; ++index) {
        let newRow = document.createElement('div')

        newRow.classList.add('row')

        for (let itemIndex = 0; itemIndex < ITEM_AMOUNT; ++itemIndex) {
            newRow.innerHTML += `<div class="row-item">
        <img src="${bestSellingProducts[productIndex].imgPath}" class="${bestSellingProducts[productIndex].className}" onclick="changePage('${bestSellingProducts[productIndex].alias}')" alt="">
        <div class="brief">
            <div class="type">
                <p>${bestSellingProducts[productIndex].type}</p>
            </div>
            <div class="name" class="${bestSellingProducts[productIndex].className}" onclick="changePage('${bestSellingProducts[productIndex].alias}');prepareProductPage()">
                <p>${bestSellingProducts[productIndex].name}</p>
            </div>
            <div class="price">
                <p>${bestSellingProducts[productIndex].price}$</p>
            </div>
            
        </div>
    </div>`
            ++productIndex
        }
        section.appendChild(newRow)
    }



}



var THREE_HOURS = new Date('1970-01-01T' + '03:00')
    , MARKED_TIME = new Date()
    , timeAlias = ['Hours', 'Minutes', 'Seconds']
    , isCountingDown = false
function flashSaleLoadder() {
    let briefCollection = document.getElementsByClassName('brief')

    for (brief of briefCollection) {
        let countDownContainer = document.createElement('div')

        countDownContainer.innerText = 'FLASHSALE '

        countDownContainer.classList.add('countdown-container')
        timeAlias.forEach((alias, index) => {
            let newSpan = document.createElement('span')
            newSpan.classList.add(`countdown-${alias}`)
            countDownContainer.appendChild(newSpan)
            if (index != 2) countDownContainer.innerHTML += ':'
        })
        brief.appendChild(countDownContainer)
    }
    if (!isCountingDown) {
        setInterval(flashSaleHandler, 1000)
        isCountingDown = true
    }

}
function flashSaleHandler() {
    let isHomePage = Boolean(document.getElementsByClassName('countdown-container'))
    if (isHomePage) {
        let countdownCollection = document.getElementsByClassName('countdown-container')
            , differ = new Date().getTime() - MARKED_TIME.getTime()
            , COUNTDOWN = new Date(THREE_HOURS.getTime() - differ)

        for (let countdown of countdownCollection) {
            timeAlias.forEach(alias => {
                countdown.querySelector(`.countdown-${alias}`).innerText
                    = COUNTDOWN[`get${alias}`]()
            })
        }

    }

}

//ONCE - Home page loader
fetch('sub-pages/home-main.html')
    .then(res => res.text())
    .then(async (content) => {
        setMain(content)
        await productDataGetter()
        productLoader(bestSellingProducts)
        bannerLoader()
        flashSaleLoadder()
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
            let overlaySection = document.querySelector('.overlay')
            overlaySection.innerHTML = data

            const stopDefault = (e) => { e.preventDefault() }
            overlaySection.querySelector('form')
                .addEventListener('submit', stopDefault)

        })

    displayOverlay()
}
function hideOverlay() {
    document.querySelector('.overlay').classList.add('hidden')
}
function displayOverlay() {
    document.querySelector('.overlay').classList.remove('hidden')
}

//FORM-SUBMIT
function formValidate(target) {
    let inputCollection = target.querySelectorAll('input:not([type="submit"])')
        , isValid = true
    for (let input of inputCollection) {
        if (!input.value) {
            input.style.setProperty('border', '2px solid crimson')
            isValid = false
        } else {
            input.style.setProperty('border', '1px groove #ccc')
        }
    }

    if (!isValid) {
        inputCollection[0].focus()
        alert('Bạn chưa nhập đủ thông tin cần thiết!')
    }

    //CONFIRM PASSWORD
    if (inputCollection.length > 2 && isValid) {
        let password = inputCollection[1]
            , confirmPassword = inputCollection[2]

        if (password.value != confirmPassword.value) {
            isValid = false
            confirmPassword.focus()
            confirmPassword.style.setProperty('border', '2px solid crimson')
            alert('Mật khẩu xác nhận không khớp với mật khẩu đã nhập!')
        }

    }

    if(isValid) alert('Chúc mừng bạn đã nhập thành công!')
    return isValid
}