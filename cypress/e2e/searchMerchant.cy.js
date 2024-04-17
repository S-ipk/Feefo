import { reviewPage } from '../pages/basePage';
import { searchMerchant } from '../pages/searchMerchant';
import searchMerchantsData from '../fixtures/search_merchants.json';
import searchData from '../fixtures/search_data.json';


describe('Search Merchant', () => {

  beforeEach('Navigate to the reviews page', () => {

    reviewPage.reviewsPageVisit();
    cy.textExists('Read the reviews');

  })



  const searchMerchants = searchMerchantsData.searchMerchants;

  searchMerchants.forEach((searchTerm) => {
    it(`Should display search results for "${searchTerm}"`, () => {

      searchMerchant.searchBox.type(searchTerm);
      const merchantName = `//span[text()="${searchTerm}"]`;
      cy.xpath(merchantName).should('contain', `${searchTerm}`);
    });
  });



  searchData.forEach((data, index) => {

    const { searchTerm, industry, stars } = data;
  
   
    it(`Should display detailed , name , business , ratings search results for "${searchTerm}"`, () => {

      cy.intercept('GET', '/search-reviews/api/search*').as('searchRequest');
  
      searchMerchant.searchBox.type(searchTerm);
  
      cy.wait('@searchRequest', { timeout: 10000 }).then(({ request, response }) => {
        searchMerchant.searchResult.should('be.visible'); 
  
        if (response.body.docs) {
       
          response.body.docs.forEach((doc) => {
         
            expect(doc.name).to.equal(searchTerm);
            expect(doc.industry).to.equal(industry);
            expect(doc.stars).to.equal(stars);
          });
        } else {
          cy.log('No documents found in the response');
        }
      });
    });
  });



  it(`Should display warning message for invalid search input`, () => {
      
    searchMerchant.searchBox.type("Invalid search input");
    // const merchantName = `//span[text()="${searchTerm}"]`;
    // cy.xpath(merchantName).should('contain', `${searchTerm}`);
    cy.textExists("No Results");
  });
});
  






