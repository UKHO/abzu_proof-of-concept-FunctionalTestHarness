import { test, expect } from '@playwright/test';
import { splashScreenPageObjectsConfig } from '../Assets/GBS_PageObjects/GBS_SplashScreenPageObjects.json';
import { autoTestConfig } from '../appconfig.json';
import { continueToSite, declineCookies} from '../Assets/Helper/PageNavigationHelper';
import { login, logout, verifyLoginError } from '../Assets/Helper/LoginHelper';
import { homePageObjectsConfig } from '../Assets/GBS_PageObjects/GBS_HomePageObjects.json';
import { loginpageObjectsConfig } from '../Assets/GBS_PageObjects/GBS_LoginPageObjects.json';

test.describe('Gridded Bathymetry Data Service Login Logout Functional Test Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(autoTestConfig.url);
    await page.waitForLoadState();
    await declineCookies(page);
    await continueToSite(page, splashScreenPageObjectsConfig.continueSiteSelector);
  });

  test('Test to login with valid credentails', async ({ page }) => {
    await login(page, autoTestConfig.testUserName, autoTestConfig.testPassword, homePageObjectsConfig.signInLink);
    await page.click(loginpageObjectsConfig.signInButtonTextSelector);
    await expect(page.isVisible(loginpageObjectsConfig.signOutButtonSelector)).toBeTruthy();
  });

  test('Test to login with valid credentails and then logout', async ({ page }) => {
    await login(page, autoTestConfig.testUserName, autoTestConfig.testPassword, homePageObjectsConfig.signInLink);
    await page.waitForLoadState();
    await logout(page);
    await expect(page.isVisible(loginpageObjectsConfig.signInButtonSelector)).toBeTruthy();
  });

  test('Test to try login with invalid UserName', async ({ page }) => {
    const popup = await login(
      page,
      autoTestConfig.invalidUserName,
      autoTestConfig.testPassword,
      homePageObjectsConfig.signInLink
    );
    await verifyLoginError(popup);
  });

  test('Test to try login with invalid Password', async ({ page }) => {
    const popup = await login(
      page,
      autoTestConfig.testUserName,
      autoTestConfig.invalidPassword,
      homePageObjectsConfig.signInLink
    );
    await verifyLoginError(popup);
  });
});