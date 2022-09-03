const uri = 'api/BookOrder';
let books = [];


function getItems() {
    fetch(uri)
        .then(response => response.json())
        //.then(data => _displayItems(data))
        .then(data => displayItems(data))
        .catch(error => console.error('Unable to get books.', error));

    
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
    
    //Hide the paragraph
    const p = document.getElementById('message');
    p.setAttribute('style', 'display:none;');

    //Show table header
    const cartTable = document.getElementById('cart-heading');
    cartTable.setAttribute('style', 'display:block;');

    //does this book exist in our order?
    let bookId = Number(e.target.id)

    let isBookInOrder = books.some(book => book.id === bookId)

    if (isBookInOrder) {
        //book exists in the order so increase the qty
        books.forEach(function (value) {
            if (value.id == bookId) {
                value.qty += 1;

                //update the UI
                document.getElementById(`qty-cell-row-${bookId}`).innerText = value.qty;
            }
        })        
    }
    else {
        //Add the book to the books array
        books.push({
            id: bookId,
            qty: 1
        });

        //Add it to the UI
        const tBody = document.getElementById('cart-body');
        const tr = tBody.insertRow()
        tr.setAttribute('id', `row-${bookId}`)

        //title
        const td1 = tr.insertCell(0);
        let textNode = document.createTextNode(`${bookId}`);
        td1.appendChild(textNode)

        //description
        const td2 = tr.insertCell(1);
        textNode = document.createTextNode('description');
        td2.appendChild(textNode)

        //quantity
        const td3 = tr.insertCell(2);
        td3.setAttribute('id', `qty-cell-row-${bookId}`)
        td3.innerText = 1;

        //actions

        //add
        const link1 = document.createElement('a');
        link1.href = "#";
        link1.addEventListener('click', addQuantity);
        link1.setAttribute('id', bookId);
        link1.innerHTML = 'Add';
        const td4 = tr.insertCell(3);
        td4.appendChild(link1)

        //subtract
        const link2 = document.createElement('a');
        link2.href = "#";
        link2.addEventListener('click', reduceQuantity);
        link2.setAttribute('id', bookId);
        link2.innerHTML = 'Subtract';
        const td5 = tr.insertCell(4);
        td5.appendChild(link2)

        //remove
        const link3 = document.createElement('a');
        link3.href = "#";
        link3.addEventListener('click', removeItem);
        link3.setAttribute('id', bookId);
        link3.innerHTML = 'Remove';
        const td6 = tr.insertCell(4);
        td6.appendChild(link3)

         //reset and checkout buttons 
        if (books.length == 1) {
            const link4 = document.createElement('a');
            link4.href = "#";
            link4.addEventListener('click', checkout);
            link4.setAttribute('id', bookId);
            link4.innerText = 'Checkout';

            const link5 = document.createElement('a');
            link5.href = "#";
            link5.addEventListener('click', reset);
            link5.setAttribute('id', bookId);
            link5.innerText = 'Reset';

         document.getElementById('reset').appendChild(link4)
            document.getElementById('checkout').appendChild(link5)
        }
        
    }

} 
function checkout(e) {
    e.preventDefault()
    alert('An email with your order has been sent')
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

}

function removeItem(e) {
    e.preventDefault();
    let bookId = Number(e.target.id)

    //remove book from books array
    books.forEach(function (value) {
        if (value.id == bookId) {
            books = books.filter(book => book.id != value.id)
            console.log(books)
            //update the UI
            document.getElementById(`row-${bookId}`).remove()
        }
    })

    //we just removed the last item in the order so hide the cart
    if (books.length == 0) {
        //Show the paragraph
        const p = document.getElementById('message');
        p.setAttribute('style', 'display:block;');

        //Hide table header
        const cartTable = document.getElementById('cart-heading');
        cartTable.setAttribute('style', 'display:none;');
    }

}




