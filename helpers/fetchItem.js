const fetchItem = async (param) => {
  if (param === undefined) {
    throw new Error('You must provide an url');
  }
  const url = 'https://api.mercadolibre.com/items/MLB1615760527';
  const response = await fetch(url);
  const json = await response.json();
  // console.log(json);
  return json;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
