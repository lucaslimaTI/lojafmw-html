
let carts = document.querySelectorAll('.add-carrinho');

let products = [
    {
        name: "Camisa manga curta",
        tag: "tshirt 01-png",
        price: 250,
        inCart: 0
    },
    {
        name: "Camisa Cavada",
        tag: "cavada",
        price: 170,
        inCart: 0
    },
    {
        name: "Camisa manga longa",
        tag: "camisa 03-png",
        price: 350,
        inCart: 0
    },
    {
        name: "Calça social",
        tag: "calca 01-png",
        price: 210,
        inCart: 0
    },
    {
        name: "Calça Esportiva",
        tag: "calca 02-png",
        price: 205,
        inCart: 0,
        qtd_total:0
    },
    {
        name: "Sapato salto alto grosso",
        tag: "sapato 01-png",
        price: 190,
        inCart: 0
    },
    {
        name: "Tênis Unissex",
        tag: "tenis 01-png",
        price: 180,
        inCart: 0
    },
    {
        name: "Sapa tenis",
        tag: "sapatenis 01-png",
        price: 160,
        inCart: 0
    }
];


for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.nav-list span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1 );
        document.querySelector('.nav-list span').textContent = productNumbers + 1;
    } 
    else {
        localStorage.setItem('cartNumbers', 1 );
        document.querySelector('.nav-list span').textContent = 1;
    }

    setItems(product);

}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);


    if(cartItems != null)
    {
       if(cartItems[product.tag] == undefined)
       {
            cartItems  = {
            
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1; 
    } 
    else 
    {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
}
function totalCost(product) {

    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );

    if(cartCost != null)
    {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + 
        product.price);
    }
    else
    {
        localStorage.setItem("totalCost", product.price);
    }
}
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if(cartItems && productContainer)
    {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="checkmark"></ion-icon>
                <img src="${item.tag}.png" class="tamanho-image">
                <span>${item.name + item.name}</span>
                <div class="price">$${item.price},00</div>
                <div class="quantity">
                <span>${item.inCart}</span>
                </div>
                <div class="total">
                $${item.inCart * item.price},00
                </div>
                <div class="none-input">
                    <input type="text"  value="${item.inCart}" name="qtd_prod">
                    <input type="text"  value="${item.name} + " name="desc_prod">
                </div>
            </div>
            
            `;
        });
        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                $${cartCost},00
                </h4>
            </div>
            <input type="text" class="none-input" value="${cartCost},00" name="valor_prod">
           
            `;
    }
}

onLoadCartNumbers();
displayCart();