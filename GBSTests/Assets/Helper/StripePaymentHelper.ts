import { Page } from '@playwright/test';
import { autoTestConfig } from '../appconfig.json';
import { stripePaymentPageObjectsConfig } from '../GBS_PageObjects/GBS_StripePaymentPageObjects.json';

//<summary>
// stripe payment details
//</summary>
//<param> page object </param>
//<param> card number </param>

export async function StripePaymentProcessing(page: Page, cardnumber: string): Promise<void> {
  await page.waitForSelector(stripePaymentPageObjectsConfig.stripeEmailSelector);
  await page.fill(stripePaymentPageObjectsConfig.stripeEmailSelector, autoTestConfig.testUserName);
  await page.fill(stripePaymentPageObjectsConfig.stripeCardNumberSelector, cardnumber);
  await page.fill(stripePaymentPageObjectsConfig.stripeCardExpirySelector, autoTestConfig.stripeCardExpiryDate);
  await page.fill(stripePaymentPageObjectsConfig.stripeCvvSelector, autoTestConfig.stripeCvvNumber);
  await page.fill(stripePaymentPageObjectsConfig.stripeNameOnCardSelector, autoTestConfig.stripeNameOnCard);
  await page.fill(stripePaymentPageObjectsConfig.stripeBillingAdd1Selector, autoTestConfig.stripeUserAddress);
  await page.fill(stripePaymentPageObjectsConfig.stripeBillingAdd2Selector, autoTestConfig.stripeUserAddress);
  await page.fill(stripePaymentPageObjectsConfig.stripeBillingCitySelector, autoTestConfig.stripeUserAddress);
  await page.fill(stripePaymentPageObjectsConfig.stripePinCodeSelector, autoTestConfig.stripePinCode);
  //This selector is not visible in pipeline, so to tackle it we have used this IF condition.
  const stateSelector = page.locator(stripePaymentPageObjectsConfig.stripeBillingStateSelector);
  if (await stateSelector.isVisible()) {
    await page.selectOption(stripePaymentPageObjectsConfig.stripeBillingStateSelector, { value: 'Maharashtra' });
  }
  await page.click(stripePaymentPageObjectsConfig.stripePayButtonSelector);
}
