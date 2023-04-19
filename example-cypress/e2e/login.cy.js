describe("template spec", () => {
  beforeEach(() => {
      cy.visit("http://localhost:8080");
  });

  it('test sign in and logout',()=>{
    cy.get('.btn-signIn').click();
    cy.get('#username').type('yuyu').should('have.value', 'yuyu')
    cy.get('#password').type('Qaz123')
    cy.get('.login-from').submit()
    cy.contains('Logout')
    cy.get('.btn-logout').click();
  })

  it('test sign up', async ()=>{
    const data = {
      username:'test',
      password:'test123'
    }
    cy.get('.btn-signUp').click();
    cy.get('#username').type(data.username).should('have.value', data.username)
    cy.get('#password').type(data.password)
    cy.get('.login-from').submit()
    cy.get('.btn-logout').click();

    cy.get('.btn-signIn').click();
    cy.get('#username').type(data.username)
    cy.get('#password').type(data.password)
    cy.get('.login-from').submit()
    cy.contains('Logout')
  })
});
