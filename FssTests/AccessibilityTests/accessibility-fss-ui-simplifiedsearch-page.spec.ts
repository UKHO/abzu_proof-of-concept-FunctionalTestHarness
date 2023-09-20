import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y} from 'axe-playwright'
import { AcceptCookies,LoginPortal } from '../Assets/Helper/CommonHelper';
import { fssSearchPageObjectsConfig } from '../Assets/PageObjects/fss-searchpageObjects.json';
import { commonObjectsConfig } from '../Assets/PageObjects/commonObjects.json';
import { attributeProductType} from '../Assets/Helper/ConstantHelper';
import { autoTestConfig } from '../../FssTests/appSetting.json';

test.describe('FSS UI Simplified Search Page Accessibility Test Scenarios', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto(autoTestConfig.url);
    await AcceptCookies(page);
    await LoginPortal(page, autoTestConfig.user, autoTestConfig.password);
    await page.waitForSelector(fssSearchPageObjectsConfig.searchPageContainerHeaderSelector);
    //var simplifiedSearchBox= (await page.$$(fssSearchPageObjectsConfig.inputSimplifiedSearchBoxSelector)).length
    //const simplifiedSearchBox = await page.$$eval('input', (inputs) => inputs.length);
    const simplifiedSearchBox = await page.getByLabel('Search');
    expect(simplifiedSearchBox).toBeTruthy();
  });

  test('check a11y for the initial page load and axe run options', async ({ page }) => {
    await injectAxe(page);
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
  });

  test('check a11y for no search result html and axe run options', async ({ page }) => {
    //await page.click(fssSearchPageObjectsConfig.simplifiedSearchButtonSelector);
    await page.getByTestId('sim-search-button').click();
    
    await page.waitForSelector(fssSearchPageObjectsConfig.dialogTitleSelector);
    await injectAxe(page);
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
  });

  test('check a11y for simplified search result html and axe run options', async ({ page }) => {
    //await page.fill(fssSearchPageObjectsConfig.inputSimplifiedSearchBoxSelector, attributeProductType.value);
    //await page.click(fssSearchPageObjectsConfig.simplifiedSearchButtonSelector);
    await page.getByRole("textbox").fill(attributeProductType.value);
    await page.getByTestId('sim-search-button').click();;
    await page.waitForSelector(fssSearchPageObjectsConfig.searchResultTableSelector);
    await injectAxe(page);
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
  });
});