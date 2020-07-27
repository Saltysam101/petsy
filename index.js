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

let quantityInput = document.getElementsByClassName('item-quantity')
for (let i = 0; i < quantityInput.length; i++){
    let input = quantityInput[i]
    input.addEventListener('change', quantityChange)
}

document.getElementsByClassName('checkout')[0].addEventListener('click', 
purchaseComplete)

}

let purchaseComplete = () => {
    alert('Thank you for your purchase!')
    let cartItems = document.getElementsByClassName('cart')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}
    

let removeItem = (e) => {
    let btnClicked = e.target
    btnClicked.parentElement.remove()
    updateCartTotal()
}

let quantityChange = (e) => {
    let input = e.target
    if(isNaN(input.value) || input.value <=0){
        input.value = 1
    }
    updateCartTotal()
}


let addToCart = (e) => {
    let button = e.target
    let shopItem = button.parentElement
    let name = shopItem.getElementsByClassName('name')[0].innerText
    let price = shopItem.getElementsByClassName('price')[0].innerText
    let imgSrc = shopItem.getElementsByClassName('card-img')[0].src
    addItemToCart(name,price,imgSrc)
}

let addItemToCart = (name, price, imgSrc) => {
    let cartRow = document.createElement('div')
    let cartItems = document.getElementsByClassName('cart')[0]
    let items = document.getElementsByClassName('item')[0]
    let cartItemNames = cartItems.getElementsByClassName('name')
    for(let i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == name){
            alert('Item has already been added to the cart!')
            return
        }
    }

    let cartRowContent = 
    `<div class="item">
            <img class="cart-img" src="${imgSrc}" alt="">
            <h3 class="name">${name}</h3>
            <p class="item-price">${price}</p>
            <input type="number" class="item-quantity"/ value="1">
            <button class="remove-item">Remove</button>
        </div>`
        cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('remove-item')[0].addEventListener('click',
    removeItem)
    cartRow.getElementsByClassName('item-quantity')[0].addEventListener('change', quantityChange)
    updateCartTotal()
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
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('final-price')[0].innerText = '$' + total.toFixed(2)
}
