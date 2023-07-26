import { Page, expect } from '@playwright/test';
import { orderSummaryPageObjectsConfig } from '../GBS_PageObjects/GBS_OrderSummaryPageObjects.json';
import { selectionDetailsPageObjectsConfig } from '../GBS_PageObjects/GBS_SelectionDetailsPageObjects.json';
let totalprice_fromcalculation;
let totalprice_fromUI;

//<summary>
// Calculating number of selected cells
//</summary>
//<param> page object </param>
//<param> selectedcells selector </param>
export async function selectedCellCalculation(page: Page, selectedcells: string): Promise<number> {
  const numberofcells = page.innerText(selectedcells);
  const totalcells = (await numberofcells).split(' ', 1);
  const cellcount: number = +totalcells[0];
  return cellcount;
}

//<summary>
// Calculating price without VAT
//</summary>
//<param> page object </param>
//<param> amount </param>
//<param> cellcount </param>
export async function priceCalculationwithoutVAT(page: Page, amount: string, cellcount: number): Promise<void> {
  const amnt: number = +amount;
  totalprice_fromcalculation = (amnt * cellcount).toFixed(2);
  totalprice_fromUI = await page.innerText(selectionDetailsPageObjectsConfig.amountSelector);
  expect('£' + totalprice_fromcalculation).toBe(totalprice_fromUI);
}

//<summary>
// Calculating price with VAT
//</summary>
//<param> page object </param>
//<param> amount </param>
//<param> cellcount </param>
export async function priceCalculationwithVAT(
  page: Page,
  amount: string,
  cellcount: number,
  vat: string
): Promise<void> {
  const amnt: number = +amount;
  const vatamnt: number = +vat*cellcount;
  totalprice_fromcalculation = (amnt * cellcount + vatamnt).toFixed(2);
  totalprice_fromUI = await page.innerText(orderSummaryPageObjectsConfig.priceWithVatSelector);
  expect('£' + totalprice_fromcalculation).toBe(totalprice_fromUI);
}
