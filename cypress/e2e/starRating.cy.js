import { reviewPage } from '../pages/basePage';
import { searchMerchant } from '../pages/searchMerchant';


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




});










