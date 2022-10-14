const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it ('4.1 - Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });
  it ('4.2 - Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o cartItems como parâmetro.', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
  it ('4.3 - Testa se é uma função', () => {
    expect(typeof getSavedCartItems).toBe('function');
  });
  it ('4.4 - Testa se ao chamar a função sem argumento retorna um erro', () => {
    expect(() => getSavedCartItems()).toThrow('You must provide an argument');
  });
});
