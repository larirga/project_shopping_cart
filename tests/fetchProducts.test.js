require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it ('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it ('1.1 Testa se recebe o argumento computador e se fetch foi chamada', async() => {
    expect.assertions(1); 
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  });

  it ('1.2 Testa se ao chamar a função fetchProducts com o argumento computador, a função fetch utiliza o endpoint', async() => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  })

  it ('1.3 Testa se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch', async() => {
    expect.assertions(1);
    const fetchs = await fetchProducts('computador');
    expect(fetchs).toEqual(computadorSearch);
  });

  it ('1.4 Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async() => {
    expect.assertions(1);
    await expect(fetchProducts()).rejects.toThrow('You must provide an url');
  });
});



