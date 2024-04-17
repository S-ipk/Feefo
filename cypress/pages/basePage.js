class ReviewPage {
    reviewsPageVisit() {
      cy.visit(Cypress.env('reviews')); 
    }


  }
  
  const reviewPage = new ReviewPage();
  
  class Locators {
  
    get userName() {
  
      return cy.get("[placeholder='Email']", { timeout: 10000 }); 
    }


    
  }
  
  const locators = new Locators();
  module.exports = {
    reviewPage,
    locators,
  };
  
  