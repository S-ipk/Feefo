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

    //const ExpectedRes =  '{"docs":[{"name":"&Keep","industry":"HOME_GARDEN","stars":4.8,"slug":"keep","logoUrl":"https://www.feefo.com/api/merchant-image/keep-logo.png","matchedName":"","serviceAwardLevels":["PLATINUM"]},{"name":"144 On The Hill","industry":"TOURISM","stars":5,"slug":"144-on-the-hill","logoUrl":"https://www.feefo.com/api/merchant-image/144-on-the-hill-logo.jpg","matchedName":"","serviceAwardLevels":[]},{"name":"1BR","industry":"TRANSPORTATION","stars":4.9,"slug":"1br","logoUrl":"https://www.feefo.com/api/merchant-image/1br-logo.JPG","matchedName":"","serviceAwardLevels":["PLATINUM"]},{"name":"1Plus1 Loans","industry":"FINANCE","stars":5,"slug":"1plus1-loans","logoUrl":"https://www.feefo.com/api/merchant-image/1plus1-loans-logo.png","matchedName":"","serviceAwardLevels":[]},{"name":"1st Class Accounts","industry":"BUSINESS_OFFICE","stars":4.9,"slug":"1st-class-accounts","logoUrl":"https://www.feefo.com/api/merchant-image/1st-class-accounts-logo.png","matchedName":"","serviceAwardLevels":["PLATINUM"]},{"name":"1st Class Credit Union","industry":"FINANCE","stars":4.6,"slug":"1st-class-credit-union","logoUrl":"https://www.feefo.com/api/merchant-image/1st-class-credit-union-logo.png","matchedName":"","serviceAwardLevels":["PLATINUM"]},{"name":"1st-it.com - Making Technology Simple","industry":"BUSINESS_OFFICE","stars":5,"slug":"1st-it-com","logoUrl":"https://www.feefo.com/api/merchant-image/1st-it-com-logo.jpg","matchedName":"","serviceAwardLevels":[]},{"name":"20/20 Project Management Training","industry":"EDUCATION_TRAINING","stars":4.5,"slug":"20-20-project-management","logoUrl":"https://www.feefo.com/api/merchant-image/20-20-project-management-logo.png","matchedName":"","serviceAwardLevels":["TRUSTED"]}],"numFound":3119}' 

    cy.wait('@getDropdownOptions').then((interception) => {
      // Assert that the response status code is 200
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.state).to.equal('Complete')

      cy.log("Here is my actual response body: ", interception.response.body);
      cy.log("Here is my expected response body : ", ExpectedResSortBy);
      const actualResponseBody = JSON.parse(interception.response.body);
      expect(actualResponseBody).to.deep.equal(ExpectedResSortBy);
      //expect(interception.response.body).to.equal(ExpectedRes);
    });

   

});

});












