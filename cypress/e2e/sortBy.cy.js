import { reviewPage } from '../pages/basePage';
import { searchMerchant } from '../pages/searchMerchant';
import sortByDropdown from '../fixtures/sortBy_dropdown.json';
import ExpectedResSortBy from '../fixtures/expected_results_sortBy_dropdown.json';


describe('Category Dropdown', () => {

  beforeEach('Navigate to the reviews page', () => {

    reviewPage.reviewsPageVisit();
    cy.textExists('Read the reviews');

  })
  it('Should verify all options are present in the  sort by dropdown', () => {
   
    searchMerchant.sortBy().click();

    const expectedSortByList = sortByDropdown.sortByDropdownList;

  
    searchMerchant.clickDropdown.each(($option) => {
      
      const optionText = $option.find('span').text();
     
      expect(expectedSortByList).to.include(optionText);
    });
 

});

  it.only('Should select "Name - (A - Z)" sort by option and intercept the API request', () => {

    cy.intercept('GET', '/search-reviews/api/search*').as('getDropdownOptions');
    searchMerchant.sortBy().click();


     searchMerchant.sortByAtoZbyName.click();

    cy.wait('@getDropdownOptions').then((interception) => {
      // Assert that the response status code is 200
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.state).to.equal('Complete')

      cy.log("Here is my actual response body: ", interception.response.body);
      cy.log("Here is my expected response body : ", ExpectedResSortBy);
      const actualResponseBody = JSON.parse(interception.response.body);
      expect(actualResponseBody).to.deep.equal(ExpectedResSortBy);
      
    });

   

});

});












