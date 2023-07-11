import ExchangePage from "../../support/POMs/ExchangePage";
import LoginPage from "../../support/POMs/LoginPage";
import CalendarsPage from "../../support/CalendarsPage";
const login = new LoginPage();
const exchangePage = new ExchangePage();
const calendars = new CalendarsPage();

describe('Create Calendar',()=>{


it('Calendar Creation',()=>{
    cy.log('Calendar Creations STARTS...');
    cy.visit(Cypress.env("baseUrl"));
    login.inputEmail();
    login.inputPassword();
    login.clickLoginButton();
    exchangePage.clickExchangePageCategory("Calendars");
    
    cy.get(calendars.createCalendarFlow("+11:00")).then(createdCalendarName=>{
        cy.log(`this is the created calendar: ${createdCalendarName}`)
    });
    calendars.validateCalendarCreation();
})

})