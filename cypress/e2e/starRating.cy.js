import { reviewPage } from '../pages/basePage';
import { searchMerchant } from '../pages/searchMerchant';
import ExpectedResSortBy from '../fixtures/expected_results_starRatings_dropdown.json';


describe('Category Dropdown', () => {

  beforeEach('Navigate to the reviews page', () => {

    reviewPage.reviewsPageVisit();
    cy.textExists('Read the reviews');

  })
  it('should verify all rating options are present in the dropdown', () => {
    // Click on the first dropdown element to expand it
    searchMerchant.starRating().click();

       // Iterate through each option
       for (let i = 0; i < 5; i++) {
        const optionId = `feefo-dropdown-Star_Rating-item-${i}`;
  
        // Verify if the option exists
        cy.get(`#${optionId}`).should('exist');
      }

    
  });


  it.only('Should select "Name - (A - Z)" sort by option and intercept the API request', () => {

    cy.intercept('GET', '/search-reviews/api/search*').as('getDropdownOptions');
    
    searchMerchant.ratingsDropdown().click();


    searchMerchant.ratingstarThree.click();

    cy.wait('@getDropdownOptions').then((interception) => {
      // Assert that the response status code is 200
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.state).to.equal('Complete')

      
      const actualResponseBody = JSON.parse(interception.response.body);
      expect(actualResponseBody).to.deep.equal(ExpectedResSortBy);
      
    });

  });


});










