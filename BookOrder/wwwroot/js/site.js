const baseUrl = 'api/BookOrder';
//let order = { orderItems: [ { id: 1, title: "French For Beginners", price: 25000, quantity: 1 },  { id: 2, title: "French For Intermediate", price: 30000, quantity: 5 },  { id: 3, title: "French For Advanced", price: 40000, quantity: 1 },    ], orderTotal: 0,  };
let order = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNo:"",
    deliveryLocation:"",
    orderItems: [],
    orderTotal: 0,
    comments:""
};

function getItems() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(data => displayItems(data))
        .catch(error => console.error('Unable to get books.', error));

    document.getElementById('form').addEventListener('submit',submit)
}

// Book Order functions

  
function getBook(e) {
    e.preventDefault();
    let id = e.target.id
    let url = baseUrl + `/${id}`;
    //call the api to populate the book object
    fetch(url)
        .then(response => response.json())
        .then(data => (addToCart(data)))
        .catch(error => console.error('Unable to get book.', error));


}

function addToCart(data) {

    let bookToAdd = {};
    bookToAdd.bookId = data.id;
    bookToAdd.title = data.title
    bookToAdd.level = data.level
    bookToAdd.price = data.price
    bookToAdd.quantity = 1
    bookToAdd.amount = data.price * bookToAdd.quantity
    //console.log(bookToAdd)

    //empty cart so add the book
    if (order.orderItems.length == 0) {
        order.orderItems.push(bookToAdd)
    }
    //some items in the cart
    else {
        //is this book already in the cart?
        let book = order.orderItems.filter(book => book.bookId == bookToAdd.bookId);

        //yes so increment the quantity
        if (book.length > 0) {
            order.orderItems.forEach(function (value) {
                if (value.bookId == book[0].bookId) {
                    value.quantity += 1;
                    value.amount = value.price * value.quantity;
                }
            })
        }
        //No so add it as a new item
        else {
            order.orderItems.push(bookToAdd);
        }
    }
    
    order.orderTotal = calculateOrderTotal();
    updateOrderUI();
    return false;
}


function calculateOrderTotal() {
    let sum = 0
    if (order.orderItems.length > 0) {

        let subTotal = order.orderItems.map(book => book.price * book.quantity)
        subTotal.forEach(function (value) {
            sum = sum + value
        })
    }
    return sum;
}

function updateOrderUI() {

    const p = document.getElementById('message');
    //const cartBody = document.getElementById('cart-body');
    const cart = document.getElementById('cart');
    const cartTable = document.getElementById('cart-table');

    //Show or hide cart table and will appear here message
    if (order.orderItems.length == 0) {
        cart.style.display = 'none';
        
        p.style.display = 'block';
        return;
    }
    else {
        p.style.display = 'none';
       
        cart.style.display = 'block';
    }

    cartTable.innerHTML = '<tr><th>Title</th><th>Price<th>Qty</th><th>Amount</th><th></th></tr>'
    order.orderItems.forEach(function (book) {
        let row = cartTable.insertRow();
        row.innerHTML = `<td>${book.title}</td>`
        row.innerHTML += `<td>${book.price}</td>`
        row.innerHTML += `<td>${book.quantity}</td>`
        row.innerHTML += `<td>${book.amount}</td>`
        row.innerHTML += `<td><a href="" onclick="return add(${book.bookId})">Add</a></td>`
        row.innerHTML += `<td><a href="" onclick="return reduce(${book.bookId})">Reduce</a></td>`
        row.innerHTML += `<td><a href="" onclick="return removeBook(${book.bookId})">Remove</a></td>`
    });

   
    document.getElementById('order-total').innerHTML = `<p>Your order total is <span class="total">Ush ${order.orderTotal}</span></p>`;
}

function removeBook(id) {
    order.orderItems = order.orderItems.filter(book => book.bookId != id)
    order.orderTotal = calculateOrderTotal();
    updateOrderUI();
    return false;
}

function add(id) {
    let bookId = Number(id)
    order.orderItems.forEach(function (book) {
        if (book.bookId == bookId) {
            book.quantity += 1;
            book.amount = book.price * book.quantity
        }
    })
    order.orderTotal = calculateOrderTotal();
    updateOrderUI();
    return false;
}

function reduce(id) {
    
    let bookId = Number(id)
    
    order.orderItems.forEach(function (book) {
        if (book.bookId == bookId) {
            book.quantity -= 1;
            if (book.quantity < 1) {
                book.quantity = 1;
            }

            book.amount = book.price * book.quantity
        }
    });
    order.orderTotal = calculateOrderTotal();
    updateOrderUI();
    return false;
}



function submit() {
    //todo: Post to api
    event.preventDefault();
    
    let url = baseUrl;
    order.firstName = document.getElementById('firstName').value
    order.lastName = document.getElementById('lastName').value
    order.email = document.getElementById('email').value
    order.deliveryLocation = document.getElementById('deliveryAddress').value
    order.comments = document.getElementById('comments').value
    
  
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        cache:"no-cache",
        body: JSON.stringify(order)
    })
        .then(response => response.json())
        .then((data) => reset(data))
        .catch(error => console.error('Unable to post order.', error));
}
  
function displayItems(data) {
   
    const cartBody = document.getElementById('books');
    cartBody.innerHTML = '';

    data.forEach(item => {
        let tr = cartBody.insertRow()

        let td1 = tr.insertCell(0);

        let textNode = document.createTextNode(item.title);
        td1.appendChild(textNode)

        textNode = document.createTextNode(item.level);
        let td2 = tr.insertCell(1);
        td2.appendChild(textNode)

        textNode = document.createTextNode(item.price);
        let td3 = tr.insertCell(2);
        td3.appendChild(textNode)

       

        let link = document.createElement('a');
        link.href = `${item.id}`;
        link.addEventListener('click', getBook);
        link.setAttribute('id', item.id)
        link.innerHTML = 'Add To Cart';
        
        let td4 = tr.insertCell(2);
        td4.appendChild(link)
    })
   }

function checkout() {
    
    document.getElementById('line-items').style.display = 'none';
    document.getElementById('order-information').style.display = 'block';
    document.getElementById('cart-footer').style.display = 'none';

    document.getElementById('cart').style.float = 'left';
    return false;
}

function clearCart() {
    order.orderItems = [];
    updateOrderUI();
    return false;
}

function reset(data) {
    
    alert(data);
    location.reload();

}



    













