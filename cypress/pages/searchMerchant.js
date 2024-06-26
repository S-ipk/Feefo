
class SearchMerchant {

    get searchBox() { return cy.get("[placeholder='Search Merchants…']"); }
    get searchResult() { return cy.get('.sc-a82a0cba-1'); }
    get categoryDropdown() { return cy.get('.DropdownContainer-sc-1d334756-47'); }
    get clickDropdown() { return cy.get('.StyledOption-sc-1d334756-50'); }
    get ratingStars() { return cy.get('.sc-4cfb7b0b-7 > .sc-a82a0cba-6'); }
    businessNameLittleBirdToldMe() { return cy.xpath("//span[.='Little Bird Told Me']"); }
    businessNameBabyblooms() { return cy.xpath("//span[.='Babyblooms']"); }
    awardLevel() { return cy.xpath("//label[@id='feefo-dropdown-Award_Level-label']");  }
    get platinumWinners() { return cy.get('[data-testid="Platinum winners"]'); }
    sortBy() { return cy.xpath("//button[.='Sort By']");  }
    get platinumWinners() { return cy.get('[data-testid="Platinum winners"]'); }
    get sortByAtoZbyName() { return cy.get('[data-testid="Name - (A - Z)"]');  }
    starRating() { return cy.xpath("//label[@id='feefo-dropdown-Star_Rating-label']");  }
    ratingsDropdown() { return cy.xpath("//div[@class='Row-sc-1d334756-1 RowContainer-sc-1d334756-57 FiltersContainer-sc-1d334756-59 geWhmt etSgMI zJAxN']/div[@class='DropdownContainer-sc-1d334756-47 lbzbry FilterDropdown-sc-1d334756-61 jzVcoK']//div[.='Star Rating']");  }
    get ratingstarThree() { return cy.get('#feefo-dropdown-Star_Rating-item-2');  }
    


}

const searchMerchant = new SearchMerchant();

module.exports = {
    searchMerchant
  };




