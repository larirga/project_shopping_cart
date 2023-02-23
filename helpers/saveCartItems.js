const saveCartItems = (mapCart) => {
  localStorage.setItem('cart', mapCart);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
