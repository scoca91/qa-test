const emailInputField = "#username";
const  passwordInputField = "#password";
const continueButton = "button[name='action'][type='submit']";

export default class LoginPage {

    inputEmail(strEmail) {
        if (strEmail) {
            cy.get(emailInputField).should('be.visible').type(strEmail);
        }else{
            cy.get(emailInputField).should('be.visible').type(Cypress.env("email"));
        }
    }

    inputPassword(strPassword){
        if (strPassword) {
            cy.get(passwordInputField).should('be.visible').type(strPassword);
        }else{
            cy.get(passwordInputField).should('be.visible').type(Cypress.env("password"));
        }
    }

    clickLoginButton(){
        cy.get(continueButton).eq(1).should('be.visible').click();
    }


}