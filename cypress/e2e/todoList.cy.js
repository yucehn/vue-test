context("todoList spec", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8080");
    });

    it("displays two todo items by default",()=>{
      cy.get(".card-body").find("ul>li").should("have.length", 2);
      cy.get(".card ul").find(".todoList-box_input").first().should("have.value", "Pay electric bill")
      cy.get(".card ul").find(".todoList-box_input").last().should("have.value", "Walk the dog")
    })

    it("can add new todo items", () => {
        const newItem = "Feed the cat";
        cy.get(".to-do-text").type(`${newItem}{enter}`);

        cy.get(".to-do-text").should("have.value", "");
        cy.get(".card").should("be.visible");
        cy.get(".card-body").find("ul>li").should("have.length", 3);
        cy.get(".card ul").find(".input-group > input").last().should("have.value", newItem)
    });

    it("can check off an item as completed", () => {
      cy.get("[type=checkbox]").check(["Walk the dog"]);

      cy.get(".tab").find('[test-tab="done"]').click()
      cy.get(".card ul").find(".input-group > input").should('have.value', 'Walk the dog')
    });

    context('with a checked task',()=>{
      beforeEach(()=>{
        cy.get("[type=checkbox]").check(["Pay electric bill"]);
        cy.get(".tab").find("button[test-tab='all']").should('have.class', 'active')
      })

      it('can filter for uncompleted tasks',()=>{
        cy.contains('Pending').click()
        cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .find('input')
        .should('have.value', 'Walk the dog')
      })

      it('can filter for completed tasks',()=>{
        cy.contains('Completed').click()
        cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .find('input')
        .should('have.value', 'Pay electric bill')
      })

      it('can delete completed tasks', ()=>{
        cy.contains('Completed').click()
        cy.get('.btn_delete').click()
        cy.get('.todo-list li')
        .should('have.length', 0)
      })
    })
});
