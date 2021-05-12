const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class ProductsBasket {
    constructor() {
        this.button = document.querySelector(".btn-cart");
        this.amount = null;
        this.countGoods = null;
        this.clickCount = 0;
        this.goods = [];
        this.clickBtnListener();
    }

    clickBtnListener() {
        this.button.addEventListener("click",() => {
            this.clickCount += 1;
            if (this.clickCount % 2 !== 0) {
                this.serverRequest()
                    .then(data => {
                        this.amount = data.amount;
                        this.countGoods = data.countGoods;
                        this.goods = [...data.contents];
                        this.render();
                    });
            }else{
                let block = document.querySelector(".header-basket");
                block.remove();
            }
        });
    }

    serverRequest() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(err => console.log(err))
    }

    getLayoutBasketItem(item) {
        return `<div id="${item.id_product}" class="header-basket-item">
                <span class="header-basket-item-title">${item.product_name}</span>
                <span class="header-basket-item-price">${item.price} &dollar;</span>
                <span class="header-basket-item-quantity">${item.quantity} шт.</span>
                </div>`
    }

    render() {
        let header = document.querySelector("header");
        let block = document.createElement("div");
        block.classList.add("header-basket");
        header.appendChild(block);
        this.goods.forEach(item => {
            const basketItem = this.getLayoutBasketItem(item);
            block.insertAdjacentHTML("beforeend", basketItem);
        });
        block.insertAdjacentHTML("beforeend", `<span class="header-basket-item-countGoods">Количество товаров в корзине: ${this.countGoods}</span>
                                                           <span class="header-basket-item-amount">Сумма товаров: ${this.amount} &dollar;</span>`);
    }
}

let list = new ProductsList();
const basket = new ProductsBasket();



