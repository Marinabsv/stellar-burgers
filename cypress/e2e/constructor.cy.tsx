const constructorIngredients = '[data-cy=constructor-ingredients]';
const sauce = '[data-cy=sauce]';
const bun = '[data-cy=bun]';
const main = '[data-cy=main]';
const bunTop = '[data-cy=constructor-bun-top]';
const bunBottom = '[data-cy=constructor-bun-bottom]';
const modal = '[data-cy=modal]';
const testUrl = 'http://localhost:4000'; 

describe('Главная страница', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });
    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('postOrder');
    cy.setCookie('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', JSON.stringify('refreshToken'));
    cy.visit(testUrl);
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });


  it('тест добавления ингридиентов в конструктор', () => {
    cy.get(bun).contains('Добавить').click({ force: true });
    cy.get(bunTop).contains('Краторная булка').should('exist');
    cy.get(bunBottom).contains('Краторная булка').should('exist');
  
    cy.get(main).contains('Добавить').click({ force: true });
    cy.get(sauce).contains('Добавить').click({ force: true });
    cy.get(constructorIngredients)
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get(constructorIngredients).contains('Соус Spicy-X').should('exist');
  });


  it('тест открытия модального окна', () => {
    cy.contains('Соус фирменный Space Sauce').click({ force: true });
    cy.get(modal).should('be.visible');
  });

  it('тест закрытия модального окна', () => {
    cy.contains('Соус фирменный Space Sauce').click({ force: true });
    cy.get(modal).find('button').click({ force: true });
    cy.get(modal).should('not.be.visible');
  });
  it('тест закрытия по оверлею', () => {
    cy.contains('Соус фирменный Space Sauce').click({ force: true });
    cy.get('[data-cy="modal-overlay"]').click('topRight', { force: true });
    cy.get('#modals').children().should('not.exist');
  });

  it('тест оформления заказа', () => {
    cy.visit(testUrl);
    cy.wait('@getIngredients');
    cy.get(bun).contains('Добавить').click({ force: true });
    cy.get(main).contains('Добавить').click({ force: true });
    cy.get(sauce).contains('Добавить').click({ force: true });
    
    cy.get('[data-cy=order] button').click({ force: true });
    cy.get(modal).children().should('have.length', 2);
    cy.get(modal).find('h2').contains(58829);
    cy.get(modal).find('button').click({ force: true });
    cy.get('#modals').children().should('not.be.visible');

    cy.get(constructorIngredients).contains('Выберите булки');
      cy.get(constructorIngredients).contains('Выберите начинку');
  });
});
