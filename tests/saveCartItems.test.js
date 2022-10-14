const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it ('3.1 - Testa se ao executar a função com o argumento cartItem, o localStorage.setItem é chamado.', () => {
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
  it ('3.2 - Testa se ao executar a função com o argumento cartItem, o localStorage.setItem é chamado com dois parâmetros.', () => {
    saveCartItems('MLB2162947965');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'MLB2162947965');
  });
  it ('3.3 - Testa se é uma função', () => {
    expect(typeof saveCartItems).toBe('function');
  });
  it ('3.4 - Testa se ao chamar a função sem argumento retorna um erro', () => {
    expect(() => saveCartItems()).toThrow('You must provide an argument');
  });
});
