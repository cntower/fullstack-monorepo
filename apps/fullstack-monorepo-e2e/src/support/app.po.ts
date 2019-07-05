export const getGreeting = () => cy.get("h1");
export const getLoginFormSubmitButton = () => cy.get('.login-form button.submit-button');
export const getLoginFormServerError = () => cy.get('.login-form .mat-error');
