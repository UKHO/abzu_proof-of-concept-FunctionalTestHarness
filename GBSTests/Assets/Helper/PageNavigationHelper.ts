import { Page } from '@playwright/test';

//<summary>
// Clickng Continue to Site button
//</summary>
//<param> page object </param>
//<param> element selector</param>

export async function continueToSite(page: Page, elementSelector: string): Promise<void> {
  const continueToSiteButton = page.locator(elementSelector);
  if (await continueToSiteButton.isVisible()) {
    await continueToSiteButton.click();
  }
}

//<summary>
// Clickng reject cookies button
//</summary>
//<param> page object </param>

export async function declineCookies(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector('#onetrust-reject-all-handler');
  await page.click('#onetrust-reject-all-handler');
}
