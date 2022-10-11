const fetchProducts = async (search) => {
  if (search === undefined) {
    throw new Error('You must provide an url');
  }
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}