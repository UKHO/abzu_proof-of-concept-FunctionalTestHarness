import { Page, expect } from '@playwright/test';
import { loginpageObjectsConfig } from '../GBS_PageObjects/GBS_LoginPageObjects.json';

//<summary>
// Clickng on Sign In link
//</summary>
//<param> page object </param>
//<param> username  </param>
//<param> password </param>

export async function login(page: Page, username: string, password: string, selector: string) {
  const [popup] = await Promise.all([page.waitForEvent('popup'), await page.click(selector)]);
  await popup.waitForLoadState();
  await popup.fill(loginpageObjectsConfig.emailSelector, username);
  await popup.click(loginpageObjectsConfig.continueSignInSelector);
  await popup.waitForSelector(loginpageObjectsConfig.passwordSelector);
  await popup.fill(loginpageObjectsConfig.passwordSelector, password);
  await popup.click(loginpageObjectsConfig.signInButtonSelector);
  return popup;
}

//<summary>
// Clickng on Sign Out link
//</summary>
//<param> page object </param>

export async function logout(page: Page): Promise<void> {
  await page.waitForSelector(loginpageObjectsConfig.signInButtonTextSelector);
  await page.click(loginpageObjectsConfig.signInButtonTextSelector);
  await page.waitForSelector(loginpageObjectsConfig.signOutButtonSelector);
  await page.click(loginpageObjectsConfig.signOutButtonSelector);
}

//<summary>
// Verifying Login Error
//</summary>
//<param> popup object </param>

export async function verifyLoginError(popup: Page): Promise<void> {
  expect(await popup.innerText(loginpageObjectsConfig.inValidSigninMessageSelector)).toBe(
    'The email/password entered does not match our records'
  );
}
