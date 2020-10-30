// sending a request to get our product.json file that contains our product details.
let requestURL = "assets/js/products.json";
let request = new XMLHttpRequest(); // the XMLHttpRequest helps us to make network request to recieve data from the server,in this case help us to retrieve products.json
request.open("GET", requestURL);
request.responseType = "json";
request.send();

// Caching our DOM Elements.
const addToCartButton = document.querySelectorAll(".btn-to-cart");
const purchase = document.querySelector(".btn-purchase");
const quantityElement = document.querySelector(".cart-quantity-input");
// const headerName =document.querySelector('.branding-name');
// headerName.innerHTML="piss"
console.log(addToCartButton);

// All our functions are going to called when the request has load on our DOM.
request.onload = function () {
  const projectData = request.response;
  console.log(projectData);
  let groupPeople = projectData.groupMembers;

  for (let i = 0; i < groupPeople.length; i++) {
    console.log(
      `welcome to the group ${groupPeople[i]} this is our ${projectData.projectName} project`
    );
  }
  update(projectData);
  let groupProducts = projectData.products;
  // console.log(Number(groupProducts[0].price) + Number(groupProducts[1].price));
  addToCart();
};

// function to add products to cart.
function addToCart() {
  // groupProducts =jsonObj.products;
  for (let i = 0; i < addToCartButton.length; i++) {
    let button = addToCartButton[i];
    button.addEventListener("click", addToCartClicked);
  }
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let imageSource = shopItem.querySelector(".card-img-top").src;
  let title = shopItem.querySelector(".card-title").innerHTML;
  let price = shopItem.querySelector(".card-price").innerHTML;
  // let productName=groupProducts.name;
  addItemToCart(title, price, imageSource);
}

function addItemToCart(title, price, imageSrc) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.querySelector(".cart-items");
  var cartItemNames = cartItems.querySelectorAll("cart-item-title");
  for (let i = 0; i < cartItemNames; i++) {
    if (cartItemNames[i].innerHTML == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  let cartRowContents = `
            <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span> 
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
}

//function to update the total amount.
function update(jsonObj) {
  groupProducts = jsonObj.products;
  let total = 0;
  for (let i = 0; i < addToCartButton.length; i++) {
    addToCartButton[i].addEventListener("click", function () {
      total += Number(groupProducts[i].price);
      console.log(total);
    });
  }
}

// function to remove products from our cart.
const removeCartButton = document.querySelectorAll(".btn-danger");
for (let i = 0; i < removeCartButton.length; i++) {
  let button = removeCartButton[i];
  button.addEventListener("click", function () {
    let buttonClicked=event.target;
    buttonClicked.parentElement.remove();
    // console.log("Please can you remove yourself from this protocol");
  });
}

// This functions is to give an information when we are done doing all our buying.
function purchaseProducts() {}
