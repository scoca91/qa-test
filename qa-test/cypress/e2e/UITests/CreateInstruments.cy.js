import ExchangePage from "../../support/POMs/ExchangePage";
import LoginPage from "../../support/POMs/LoginPage";
import CalendarsPage from "../../support/CalendarsPage";
import InstrumentsPage from "../../support/POMs/InstrumentsPage";
const login = new LoginPage();
const exchangePage = new ExchangePage();
const calendars = new CalendarsPage();
const instruments = new InstrumentsPage();

describe("Create instruments", () => {

    before('Create Calendar and store it for further use',function () {
        cy.visit(Cypress.env("baseUrl"));
        login.inputEmail();
        login.inputPassword();
        login.clickLoginButton();
        exchangePage.clickExchangePageCategory("Calendars");
        cy.get(calendars.createCalendarFlow("+11:00")).then(() => {
            this.createdCalendarName;
        });
    })

    it("Create Instrument", function () {
        cy.log(this.createdCalendarName);
        exchangePage.clickOnLogo();
        exchangePage.clickExchangePageCategory("Instruments");
        instruments.createInstumentFlow(this.createdCalendarName);
    })

})