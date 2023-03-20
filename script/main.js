
var styleSheet = document.getElementsByTagName("link")[1],
main = document.querySelector("main")

function changePage(path) {

    fetch(path)
        .then(res => res.text())
        .then(text=>{
            main.innerHTML = text
        })
}
function setNavigate(id, name){
    let mainPages = ['home','shop','blog','policy','contact','fact','aboutus']
    document.getElementById(id).addEventListener('click',()=>{
        styleSheet.href=`asset/stylesheet/${mainPages.includes(name) ? name : "product"}.css`
        changePage(`sub-pages/${name}-main.html`)
    })
}

//once
changePage("sub-pages/home-main.html")

//home
setNavigate("goto-home","home")

//contact
setNavigate("goto-contact","contact")

//product-lucky_fish
setNavigate("goto-lucky_fish","lucky_fish")
