const uri = 'api/BookOrder';
let books = [];


function getItems() {
    fetch(uri)
        .then(response => response.json())
        //.then(data => _displayItems(data))
        .then(data => displayItems(data))
        .catch(error => console.error('Unable to get books.', error));

    document.getElementById('form').addEventListener('submit',submit)
}

function submit(e) {
    e.preventDefault();
    alert('form submitted')
}
function displayItems(data) {
   
    const tBody = document.getElementById('books');
    tBody.innerHTML = '';

    data.forEach(item => {
        let tr = tBody.insertRow()

        let td1 = tr.insertCell(0);

        let textNode = document.createTextNode(item.title);
        td1.appendChild(textNode)

        textNode = document.createTextNode(item.price);
        let td2 = tr.insertCell(1);
        td2.appendChild(textNode)

        let link = document.createElement('a');
        link.href = `${item.id}`;
        link.addEventListener('click', addToCart);
        link.setAttribute('id', item.id)
        link.innerHTML = 'Add To Cart';
        
        let td3 = tr.insertCell(2);
        td3.appendChild(link)
    })
   }

function addToCart(e) {
    e.preventDefault();
    let bookId = Number(e.target.id)
    let bookTitles = ["French For Kids", "Programming For teens"];
    let bookPrices = [25000, 20000];

    //todo: query api to get book information
    let bookAdded = {
        id: bookId,
        title:bookTitles[0],
        price: bookPrices[0]
    }
    //Hide the paragraph
    const p = document.getElementById('message');
    p.setAttribute('style', 'display:none;');

    //Show table header
    const cartTable = document.getElementById('cart-heading');
    cartTable.setAttribute('style', 'display:block;');

    

    //does this book exist in our order?
    let isBookInOrder = books.some(book => book.id === bookId)
    if (isBookInOrder) {
        //book exists in the order so increase the qty
        books.forEach(function (value) {
            if (value.id == bookId) {
                value.qty += 1;

                //update the UI
                document.getElementById(`qty-cell-row-${bookId}`).innerText = value.qty;
                calculateAmount(bookId)
                orderTotal = calculateOrderTotal()
                
            }
        })
    }
    else {
        //Add the book to the books array
        books.push({
            id: bookId,
            qty: 1,
            price:bookAdded.price
        });

        //Add it to the UI
        const tBody = document.getElementById('cart-body');
        const tr = tBody.insertRow()
        tr.setAttribute('id', `row-${bookId}`)

        //title
        const td1 = tr.insertCell(0);
        //let textNode = document.createTextNode(`${bookAdded.title}`);
        td1.innerText= bookAdded.title
       
        //price
        const td2 = tr.insertCell(1);
        td2.setAttribute('id', `price-cell-row-${bookId}`)
        
        td2.innerText = bookAdded.price
        
        //quantity
        const td3 = tr.insertCell(2);
        td3.setAttribute('id', `qty-cell-row-${bookId}`)
        let qty = 1
        td3.innerText = qty;

        //Amount
        const td10 = tr.insertCell(3);
        td10.setAttribute('id', `amount-cell-row-${bookId}`)
        td10.innerText = Number(bookAdded.price) * Number(qty);
        
        //actions

        //add
        const link1 = document.createElement('a');
        link1.href = "#";
        link1.addEventListener('click', addQuantity);
        link1.setAttribute('id', bookId);
        link1.innerHTML = 'Add';
        const td5 = tr.insertCell(4);
        td5.appendChild(link1)

        //subtract
        const link2 = document.createElement('a');
        link2.href = "#";
        link2.addEventListener('click', reduceQuantity);
        link2.setAttribute('id', bookId);
        link2.innerHTML = 'Subtract';
        const td6 = tr.insertCell(5);
        td6.appendChild(link2)

        //remove
        const link3 = document.createElement('a');
        link3.href = "#";
        link3.addEventListener('click', removeItem);
        link3.setAttribute('id', bookId);
        link3.innerHTML = 'Remove';
        const td7 = tr.insertCell(6);
        td7.appendChild(link3)
        
        let resetLink = document.getElementById('reset')
        resetLink.setAttribute('style', 'display:block;')
        resetLink.addEventListener('click', reset)

        let checkoutLink = document.getElementById('checkout')
        checkoutLink.setAttribute('style', 'display:block;')
        checkoutLink.addEventListener('click', checkout)

        //Show the order total paragraph
        let orderTotal = calculateOrderTotal();
        
        
    }

} 

function calculateOrderTotal() {
    let orderItems = books.map(book => book.price * book.qty)
    let sum = 0
    orderItems.forEach(function(value){  
      sum = sum + value
    })
    document.getElementById('order-total').innerText = `Your order total is ${sum}`;
}
function calculateAmount(bookId) {

    let price = Number((document.getElementById(`price-cell-row-${bookId}`)).innerText)
    let qty = document.getElementById(`qty-cell-row-${bookId}`).innerText
    console.log(price)
    console.log(qty)

    let amount = document.getElementById(`amount-cell-row-${bookId}`)
    amount.innerText = Number(qty) * Number(price)
    
}

function checkout(e) {
    e.preventDefault()
    document.getElementById('line-items').setAttribute('style','display:none')
    document.getElementById('order-information').setAttribute('style', 'display:block')
    document.getElementById('checkout').setAttribute('style', 'display:none')
    document.getElementById('reset').setAttribute('style', 'display:none')
}

function reset(e) {
    e.preventDefault()

    //update UI
    books.forEach(function (value) {

        //update the UI
        document.getElementById(`row-${value.id}`).remove()

    })

    //empty array
    books = [];

    
    //Show the paragraph
    const p = document.getElementById('message');
    p.setAttribute('style', 'display:block;');

    //Hide table header
    const cartTable = document.getElementById('cart-heading');
    cartTable.setAttribute('style', 'display:none;');

    //Hide reset and checkout links
    document.getElementById('reset').setAttribute('style', 'display:none;')
    document.getElementById('checkout').setAttribute('style', 'display:none;')
    document.getElementById('order-total').innerText = '';
}

function addQuantity(e) {
    e.preventDefault();
    let bookId = Number(e.target.id)

    books.forEach(function (value) {
        if (value.id == bookId) {

            value.qty += 1;
            document.getElementById(`qty-cell-row-${bookId}`).innerText = value.qty;
        }
    })    
    calculateOrderTotal();
}

function reduceQuantity(e) {
    e.preventDefault();

    let bookId = Number(e.target.id)

    books.forEach(function (value) {
        if (value.id == bookId) {
            if (value.qty > 1){

            value.qty -= 1;
            }
            document.getElementById(`qty-cell-row-${bookId}`).innerText = value.qty;
        }
    }) 
    calculateOrderTotal();
}

function removeItem(e) {
    e.preventDefault();
    let bookId = Number(e.target.id)

    //remove book from books array
    books.forEach(function (value) {
        if (value.id == bookId) {
            books = books.filter(book => book.id != value.id)
            //update the UI
            document.getElementById(`row-${bookId}`).remove()
        }
    })
    calculateOrderTotal();

    //we just removed the last item in the order so hide the cart
    if (books.length == 0) {
        //Show the paragraph
        const p = document.getElementById('message');
        p.setAttribute('style', 'display:block;');

        //Hide table header
        const cartTable = document.getElementById('cart-heading');
        cartTable.setAttribute('style', 'display:none;');

        //Hide the checkout , reset and order total
        document.getElementById('reset').setAttribute('style','display:none')
        document.getElementById('checkout').setAttribute('style', 'display:none')
        document.getElementById('order-total').innerText = ''
        
    }
   
}




