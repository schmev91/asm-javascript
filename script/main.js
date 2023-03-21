
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
    let isProduct = !mainPages.includes(path)
    //html
    fetch(`sub-pages/${path}-main.html`)
        .then(res => res.text())
        .then(text => {
            setMain(text)
        })
    //css
    setStyle(`asset/stylesheet/${isProduct ? "product" : path}.css`)
    if(isProduct) setTimeout(()=>productScript(),1000)
}

function setNavigate(className, path) {
    nodes = document.getElementsByClassName(className)
    for (node of nodes) {
        node.addEventListener('click', () => {
            changePage(path)
        })
    }
}
function productScript() {
    console.log("i ran")
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

// once
fetch('sub-pages/home-main.html')
    .then(res => res.text())
    .then(setMain)
// //cart
// fetch('sub-pages/cart-main.html')
//     .then(res=>res.text())
//     .then(res=>document.querySelector('body').innerHTML+=res)

//home
setNavigate("goto-home", "home")

//contact
setNavigate("goto-contact", "contact")

