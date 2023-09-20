import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://fss-dev.admiralty.co.uk/');
  await page.goto('https://fss-dev.admiralty.co.uk/#/');
  const page31Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  const page31 = await page31Promise;
  await page31.getByPlaceholder('Email').click();
  await page31.getByPlaceholder('Email').click();
  await page31.getByPlaceholder('Email').fill('arichardh@ukho.gov.uk');
  await page31.getByLabel('Continue').click();
  await page31.locator('#i0118').fill('Hct2&brn1@Mjh7');
  await page31.getByRole('button', { name: 'Sign in' }).click();
  await page31.goto('https://login.microsoftonline.com/common/SAS/ProcessAuth');
  await page31.goto('https://fss-dev.admiralty.co.uk/#state=eyJpZCI6ImZiNDdjMTFhLTExODktNGE2ZS1hMGQ0LTc0Mzg5OGFkZWE1MyIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicG9wdXAifX0%3d&client_info=eyJ1aWQiOiJhNTVjODQxNS1hYzE4LTQ5NjAtOTY3NS1hYWIyNmY1ZGNiMjctYjJjXzFhX3NpZ25pbl9zcGEiLCJ1dGlkIjoiYzk5ZjZhYzYtY2Q2YS00MGM5LTk4NWUtM2UyZjk0ZWFjNzU0In0&code=eyJraWQiOiIycmswdExKeFktdEtaVWJoWE9MeGRtNWdZYUZ0cDdMVmQ3Sk5IeUNsVkh3IiwidmVyIjoiMS4wIiwiemlwIjoiRGVmbGF0ZSIsInNlciI6IjEuMCJ9.W75hnFPMWiIlbC6KkgS6DWe3BgJxqtGlW5a5s6wqwB0tuusd9RPVo6SxmYQpf0vxbkp7aCOpblTHgBtqr3RfaHgB0BXmJPyLV4Q-ai3qmUWQlxLNsKRdRudMiwaSc-HwveKX2amiFAud5OhMtfM9v9TYjpoqyoSIcQ7LwtbW7WOSwhmvHYazhOTkus1SnRDskSI0WIk0i-XwrYMna8921zY78Fiqqzccitc_C0jJQO5YeA4_96TvncqJTS0OO1IPJh08f3Cm71NM2s48fKxvzWAp2BUv9df1zPioo7S05EspLe_jqT1Y2cgMNFDFGGaPdEGyUdlFlIQuwGbUStoNHQ.K8BzzzyQetj2G3Ec.Zz8vLFCdMN-BVNuxWvKTpjT6USqItnsoy8Upe3I_wWCKMGNvQojFPUX5EAkdpULz2XEXPnsM8pZ7f-bd9zVnmf4VV0lh530uFkRciVgLmp1UhbKlhR6Dl_dbN_iO6RZrzRyjKlxpvxKiwN9NXslse5Gee7R9LBynBSxz2hswxwwjcVNJqt07oN5iIwwJ1_wOwmV4-kIlPBHo-QaTw5yx-CbNsb18PIDIIhOEm9B-ghZEinS_CzR9Vp6ainWAra7-k9V5Hb5i2QB1ezFrCyy6dU95d-bKULkRIP7fsLEPbTsCw3hIWDhZsP2ULbwB8aAc8p6SDtwZeqQLVnSUt-yQ_WdUoMK2Xy9tO2pZ8ywyF1ZFlBr2F0w6w8zwXtL6MaHC0V76WNfmx9PimFRaTSwQ0SSkkYPCVn-aPlCMo9AoRqdqJwpe986tks6dtS9i7UcXWm6JmCm-XJJIz1HV7SS_gjDx-ElMKgw8VA23_5DrkvRiWGoeJaQ13SsAjFRjmoa-lzDEugVtBaP2FWCWMQNo3pSqNZQD2ExUSruSdujE6gb5ClekAd7LHktCoAgiS7UaDssTJKpOe93_Lb2jpBXNFHWWgEt9SKLWBmaWTIiZMu0SGaCrjizhajRc3rS9ur_Bo548ovVaHMAo_4Cpp3WZPKr4_N0o_dBwQY76Dv8teFDzhXmDHf--S-elA-psdKtTSrj7WpGbLTje4gg_EsuLBMns7T4s89oImXio_29ep_sYCdi5-GmX231uQKMIKAQTIeaxDC-FxPTxRMIx0tJOlp_hKcCgOM0q0FjjIRnBIW4xFUBY0MPs2cv2YKRXqoQbOR1svzRU56bN4f_v7V4Ao91ID3086xaaj1a6MvOvlGHbZ74fNBNWLanA1oPzumiOqA108l7YdS5SmmN-g9e0rZ3N2M98UjwYesInU6gUx_p1ACeFVzVdZXKltwdh1Ews63DsC3BuZmpyDTYRhdt0iGsB7xUZO14iAl9DNnKxqi48.gTD8pQvqRABVXOnHfddLFg');
  await page.goto('https://fss-dev.admiralty.co.uk/#/search');
  await page.getByLabel('Search').click();
});