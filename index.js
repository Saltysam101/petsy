if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
    updateCartTotal()
}

function ready () {
let removeBtn = document.getElementsByClassName('remove-item');
for( let i = 0; i < removeBtn.length; i++){
    let button = removeBtn[i]
    button.addEventListener('click', removeItem)
}

let addToCartButtons = document.getElementsByClassName('add')
for(let i = 0; i < addToCartButtons.length; i++){
    let button = addToCartButtons[i]
    button.addEventListener('click', addToCart)
}
}
    

let removeItem = (e) => {
    let btnClicked = e.target
    btnClicked.parentElement.remove()
    updateCartTotal()
}


let addToCart = (e) => {
    console.log('hello')
    let button = e.target
    let shopItem = button.parentElement
    let name = shopItem.getElementById('name')[0].innerText
    console.log(name)
}



let updateCartTotal = () => {
    let cartContainer = document.getElementsByClassName('cart')[0]
    let cartRows = cartContainer.getElementsByClassName('item')
    let total = 0
    for( let i = 0; i < cartRows.length; i++){
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('item-price')[0]
        let quantityElement = cartRow.getElementsByClassName('item-quantity')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = quantityElement.innerText
        total = total + (price * quantity)
    }
    document.getElementsByClassName('final-price')[0].innerText = '$' + total.toFixed(2)
}
