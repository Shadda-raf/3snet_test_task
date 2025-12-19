import { test, expect } from '@playwright/test';

const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://habr.com/');
    const title = await page.title();
    console.log(`Заголовок страницы: ${title}`);
    await browser.close();
})();