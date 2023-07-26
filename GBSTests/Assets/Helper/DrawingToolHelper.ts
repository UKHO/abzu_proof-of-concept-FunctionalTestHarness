import { Page, expect } from '@playwright/test';
import { homePageObjectsConfig } from '../GBS_PageObjects/GBS_HomePageObjects.json';
import { selectionDetailsPageObjectsConfig } from '../GBS_PageObjects/GBS_SelectionDetailsPageObjects.json';

export async function drawInvalidAreaRectangleOnMap(page: Page): Promise<void> {
  await drawOnMap(page, [
    { X: -8.1738, Y: 54.6298 },
    { X: -1.4062, Y: 49.2755 }
  ]);
}

export async function drawValidAreaRectangleOnMap(page: Page): Promise<void> {
  await drawOnMap(page, [
    { X: -3.1793, Y: 50.4804 },
    { X: -3.1347, Y: 50.1296 }
  ]);
}

export async function enablePolygonTool(page: Page): Promise<void> {
  await page.click(homePageObjectsConfig.polygonDrawingToolSelector);
}

export async function drawInvalidAreaPolygonOnMap(page: Page): Promise<void> {
  await drawOnMap(page, [
    { X: -7.9541, Y: 53.9371 },
    { X: -1.4062, Y: 55.2858 },
    { X: -1.4502, Y: 49.3618 },
    { X: -6.5038, Y: 49.7038 },
    { X: -6.5038, Y: 49.7038 }
  ]);
}

export async function drawValidAreaPolygonOnMap(page: Page): Promise<void> {
  await drawOnMap(page, [
    { X: -4.0505, Y: 50.3527 },
    { X: -3.9527, Y: 49.8701 },
    { X: -4.0505, Y: 49.5538 },
    { X: -4.0505, Y: 49.5538 }
  ]);
}

export async function enablePointTool(page: Page): Promise<void> {
  await page.click(homePageObjectsConfig.pointDrawingToolSelector);
}

export async function drawValidAreaPointOnMap(page: Page): Promise<void> {
  await drawOnMap(page, [{ X: -4.3640, Y: 50.1843 }]);
}

export async function enableRectangleTool(page: Page): Promise<void> {
  await page.click(homePageObjectsConfig.squareDrawingToolSelector);
}

export async function drawOnMap(page: Page, points: Array<MapCoordinates>): Promise<void> {
  for (const point of points) {
    let pixelCoord: Array<number> = [];
    const map = await getNgMap(page);
    if (map === null) {
      throw new Error('Could not get a reference to map');
    }
    const pointArr = degreesToMetres(point.X, point.Y);
    pixelCoord = await page.evaluate<number[]>(
      ([hMap, pointsForPx]: any) => {
        return hMap.getPixelFromCoordinate(pointsForPx);
      },
      [map, pointArr]
    );
    const viewportLocator = page.locator('.ol-viewport');
    await viewportLocator.click({
      position: {
        x: pixelCoord[0],
        y: pixelCoord[1]
      }
    });
  }
}

function degreesToMetres(lon: number, lat: number) {
  const x = (lon * 20037508.34) / 180;
  let y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180);
  y = (y * 20037508.34) / 180;
  return [x, y];
}

export async function getNgMap(page: Page) {
  const mapHandle = await page.evaluateHandle(() => {
    const map = document.getElementById('map');
    const ngContext = (map as any).__ngContext__;
    for (const item of ngContext) {
      if (item !== null && item.map !== undefined && item.map.getPixelFromCoordinate !== undefined) {
        return item.map;
      }
    }
    return null;
  });
  return mapHandle;
}

export async function verifyAndCloseValidationErrorsDialogue(page: Page, expectedErrorMessage: string): Promise<void> {
  await expect(page.locator(selectionDetailsPageObjectsConfig.selectionDialogueSelector)).not.toBeVisible();
  await expect(page.locator(homePageObjectsConfig.errorDialogueBoxSelector)).toBeVisible();
  await expect(page.locator(homePageObjectsConfig.validationTextSelector)).toContainText(expectedErrorMessage);
  await page.locator(homePageObjectsConfig.dialogueExitButtonSelector).dispatchEvent('click');
  await expect(page.locator(homePageObjectsConfig.dialogueExitButtonSelector)).not.toBeVisible();
}

export async function verifyValidationErrorsDialogueIsNotDisplayed(page: Page): Promise<void> {
  await expect(page.locator(homePageObjectsConfig.errorDialogueBoxSelector)).not.toBeVisible();
}

interface MapCoordinates {
  X: number;
  Y: number;
}
