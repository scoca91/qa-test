const addNewCalendarButton = "//button[@aria-label='Add']";
const calendarNameField = "//input[@id='name']";
const calendarTimezoneDropdownBox = "//div[@id='mui-component-select-Time Zone (UTC)']";
const marketOpenInputField = "//input[@id='marketOpen']";
const marketCloseInputField = "//input[@id='marketClose']";
const saveCalendarButton = "button[data-testid='submit-btn']";
const calendarCreationSuccsessPopup = "span[data-testid='server-status-snackbar'][data-status='success']";

export default class CalendarsPage {

    clickAddNewCalendar() {
        cy.xpath(addNewCalendarButton).should('be.visible').click();
    }
    //@timezone: accepts string timezone as example: "+11:00"
    // This metod could be broken in multiple methods for each button for usability - but based on time purpose it was created in a single block 
    // => each action could be separated in a fuction and then the createCalendarFlow could have been a composition of those multiple functions
    // => also the market close and open could have been passed as parameters in order to have a more modular test -> for time purpose, the start/end time was hardcoded

    //method also returns the calendar name for further use in the tests
    createCalendarFlow(timezone) {
        this.clickAddNewCalendar();
        var calendarName = `AutomationCalendar${new Date().getTime()}`;
        cy.xpath(calendarNameField).should('be.visible').type(calendarName);
        cy.xpath(calendarTimezoneDropdownBox).click();
        var calendarTimezoneSelector = `//li[@data-testid[contains(string(),'${timezone}')]]`;
        cy.xpath(calendarTimezoneSelector).click();
        cy.xpath(marketOpenInputField).type('11:11');
        cy.xpath(marketCloseInputField).type('11:12');
        cy.get(saveCalendarButton).click();
        cy.wrap(calendarName).as("createdCalendarName");
        return '@createdCalendarName';
    }

    validateCalendarCreation(){
        cy.get(calendarCreationSuccsessPopup).should('be.visible');
    }

}