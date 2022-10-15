const getSavedCartItems = () => {
  const cartItem = localStorage.getItem('cart');
  const jsonCart = cartItem;
  return jsonCart;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
