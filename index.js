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
            <h3>${name}</h3>
            <p class="item-price">${price}</p>
            <p class="item-quantity">1</p>
            <button class="remove-item">Remove</button>
        </div>`
        cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('remove-item')[0].addEventListener('click',
    removeItem)
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
        let quantity = quantityElement.innerText
        total = total + (price * quantity)
    }
    document.getElementsByClassName('final-price')[0].innerText = '$' + total.toFixed(2)
}
