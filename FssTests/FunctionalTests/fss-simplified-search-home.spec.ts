import { test, expect } from '@playwright/test';
import { autoTestConfig } from '../appSetting.json';
import { commonObjectsConfig } from '../Assets/PageObjects/commonObjects.json';
import { fssSearchPageObjectsConfig } from '../Assets/PageObjects/fss-searchpageObjects.json';
import { AcceptCookies, LoginPortal } from '../Assets/Helper/CommonHelper';
import { ClickWaitRetry } from '../Assets/Helper/SearchPageHelper';

test.describe('Test Search Attribute Scenario On Simplified Search Page', () => {
  
  test.beforeEach(async ({ page }) => {
      await page.goto(autoTestConfig.url)
      await AcceptCookies(page);
      await LoginPortal(page,autoTestConfig.user, autoTestConfig.password);
      await page.waitForSelector(fssSearchPageObjectsConfig.searchPageContainerHeaderSelector);
      expect(await page.innerHTML(fssSearchPageObjectsConfig.searchPageContainerHeaderSelector)).toEqual(fssSearchPageObjectsConfig.searchPageContainerHeaderText);
  })

  test('Verify user landed on "Simplified Search" page', async ({ page }) => {
       
    //var simplifiedSearchBox= (await page.$$(fssSearchPageObjectsConfig.inputSimplifiedSearchBoxSelector)).length
    var simplifiedSearchBox= (await page.$$('.simplifiedSection')).length
    expect(simplifiedSearchBox).toEqual(1);
    var advanceSearchElements =(await page.$$("#fss-querytable-field-1 input,fss-querytable-operator-1 select,#fss-querytable-value-1 input")).length
    expect(advanceSearchElements).toEqual(0);
  })

  test('Does it display "Advanced Search" link on Simplified Search page', async ({ page }) => {
    var advancedSearchLink = await page.innerText(fssSearchPageObjectsConfig.advancedSearchLinkSelector);
    expect(advancedSearchLink).toEqual(fssSearchPageObjectsConfig.advancedSearchLink);
  })

  test('Does it display "Error message" if user clicks on search button and simplified search box is empty', async ({ page }) => {
    //await page.waitForSelector(fssSearchPageObjectsConfig.inputSimplifiedSearchBoxSelector);
    //await ClickWaitRetry(page, fssSearchPageObjectsConfig.searchAttributeButton, fssSearchPageObjectsConfig.dialogInfoSelector);
    await page.getByTestId('sim-search-button').click();

    //await page.click(fssSearchPageObjectsConfig.simplifiedSearchButtonSelector);
    var errorMessage = await page.innerText(fssSearchPageObjectsConfig.dialogTitleSelector);
    expect(errorMessage).toContain(fssSearchPageObjectsConfig.warningMessageValue);
  }) 

  test('Verify user clicks on "Advanced Search" link navigates to Advanced Search page', async ({ page }) => {
    await page.waitForSelector(fssSearchPageObjectsConfig.advancedSearchLinkSelector);
    await page.click(fssSearchPageObjectsConfig.advancedSearchLinkSelector, {force: true});
    await page.waitForSelector(fssSearchPageObjectsConfig.advancedSearchAddLineSelector);
    await page.click(fssSearchPageObjectsConfig.advancedSearchAddLineSelector);
    await page.waitForSelector(fssSearchPageObjectsConfig.advancedSearchTableSelector);   
    //search box for simplified search is not present on advanced search page.
    var simplifiedSearchBox= (await page.$$(fssSearchPageObjectsConfig.inputSimplifiedSearchBoxSelector)).length
    expect(simplifiedSearchBox).toEqual(0);
    
  })
})