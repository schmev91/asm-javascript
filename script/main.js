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

function quantityEditor({value, step}){
    let quantityNode = document.querySelector('.product-quantity'),
    quantityValue = Number(quantityNode.value)
    if(value=='-' && quantityValue==1) return
    
    quantityValue += value=='+' ? Number(step) : -Number(step)
    quantityNode.value=quantityValue

}


//Blur best-selling image on hover
setTimeout(() => {
    let productImages = document.querySelectorAll('.best-selling .row-item')
    for(productImage of productImages){
        productImage.addEventListener('mouseover',(e)=>{
            e.target.parentNode.classList.add('row-item-blur')
        })
        productImage.addEventListener('mouseout',(e)=>{
            e.target.parentNode.classList.remove('row-item-blur')
        })
    }
}, 1000);

//ONCE - Home page loader
fetch('sub-pages/home-main.html')
    .then(res => res.text())
    .then(setMain)

//home
setNavigate("goto-home", "home")

//contact
setNavigate("goto-contact", "contact")

//===OVERLAY===
function overlayLoader(path){
    fetch(path)
    .then(res=>res.text())
    .then(data=>{
        document.querySelector('.overlay').innerHTML = data 
    })

    displayOverlay()
}
function hideOverlay(){
    document.querySelector('.overlay').classList.add('hidden')
}
function displayOverlay(){
    document.querySelector('.overlay').classList.remove('hidden')
}

