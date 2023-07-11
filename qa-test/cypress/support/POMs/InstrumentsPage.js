const addNewInstrumentButton = "//button[@aria-label='Add']";
const symbolInputField = "#symbol";
const quoteCurrency = "#quoteCurrency";
const descriptionField = "input#description";
const calendarIdField = "input#calendarId";

const nextInFirstModal = "(//button[@data-testid='instrument-form-next-btn'])[1]";
const nextInSecondModal = "(//button[@data-testid='instrument-form-next-btn'])[2]";
const saveInstrumentButton = "//button[@data-testid='submit-btn']";

const pricePrecisionField = "#pricePrecision";
const quantityPrecisionField = "#quantityPrecision";
const minQuantityField = "#minQuantity";
const maxQuantityField = "#maxQuantity";


export default class InstrumentsPage{

    //method that creates the instrument from scratch
    //@created calendar - fetched from the calendar creation method - usually in a before hook
    //@precisionScore,quantityPrecision,minQuant,maxQuant - data used in the second modal of creation of instrument
       //-> can have any valid value - if no data is present, a default one will be passed
createInstumentFlow(createdCalendar,precisionScore,quantityPrecision,minQuant,maxQuant){
    //navigates to instruments section
    cy.xpath(addNewInstrumentButton).should('be.visible').click();
    //inputs modal 1 data
    cy.get(symbolInputField).should('be.visible').type(`USD${new Date().getTime()}`);
    cy.get(quoteCurrency).should('be.visible').type("$");
    cy.get(descriptionField).type(`AutomationInstrument${new Date().getTime()}`);
    //@createdCalendar - fetched from calendar creaton function
    cy.get(calendarIdField).type(createdCalendar);
    cy.contains(createdCalendar).click();
    cy.xpath(nextInFirstModal).click();
    //methods to add data in modal 2 of instrument creation
    this.inputPricePrecision(precisionScore);
    this.inputquantityPrecision(quantityPrecision);
    this.inputMinimumQuantity(minQuant);
    this.inputmaximumQuantity(maxQuant);
    cy.xpath(nextInSecondModal).click();
    cy.xpath(saveInstrumentButton).click();
}

inputPricePrecision(precisionScore){
    if(precisionScore){
        cy.get(pricePrecisionField).should('be.visible').type(precisionScore);
    }else{
        cy.get(pricePrecisionField).should('be.visible').type("10");
    }
}

inputquantityPrecision(quantityPrecision){
    if(quantityPrecision){
        cy.get(quantityPrecisionField).should('be.visible').type(quantityPrecision);
    }else{
        cy.get(quantityPrecisionField).should('be.visible').type("10");
    }
}

inputMinimumQuantity(minQuant){
    if(minQuant){
        cy.get(minQuantityField).should('be.visible').type(minQuant);
    }else{
        cy.get(minQuantityField).should('be.visible').type("1");
    }
}

inputmaximumQuantity(maxQuant){
    if(maxQuant){
        cy.get(maxQuantityField).should('be.visible').type(maxQuant);
    }else{
        cy.get(maxQuantityField).should('be.visible').type("10");
    }
}

}