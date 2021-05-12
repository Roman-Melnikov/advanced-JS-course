"use strict";

let productItemLayot = products.map(item => renderProductItem(item));
let productItemSelectors = document.querySelectorAll(".products-item");

for (let item in productItemLayot) {
    productItemSelectors[item].insertAdjacentHTML("afterbegin", productItemLayot[item]);
}

/**
 * выполняет вёрстку карточки товара
 * @param obj карточка товара
 * @returns {string}
 */
function renderProductItem (obj) {
    return    `<div class="products-item-wrp-blackout">
                    <img class="products-item-photo" src="${obj.img}" alt="catalog-product-1" height="420" width="360">
               </div>
               <span class="products-item-title">${obj.title}</span>
               <p class="products-item-txt">${obj.txt}</p>
               <span class="products-item-price">${obj.price}</span>`;
}
