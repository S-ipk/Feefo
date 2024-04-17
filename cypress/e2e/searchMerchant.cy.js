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
    it(`should display search results for "${searchTerm}"`, () => {
      searchMerchant.searchBox.type(searchTerm);
      const merchantName = `//span[text()="${searchTerm}"]`;
      cy.xpath(merchantName).should('contain', `${searchTerm}`);
    });
  });

  searchData.forEach((data, index) => {
    // Destructure the data object
    const { searchTerm, industry, stars } = data;
  
    // Define the test for the current data set
    it(`should display detailed , name , business , ratings search results for "${searchTerm}"`, () => {
      cy.intercept('GET', '/search-reviews/api/search*').as('searchRequest');
  
      searchMerchant.searchBox.type(searchTerm);
  
      cy.wait('@searchRequest', { timeout: 10000 }).then(({ request, response }) => {
        searchMerchant.searchResult.should('be.visible'); 
  
        if (response.body.docs) {
          // Iterate over each document in the response
          response.body.docs.forEach((doc) => {
            // Assert that the name exactly matches the searchTerm from the JSON file
            expect(doc.name).to.equal(searchTerm);
            // Assert that the industry exactly matches the industry from the JSON file
            expect(doc.industry).to.equal(industry);
            // Assert that the stars exactly match the stars from the JSON file
            expect(doc.stars).to.equal(stars);
          });
        } else {
          cy.log('No documents found in the response');
        }
      });
    });
  });
  
});





