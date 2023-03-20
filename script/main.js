
var styleSheet = document.getElementsByTagName("link")[1],
    main = document.querySelector("main"),
    mainPages = ['home','shop','blog','policy','contact','fact','aboutus']

function setMain(html){
    main.innerHTML=html
}
function setStyle(path){
    styleSheet.href = path
}
function changePage(path) {
    window.scrollTo(0, 0);
    //html
    fetch(`sub-pages/${path}-main.html`)
        .then(res => res.text())
        .then(text=>{
            setMain(text)
        })
    //css
    setStyle(`asset/stylesheet/${mainPages.includes(path) ? path : "product"}.css`)
}

function setNavigate(className, path){
    nodes = document.getElementsByClassName(className)
    for(node of nodes){
        node.addEventListener('click',()=>{
            changePage(path)
        })
    }
}

//once
fetch('sub-pages/home-main.html')
.then(res=>res.text())
.then(setMain)

//home
setNavigate("goto-home","home")

//contact
setNavigate("goto-contact","contact")

