// Screenshots for docs/guide, from index.html served with `python -m http.server 4181` in the repository root.
// Firefox, English, muted. Run by hand when the interface changes: `node scripts/screenshots.mjs`.
// Needs Playwright (not a dependency of the project): set PLAYWRIGHT to the path of its index.mjs.

const { firefox } = await import(process.env.PLAYWRIGHT ?? '@playwright/test');

const url = process.env.URL ?? 'http://127.0.0.1:4181/';
const out = 'docs/guide/img/';
const browser = await firefox.launch({ firefoxUserPrefs: { 'media.volume_scale': '0.0' } });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' })).newPage();

await page.goto(url);
await page.waitForTimeout(1500);
await page.screenshot({ path: `${out}start.png` });

await page.locator('input[type=file]').first().setInputFiles('test/test-2997.mp4');
await page.waitForTimeout(3000);
await page.keyboard.press('k');
const names = [['12', 'Opening'], ['12.5', 'Blackout'], ['13', 'Sunrise']];
for (let i = 0; i < names.length; i++) {
  for (let j = 0; j < 12; j++) await page.keyboard.press('ArrowRight');
  await page.keyboard.press('c');
  await page.getByRole('textbox', { name: 'Cue' }).nth(i).waitFor();
}
for (const [i, [cue, title]] of names.entries()) {
  await page.getByRole('textbox', { name: 'Cue' }).nth(i).fill(cue);
  await page.getByRole('textbox', { name: 'Title' }).nth(i).fill(title);
}
await page.evaluate(() => document.activeElement.blur());
await page.waitForTimeout(500);
await page.screenshot({ path: `${out}workspace.png` });

await page.getByRole('button', { name: 'Open', exact: true }).first().click();
await page.waitForTimeout(800);
await page.screenshot({ path: `${out}lightbox.png` });
await page.keyboard.press('Escape');

await page.getByRole('button', { name: 'Options' }).click();
await page.waitForTimeout(800);
await page.getByRole('dialog', { name: 'Options' }).screenshot({ path: `${out}options.png` });

await browser.close();
