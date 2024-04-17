import { reviewPage } from '../pages/basePage';
import { searchMerchant } from '../pages/searchMerchant';
import categoryDropwdown from '../fixtures/category_dropdown.json';
import ExpectedRes from '../fixtures/expected_results_category_dropdown.json';


describe('Category Dropdown', () => {

  beforeEach('Navigate to the reviews page', () => {

    reviewPage.reviewsPageVisit();
    cy.textExists('Read the reviews');

  })
  it('Should verify all options are present in the category dropdown', () => {

    searchMerchant.categoryDropdown.eq(0).click();


    const expectedCategoryDropdownList = categoryDropwdown.categoryDropdownList;


    searchMerchant.clickDropdown.each(($option) => {

      const optionText = $option.find('span').text();

      expect(expectedCategoryDropdownList).to.include(optionText);
    });
  });



  it.only('Should select "Baby & Toddler" option category and intercept the API request', () => {


    cy.intercept('GET', '/search-reviews/api/search*').as('getDropdownOptions');


    searchMerchant.categoryDropdown.eq(0).click();
    searchMerchant.clickDropdown.contains('Baby & Toddler').should('exist').click();

    cy.wait('@getDropdownOptions').then((interception) => {
      
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.state).to.equal('Complete')

      // If not , it will throw an error - Parsing the actual response body into a JavaScript object
      const actualResponseBody = JSON.parse(interception.response.body);
      expect(actualResponseBody).to.deep.equal(ExpectedRes);
      
    });

    // Verify the UI elements for "Little Bird Told Me"
    cy.contains('a', 'Little Bird Told Me').parents('.sc-a82a0cba-1').within(() => {
      searchMerchant.ratingStars.should('have.text', '5'); 
      searchMerchant.businessNameLittleBirdToldMe().should('have.text', 'Little Bird Told Me'); 
    });


    // Verify the UI elements for "Babyblooms"
    cy.contains('a', 'Babyblooms').parents('.sc-a82a0cba-1').within(() => {
      searchMerchant.ratingStars.should('have.text', '4.9'); 
      searchMerchant.businessNameBabyblooms().should('have.text', 'Babyblooms'); 
    });



  });
});










