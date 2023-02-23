require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it ('2.1 - Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it ('2.2 Testa a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async() => {
    expect.assertions(1); 
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  });

  it ('2.3 - Testa se ao chamar a função com o argumento do item "MLB1615760527" a função utiliza o endpoin', async() => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it ('2.4 - Testa se o retorno da função é uma estrutura de dados igual ao objeto item', async() => {
    expect.assertions(1);
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it ('2.5 - Testa se ao chamar a função sem argumento retorna um erro', async() => {
    expect.assertions(1);
    await expect(fetchItem()).rejects.toThrow('You must provide an url');
  });
});
