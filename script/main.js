
var styleSheet = document.getElementsByTagName("link")[1],
main = document.querySelector("main")

function changePage(path) {

    fetch(path)
        .then(res => res.text())
        .then(text=>{
            main.innerHTML = text
        })
}
//once
changePage("sub-pages/home-main.html")

//home
document.getElementById("goto-home").addEventListener('click',()=>{
    styleSheet.href="asset/stylesheet/home.css"
    changePage("sub-pages/home-main.html")
})

//contact
document.getElementById("goto-contact").addEventListener('click',()=>{
    styleSheet.href="asset/stylesheet/contact.css"
    changePage("sub-pages/contact-main.html")
})