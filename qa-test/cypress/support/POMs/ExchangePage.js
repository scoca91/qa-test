export default class ExchangePage {

clickExchangePageCategory(categoryName){
    cy.xpath(`//div[@data-testid='exchange-page-title' and contains(string(),'${categoryName}')]`).should('be.visible').click();
}

clickOnLogo(){
    cy.xpath("//img[@alt='Exberry logo']").click();
}

}