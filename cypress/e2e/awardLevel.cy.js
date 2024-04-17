import { reviewPage } from '../pages/basePage';
import { searchMerchant } from '../pages/searchMerchant';
import awardLevel from '../fixtures/award_level.json';
import ExpectedResAward from '../fixtures/expected_results_award_level_dropdown.json';


describe('Category Dropdown', () => {

  beforeEach('Navigate to the reviews page', () => {

    reviewPage.reviewsPageVisit();
    cy.textExists('Read the reviews');

  })


  const awardLevelDropdownList = awardLevel.awardLevel;
  it('Should verify all options are present in the award level dropdown', () => {
  
    searchMerchant.awardLevel().click();

    searchMerchant.categoryDropdown().each(($option) => {
      const optionText = $option.find('span').text();
      expect(awardLevelDropdownList).to.include(optionText);
    });
 

});

  it.only('Should select "Platinum winners" award level option and intercept the API request', () => {

    cy.intercept('GET', '/search-reviews/api/search*').as('getDropdownOptions');

   searchMerchant.awardLevel().click();

   searchMerchant.platinumWinners.click();

    cy.wait('@getDropdownOptions').then((interception) => {
      // Assert that the response status code is 200
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.state).to.equal('Complete')
      // If not , it will throw an error - Parsing the actual response body into a JavaScript object
      
      const actualResponseBody = JSON.parse(interception.response.body);
      expect(actualResponseBody).to.deep.equal(ExpectedResAward);


    // // Log the actual response body for debugging
    // console.log('Actual Response Body:', interception.response.body);

    // // Compare the actual response body and expected response
    // expect(interception.response.body).to.deep.equal(ExpectedResAward);
    //   //expect(interception.response.body).to.deep.equal(ExpectedResAward);
      
    });

  

});

});












