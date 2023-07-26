import { Page, expect } from '@playwright/test';
import { homePageObjectsConfig } from '../GBS_PageObjects/GBS_HomePageObjects.json';
import { selectionDetailsPageObjectsConfig } from '../GBS_PageObjects/GBS_SelectionDetailsPageObjects.json';

//<summary>
// verify Search co-ordinate Error
//</summary>
//<param> page object </param>
//<param> search text </param>

export async function verifySearchCoordinateError(page: Page, searchText: string): Promise<void> {
  await page.fill(homePageObjectsConfig.searchCordinateSelector, searchText);
  await page.click(homePageObjectsConfig.searchButtonSelector);
  await expect(page.locator(selectionDetailsPageObjectsConfig.selectionDialogueSelector)).not.toBeVisible();
  await expect(page.locator(homePageObjectsConfig.errorDialogueBoxSelector)).toBeVisible();
  await expect(page.locator(homePageObjectsConfig.errorDialogueBoxTextSelector)).toContainText(
    homePageObjectsConfig.errorTextSelector
  );
  await page.click(homePageObjectsConfig.dialogueExitButtonSelector);
  await expect(page.locator(homePageObjectsConfig.dialogueExitButtonSelector)).not.toBeVisible();
}
