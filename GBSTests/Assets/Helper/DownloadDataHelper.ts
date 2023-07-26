import { Page } from 'playwright';
import { expect } from '@playwright/test';
import { downloadDataPageObjectsConfig } from '../GBS_PageObjects/GBS_DownloadDataPageObjects.json';
import { selectionDetailsPageObjectsConfig } from '../GBS_PageObjects/GBS_SelectionDetailsPageObjects.json';
import { orderSummaryPageObjectsConfig } from '../GBS_PageObjects/GBS_OrderSummaryPageObjects.json';
import { autoTestConfig } from '../appconfig.json';
import { login } from '../Helper/LoginHelper';
import fs from 'fs';
let fileFound;
let fileDeleted;
const downloadFilePath = './AutoTests/FunctionalTests/DownloadFiles/GBS_DATA.zip';

//<summary>
// Verifying Message
//</summary>
//<param> page object </param>
//<param> Selector </param>
//<param> Message </param>
export async function VerifyMessage(page: Page, selector: string, verifyMessage: string): Promise<void> {
  let exchangeset;
  while (true) {
    exchangeset = await page.innerText(selector);
    if (exchangeset.trim() == verifyMessage) {
      break;
    }
  }
}

//<summary>
// Download Zip and Store
//</summary>
//<param> page object </param>

export async function DownloadZipInDirectory(page: Page): Promise<void> {
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click(downloadDataPageObjectsConfig.downloadFileButtonSelector)
  ]);
  await download.saveAs(downloadFilePath);

  //to verify downloaded file exist in the given directory
  if (fs.existsSync(downloadFilePath)) {
    fileFound = true;
  } else {
    fileFound = false;
  }
  await expect(fileFound).toBeTruthy();
}

//<summary>
// Delete Zip
//</summary>

export async function DeleteZipFromDirectory(): Promise<void> {
  // to delete the downloaded file
  if (fs.existsSync(downloadFilePath)) {
    fs.unlinkSync(downloadFilePath);
    fileDeleted = true;
  } else {
    fileDeleted = false;
  }
  await expect(fileDeleted).toBeTruthy();

  //to verify file has deleted successfully from the directory
  if (fs.existsSync(downloadFilePath)) {
    fileDeleted = false;
  } else {
    fileDeleted = true;
  }
  await expect(fileDeleted).toBeTruthy();
}

//<summary>
// Page Navigation till checkout page
//</summary>
//<param> page object </param>
//<param> output Type </param>

export async function pageNavigationTillCheckoutPage(page: Page, outputType: string): Promise<void> {
  await page.selectOption(selectionDetailsPageObjectsConfig.outputTypeSelector, { value: outputType });
  await page.click(selectionDetailsPageObjectsConfig.nextButtonSelector);
  await page.waitForSelector(orderSummaryPageObjectsConfig.priceWithoutVatSelector);
  await page.click(orderSummaryPageObjectsConfig.termsofUseCheckBoxSelector);
  await login(
    page,
    autoTestConfig.testUserName,
    autoTestConfig.testPassword,
    orderSummaryPageObjectsConfig.checkoutButtonSelector
  );
}
