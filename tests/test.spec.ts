import { test, expect, Locator } from '@playwright/test';
import { EventCalendarRuPage } from '../Pages/ru.eventcalendar.spec';

test('has title ru page', async ({ page }) => {
  const ruEvent = new EventCalendarRuPage(page);
  await ruEvent.goto();
  await expect(page).toHaveTitle('Конструктор календаря мероприятий - 3Snet');
});

test('has countries ru page', async({page}) =>{
  const ruEvent = new EventCalendarRuPage(page);
  await ruEvent.goto();
  await expect(ruEvent.countrySelector).toContainText('Выбрать все'); //список состоит из одной строки
});

test('Select a topic ru page', async ({ page }) => {  
  const ruEvent = new EventCalendarRuPage(page);
  await ruEvent.goto();
  await expect(ruEvent.countrySelector).toBeVisible();
  const values = await page.evaluate(() => {
    const checkboxes = document.querySelectorAll('.checkselect')[0].querySelectorAll('input[type="checkbox"]'); // выбор чекбоксов только для элемента топиков
    return Array.from(checkboxes).map(checkbox => ({
      value: (checkbox as HTMLInputElement).value,
      label: (checkbox as HTMLInputElement).nextElementSibling?.innerHTML
    }));
  });
const expectedValues = [                              //создаем массив объектов со значениями дропдауна выбора тем
  { value: 'on', label: 'Выбрать все' },
  { value: '10958', label: 'Affiliate' },
  { value: '10963', label: 'Blockchain' },
  { value: '10961', label: 'Development' },
  { value: '10964', label: 'Igaming' },
  { value: '10960', label: 'Internet Marketing' },
  { value: '10959', label: 'SEO' },
  { value: '10962', label: 'Финтех' }
];

  expect(expectedValues).toEqual(values);
  console.log('Все значения чекбоксов:', values);
});

test('all topics selected ru page', async({page}) =>{
  const ruEvent = new EventCalendarRuPage(page);
  await ruEvent.goto();
  await expect(ruEvent.topicSelector).toBeVisible();
  await ruEvent.topicSelector.click();
  await ruEvent.topicSelector.getByText('Выбрать все').click();
  await expect(ruEvent.codeField).toContainText('event_type=on')
});

test('some topics selected ru page', async({page}) =>{
  const ruEvent = new EventCalendarRuPage(page);
  await ruEvent.goto();
  await expect(ruEvent.topicSelector).toBeVisible();
  await ruEvent.topicSelector.click();
  await ruEvent.topicSelector.getByText('Affiliate').click();
  await ruEvent.topicSelector.getByText('Development').click();
  await expect(ruEvent.codeField).toContainText('event_type=10958,10961')
});

test('copy button save result to a clipboard', async ({ page, context }) => { //проблема с разрешениями браузера 
  const ruEvent = new EventCalendarRuPage(page);
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await ruEvent.goto();
  const expectedText = await ruEvent.codeField.innerHTML();
  await ruEvent.copyCodeBtn.click();
  const clipboardText = (await page.evaluate('navigator.clipboard.readText()') as string).replaceAll(/&/g, "&amp;").replaceAll(/>/g, "&gt;").replaceAll(/</g, "&lt;");
  console.log("clipboard", clipboardText);
  console.log("expected", expectedText);
  expect(clipboardText).toEqual(expectedText);
});

test('all radiobuttons is active', async ({ page }) => {
  const ruEvent = new EventCalendarRuPage(page);
  await ruEvent.goto();
  await ruEvent.greenThemeRbParent.click();
  await expect(ruEvent.codeField).toContainText('theme=green');
  await ruEvent.blueThemeRbParent.click();
  await expect(ruEvent.codeField).toContainText('theme=blue');
  await ruEvent.turquoiseThemeRbParent.click();
  await expect(ruEvent.codeField).toContainText('theme=turquoise');
  await ruEvent.purpleThemeRbParent.click();
  await expect(ruEvent.codeField).toContainText('theme=purple');
});

test('width field is editable ru page', async ({ page }) => {
  const ruEvent = new EventCalendarRuPage(page);
  await ruEvent.goto();
  await ruEvent.widthField.click();
  await ruEvent.widthField.fill('780');
  await ruEvent.countrySelector.click();
  await expect(ruEvent.codeField).toContainText('width="780"');
});

test('height field is editable ru page', async ({ page }) => {
  const ruEvent = new EventCalendarRuPage(page);
  await ruEvent.goto();
  await ruEvent.heightField.click();
  await ruEvent.heightField.fill('720');
  await ruEvent.countrySelector.click();
  await expect(ruEvent.codeField).toContainText('height="720"');
});

test('width on full container ru page', async ({ page }) => {
  const ruEvent = new EventCalendarRuPage(page);
  await ruEvent.goto();
  await ruEvent.widthContainerCheckbox.click();
  await expect(ruEvent.codeField).toContainText('width="100%"');
});

test('height on full container ru page', async ({ page }) => {
  const ruEvent = new EventCalendarRuPage(page);
  await ruEvent.goto();
  await ruEvent.heightContainerCheckbox.click();
  await expect(ruEvent.codeField).toContainText('height="100%"');
});

test('width drag component ru page', async ({ page }) => {
  const ruEvent = new EventCalendarRuPage(page);
  await ruEvent.goto();
  await expect(ruEvent.codeField).toContainText('width="230"');
  await ruEvent.widthRangeInput.dragTo(ruEvent.widthRangeInput, { targetPosition: { x: 100, y: 0 } });
  await expect(ruEvent.codeField).toContainText('width="570"');
});

test('height drag component ru page', async ({ page }) => {
  const ruEvent = new EventCalendarRuPage(page);
  await ruEvent.goto();
  await expect(ruEvent.codeField).toContainText('height="240"');
  await ruEvent.heightRangeInput.dragTo(ruEvent.heightRangeInput, { targetPosition: { x: 150, y: 0 } });
  await expect(ruEvent.codeField).toContainText('height="550"');
});

test('generate preview button ru page', async ({ page }) => {
  const ruEvent = new EventCalendarRuPage(page); 
  await ruEvent.goto();
  await ruEvent.widthField.click();
  await ruEvent.widthField.fill('700');
  await ruEvent.heightField.click();
  await ruEvent.heightField.fill('500');
  await ruEvent.generatePreviewBtn.click();
  await expect(ruEvent.iframeLocator).toBeVisible();
  await expect(ruEvent.previewField).not.toHaveCount(0);
  const iframeWidth = await ruEvent.iframeLocator.evaluate(frame => frame.offsetWidth);
  const iframeHeight = await ruEvent.iframeLocator.evaluate(frame => frame.offsetHeight);
  
  expect(iframeHeight).toEqual(500);
  expect(iframeWidth).toEqual(700);
});

test('changing language ru page', async ({ page }) => {
  const ruEvent = new EventCalendarRuPage(page);
  await ruEvent.goto();
  await ruEvent.languageSwitcher.click();
  await page.getByRole('link', { name: 'English EN' }).click();
  await expect(page.url().toString()).toEqual('https://dev.3snet.info/en/eventswidget/')
});

test('promocodes-carousel ru page', async ({ page }) => {
  const ruEvent = new EventCalendarRuPage(page);
  await ruEvent.goto();
  await page.evaluate(() => {
  window.scrollTo(0, document.documentElement.scrollHeight);
});
  const expectedText = (await ruEvent.promocodesTrak.innerHTML()).toString();
  const classNameText = 'promocode-item'
  expect(expectedText).toContain(classNameText)
});