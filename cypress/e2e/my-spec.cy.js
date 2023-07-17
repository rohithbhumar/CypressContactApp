// cypress/e2e/my-spec.cy.js

describe('Contact List App', () => {
    beforeEach(() => {
      cy.visit('contact_app.html'); 
  
      // Add a new contact before each test
      cy.get('input[placeholder="Name"]').type('John Doe');
      cy.get('input[placeholder="Phone"]').type('1234567890');
      cy.get('input[placeholder="Email"]').type('john.doe@example.com');
      cy.get('button[name="add"]').click();
  
      // Adding assertions to verify that the new contact is added successfully
      cy.contains('td', 'John Doe').should('be.visible');
      cy.contains('td', '1234567890').should('be.visible');
      cy.contains('td', 'john.doe@example.com').should('be.visible');
    });
  
  
    it('should edit a contact', () => {
      const editedContact = {
        Name: 'Jane Doe',
        Phone: '9876543210',
        Email: 'jane.doe@example.com',
      };
  
      // Find a contact in the table and click the 'Edit' button
      cy.contains('td', 'John Doe').parent('tr').within(() => {
        cy.get('button[name="edit"]').click();
      });
  
      // Modify the contact details and click the 'Update' button
        cy.get('#app > table > tbody > tr:nth-child(2) > td:nth-child(1) > input[type=text]').clear().type(editedContact.Name);
        cy.get('#app > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type=text]').clear().type(editedContact.Phone);
        cy.get('#app > table > tbody > tr:nth-child(2) > td:nth-child(3) > input[type=text]').clear().type(editedContact.Email);
        cy.get('#app > table > tbody > tr:nth-child(2) > td:nth-child(4) > button').click();
  
      // Verify if the updated details are displayed in the table
      cy.contains('td', editedContact.Name).should('be.visible');
      cy.contains('td', editedContact.Phone).should('be.visible');
      cy.contains('td', editedContact.Email).should('be.visible');
    });
  
    it('should delete a contact', () => {
      // Find a contact in the table and click the 'Delete' button
      cy.contains('td', 'John Doe').parent('tr').within(() => {
        cy.get('button[name="delete"]').click();
      });
  
      // Verify if the contact is removed from the table
      cy.contains('td', 'John Doe').should('not.exist');
      cy.contains('td', '1234567890').should('not.exist');
      cy.contains('td', 'john.doe@example.com').should('not.exist');
    });

    // Above are the possible tests that I have demonstrated. I could further add test scenarios here as needed.
  });
  