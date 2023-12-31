import { test } from '@playwright/test';
import { injectAxe, checkA11y} from 'axe-playwright'
import { AcceptCookies,LoginPortal } from '../Assets/Helper/CommonHelper';
import { fssSearchPageObjectsConfig } from '../Assets/PageObjects/fss-searchpageObjects.json';
import { commonObjectsConfig } from '../Assets/PageObjects/commonObjects.json';
import { attributeProductType} from '../Assets/Helper/ConstantHelper';
import { SearchAttribute, ClickWaitRetry } from '../Assets/Helper/SearchPageHelper';
import { autoTestConfig } from '../appSetting.json';

test.describe('FSS UI Search Page Accessibility Test Scenarios', () => {
 
  test.beforeEach(async ({page}) => {    
    await page.goto(autoTestConfig.url)
    await AcceptCookies(page);
    await LoginPortal(page,autoTestConfig.user, autoTestConfig.password);
    await page.waitForSelector(fssSearchPageObjectsConfig.searchPageContainerHeaderSelector);   
    await page.click(fssSearchPageObjectsConfig.advancedSearchLinkSelector, {force: true});
    await SearchAttribute(page, attributeProductType.key);
    await page.selectOption(fssSearchPageObjectsConfig.operatorDropDownSelector,"contains");
    await page.fill(fssSearchPageObjectsConfig.inputSearchValueSelector, attributeProductType.value);
    //await ClickWaitRetry(page, fssSearchPageObjectsConfig.searchAttributeButton, fssSearchPageObjectsConfig.searchAttributeTable, undefined, 10000);
    await page.getByTestId('adv-search-button').click();
    await injectAxe(page);
  })  

  test('check a11y for the whole page and axe run options', async ({page}) => {
    await checkA11y(page, undefined, {
      axeOptions: {               
        runOnly: {         
          type: 'tag',
          values: ['wcag2aa'],
        },
      },
      detailedReport: true,
      detailedReportOptions: { html: true }
    });
  }) 
})