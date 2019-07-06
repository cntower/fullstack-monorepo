import { getGreeting, getLoginFormSubmitButton, getLoginFormServerError } from "../support/app.po";

describe("Login Form", () => {
  beforeEach(() => cy.visit("/login"));
  it("should display Submit button", () => {
    getLoginFormSubmitButton().contains('Submit');
  });
  it("should display form validation messages", () => {
    getLoginFormSubmitButton().click();
    getLoginFormServerError().should(t => expect(t.length).equal(3));
  });
});
