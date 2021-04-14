"use strict";

class ProductsList {
    allProducts = [];
    goods = [];
    constructor(container = '.products') {
        this.container = container;
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'notebook', price: 2000},
            {id: 2, title: 'mouse', price: 20},
            {id: 3, title: 'keyboard', price: 200},
            {id: 4, title: 'gamepad', price: 50},
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        this.goods.forEach(item => {
                const product = new ProductsItem(item);
                this.allProducts.push(product.renderProductsItem());
                });
        block.insertAdjacentHTML("beforeend", this.allProducts.join(""));
        this.showSumProducts();
    }

    getTotalSumProducts() {
        let sumProduct = 0;
        this.goods.forEach(item => {
            sumProduct += item.price;
        })
        return sumProduct;
    }

    showSumProducts() {
        let sumProduct = this.getTotalSumProducts();
        const block = document.querySelector(this.container);
        block.insertAdjacentHTML("afterend", `<span class="sum-products">Сумма товаров = ${sumProduct} $</span>`)
    }
}

class ProductsItem {
    constructor(item, img = 'https://placehold.it/200x150', title = 'products-item-title',
                price = 'products-item-price') {
        this.id = item.id;
        this.title = item.title;
        this.price = item.price;
        this.img = img;
        this.titleClass = title;
        this.priceClass = price;
    }

    renderProductsItem() {
        return `<div class="products-item"><img src="${this.img}" width="200" height="150">
                <span class="${this.titleClass}">${this.title}</span><span class="${this.priceClass}">${this.price} &dollar;</span>
                <button>купить</button></div>`;
    }
}

// class Cart {
//
//     getSumGoodsCart(){}         для получения суммы всех товаров в корзине
//     getDiscountGoodsCart(){}    для вычисления скидки, в зависимости от суммы товаров
//
// }
//
// class CartItem {
//
//     addCartItem(){}             добавить товар в корзину
//     removeCartItem(){}          удалить товар из корзины
//
// }
const list = new ProductsList();
list.render();