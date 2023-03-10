// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// const saveCartItems = require("./helpers/saveCartItems");

// const getSavedCartItems = require('./helpers/getSavedCartItems');
// const saveCartItems = require('./helpers/saveCartItems');

// const { fetchItem } = require("./helpers/fetchItem");

// const { fetchProducts } = require("./helpers/fetchProducts");

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

const cartItems = document.querySelector('.cart__items');
const items = document.querySelector('.items');
const emptyCartButton = document.querySelector('.empty-cart');
const loadingHTML = document.querySelector('.loading');
const calculatedPrice = document.querySelector('.total-price');
const liGet = document.createElement('li');

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 * 
 */

const cartItemClickListener = (event) => {
  cartItems.removeChild(event.target);
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const cartValue = async (value) => {
  const beforeValueTotal = Number(calculatedPrice.innerText);
  const result = value + beforeValueTotal;
  calculatedPrice.innerText = result;
};

// const cartValue = async () => {
//   const price = liGet.innerText;
//   console.log(price);
// };

const sendToCart = async (id) => {
  const product = await fetchItem(id);
  const cartItemElement = createCartItemElement(product);
  // await cartValue();
  await cartValue(Number(product.price));
  cartItems.appendChild(cartItemElement);
  const cartItem = document.querySelectorAll('.cart__item');
  const cartArray = Array.from(cartItem);
  const mapCart = cartArray.map((element) => element.innerHTML);
  const JSONmap = JSON.stringify(mapCart);
  saveCartItems(JSONmap);
};

const startLocalStorage = () => {
  if (localStorage.getItem('cart') !== null) {
    const savedCart = JSON.parse(getSavedCartItems());
    console.log(savedCart);
    savedCart.forEach((innerHTML) => {
      const li = document.createElement('li');
      li.className = 'cart__item';
      li.innerHTML = innerHTML;
      li.addEventListener('click', cartItemClickListener);
      cartItems.appendChild(li);
    });
  }
};

window.onload = async () => { 
  startLocalStorage();
  const response = await fetchProducts('computador');
  const products = response.results;
  products.forEach((element) => {
    const eachProducts = createProductItemElement(element);
    const id = eachProducts.querySelector('.item_id').innerText;
    const getButton = eachProducts.getElementsByClassName('item__add')[0];
    getButton.addEventListener('click', () => sendToCart(id));
    emptyCartButton.addEventListener('click', () => {
      (cartItems.innerHTML = '');
    });
    items.appendChild(eachProducts);
  });
  items.removeChild(loadingHTML);
};