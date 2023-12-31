import { test } from '@playwright/test';
import { autoTestConfig } from '../appSetting.json';
import { AcceptCookies,LoginPortal } from '../Assets/Helper/CommonHelper';
import { fssHomePageObjectsConfig } from '../Assets/PageObjects/fss-homepageObjects.json';
import { commonObjectsConfig } from '../Assets/PageObjects/commonObjects.json';
import { EssLandingPageObjects } from '../Assets/PageObjects/essui-landingpageObjects';
import { EncSelectionPageObjects } from '../Assets/PageObjects/essui-encselectionpageObjects';
import { EsDownloadPageObjects } from '../Assets/PageObjects/essui-esdownloadpageObjects';
import { apiRoute400, apiRoute403, apiRoute500, apiRoute200, apiRoute200WithExcludedENCs } from '../Assets/PageObjects/ess-api-mock';



test.describe('ESS UI ES Download Page Functional Test Scenarios', () => {

    let esslandingPageObjects: EssLandingPageObjects;
    let encSelectionPageObjects: EncSelectionPageObjects;
    let esDownloadPageObjects: EsDownloadPageObjects;

    test.beforeEach(async ({ page }) => {

        esslandingPageObjects = new EssLandingPageObjects(page);
        encSelectionPageObjects = new EncSelectionPageObjects(page);
        esDownloadPageObjects = new EsDownloadPageObjects(page);
        await page.goto(autoTestConfig.url);
        await page.waitForLoadState('load');
        await AcceptCookies(page);
        await LoginPortal(page, autoTestConfig.user, autoTestConfig.password);
        await page.locator(fssHomePageObjectsConfig.essLinkSelector).getByText(fssHomePageObjectsConfig.essLinkText).click();
        await esslandingPageObjects.uploadradiobtnSelectorClick();
        await esslandingPageObjects.uploadFile(page, './Tests/TestData/downloadvalidENCs.csv');
        await esslandingPageObjects.proceedButtonSelectorClick();
        await encSelectionPageObjects.selectAllSelectorClick();
    })

    // https://dev.azure.com/ukhocustomer/File-Share-Service/_workitems/edit/14092
    // https://dev.azure.com/ukhocustomer/File-Share-Service/_workitems/edit/14093
    // https://dev.azure.com/ukhocustomer/File-Share-Service/_workitems/edit/14094
    // https://dev.azure.com/ukhocustomer/File-Share-Service/_workitems/edit/14095
    // https://dev.azure.com/ukhocustomer/File-Share-Service/_workitems/edit/14239 
    // https://dev.azure.com/ukhocustomer/File-Share-Service/_workitems/edit/14330
    test('Verify Estimated Size of ES, Number of ENCs Selected, Spinner, Download button and downloaded zip file from Download page', async ({ page }) => {

        
        await encSelectionPageObjects.SelectedENCsCount();
        await encSelectionPageObjects.requestENCsSelectorClick();
        await esDownloadPageObjects.expect.SelectedENCs();
        await esDownloadPageObjects.expect.spinnerSelectorVisible();
        await esDownloadPageObjects.downloadButtonSelector.isVisible();//waitFor({state: 'visible'});
        await esDownloadPageObjects.expect.spinnerSelectorHidden();       
        await esDownloadPageObjects.expect.downloadButtonSelectorEnabled();
        //=========================================
        let t2 = await page.locator('p').filter({hasText:'Estimated size'}).textContent() as string;
        let t1 = await page.locator('strong').filter({hasText:'ENCs included'}).textContent();
        let t3:string = t1?.split(' ')[0] as string;
        let ENCsIncluded = parseInt(t3);
        esDownloadPageObjects.expect.VerifyExchangeSetSizeIsValid(t2,ENCsIncluded)
        //await esDownloadPageObjects.expect.VerifyExchangeSetSize();
        //=========================================
       
        await esDownloadPageObjects.downloadFile(page, './Tests/TestData/DownloadFile/ExchangeSet.zip');
        await esDownloadPageObjects.expect.ValidateFileDownloaded("./Tests/TestData/DownloadFile/ExchangeSet.zip");
        await esDownloadPageObjects.expect.ValidateFiledeleted("./Tests/TestData/DownloadFile/ExchangeSet.zip");
    })

    // https://dev.azure.com/ukhocustomer/File-Share-Service/_workitems/edit/14101
    test('Verify 400 scenario using playwright mock', async ({ page }) => {

        await apiRoute400(page);
        await encSelectionPageObjects.requestENCsSelectorClick();
        await esDownloadPageObjects.expect.errorMessageSelectorDisplayed();
    });

    // https://dev.azure.com/ukhocustomer/File-Share-Service/_workitems/edit/14101 
    test('Verify 403 scenario using playwright mock', async ({ page }) => {

        await apiRoute403(page);
        await encSelectionPageObjects.requestENCsSelectorClick();
        await esDownloadPageObjects.expect.errorMessageSelectorDisplayed();
    });

    // https://dev.azure.com/ukhocustomer/File-Share-Service/_workitems/edit/14101
    test('Verify 500 scenario using playwright mock', async ({ page }) => {

        await apiRoute500(page);
        await encSelectionPageObjects.requestENCsSelectorClick();
        await esDownloadPageObjects.expect.errorMessageSelectorDisplayed();
    });

    // https://dev.azure.com/ukhocustomer/File-Share-Service/_workitems/edit/14129
    test('Verify 200 scenario using playwright mock when all selected ENCs are included in ES', async ({ page }) => {

        await encSelectionPageObjects.startAgainLinkSelectorClick();
        await esslandingPageObjects.uploadradiobtnSelectorClick();
        await esslandingPageObjects.uploadFile(page, './Tests/TestData/downloadValidENCs.csv');
        await esslandingPageObjects.proceedButtonSelectorClick();
        await encSelectionPageObjects.selectAllSelectorClick();
        await apiRoute200(page);
        await encSelectionPageObjects.requestENCsSelectorClick();
        await esDownloadPageObjects.expect.downloadButtonSelectorEnabled();
        await esDownloadPageObjects.expect.selectedTextSelectorVisible();
        await esDownloadPageObjects.expect.includedENCsCountSelectorVisible();
    });

    // https://dev.azure.com/ukhocustomer/File-Share-Service/_workitems/edit/14130 
    test('Verify 200 scenario using playwright mock when all selected ENCs are not included in ES', async ({ page }) => {

        let invalidENCs = ['AU220150', 'AU5PTL01', 'GB123456']
        await apiRoute200WithExcludedENCs(page);
        await encSelectionPageObjects.requestENCsSelectorClick();        
        await esDownloadPageObjects.expect.downloadButtonSelectorEnabled();
        await esDownloadPageObjects.expect.ValidateInvalidENCsAsPerCount(invalidENCs);
        await esDownloadPageObjects.expect.selectedTextSelectorVisible();
        await esDownloadPageObjects.expect.includedENCsCountSelectorVisible();
    });

     // https://dev.azure.com/ukhocustomer/File-Share-Service/_workitems/edit/14316
     test('Verify all selected ENCs included in payload in a request.', async ({ page }) => {

        const selectedEncs = await encSelectionPageObjects.encTableButtonList .allInnerTexts();
        await encSelectionPageObjects.requestENCsSelectorClick()
        await page.on('request', req => {
            let requestPayload = req.postDataJSON();
            page.waitForLoadState();
            encSelectionPageObjects.expect.verifyRequestPayload(requestPayload, selectedEncs)
        });
    });
})