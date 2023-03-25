//images slider
var items = document.getElementsByClassName("img-option-item"),
image = document.querySelector(".img>img"),
inUseNode=items[0]

for(i=0; i<items.length; i++){
    items[i].addEventListener("click",(e)=>{
        image.src=e.target.src
        e.target.parentNode.classList.add("img-option-displaying")
        inUseNode.classList.remove("img-option-displaying")
        inUseNode=e.target.parentNode
    })
    console.log('haha')
}
//end images sliders
