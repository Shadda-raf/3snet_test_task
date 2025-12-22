import { expect, type Locator, type Page } from '@playwright/test';

export class EventCalendarRuPage{

    readonly page: Page;
    readonly topicSelector: Locator;
    readonly countrySelector: Locator;
    readonly widthField: Locator;
    readonly widthRangeInput: Locator;
    readonly widthContainerCheckbox: Locator;
    readonly heightField: Locator;
    readonly heightRangeInput: Locator;
    readonly heightContainerCheckbox: Locator;
    readonly blueThemeRb: Locator;
    readonly greenThemeRb: Locator;
    readonly turquoiseThemeRb: Locator;
    readonly purpleThemeRb: Locator;
    readonly codeField: Locator;
    readonly copyCodeBtn: Locator;
    readonly generatePreviewBtn: Locator;
    readonly previewField:Locator;
    readonly promocodesTrak: Locator;
    readonly languageSwitcher: Locator;
    readonly blueThemeRbParent: Locator;
    readonly greenThemeRbParent: Locator;
    readonly turquoiseThemeRbParent: Locator;
    readonly purpleThemeRbParent: Locator;
    readonly iframeLocator:Locator;

    constructor(page: Page) {
    this.page = page;
    this.languageSwitcher = page.locator('#current-language');
    this.topicSelector = page.locator('.checkselect').first();    
    this.countrySelector = page.locator('.checkselect', {hasText: 'Все страны'}); 
    this.widthField = page.locator('input[name="width"]');
    this.widthRangeInput = page.locator('#width-range');
    this.widthContainerCheckbox = page.getByText('на всю ширину контейнера');           
    this.heightField = page.locator('input[name="height"]');
    this.heightRangeInput = page.locator('#height-range');
    this.heightContainerCheckbox = page.getByText('на всю высоту блока')
    this.blueThemeRb = page.locator('input[type="radio"][value="blue"]');
    this.blueThemeRbParent = page.locator('.radio').filter({ has: this.blueThemeRb });
    this.greenThemeRb= page.locator('input[type="radio"][value="green"]');
    this.greenThemeRbParent = page.locator('.radio').filter({ has: this.greenThemeRb });
    this.turquoiseThemeRb= page.locator('input[type="radio"][value="turquoise"]');
    this.turquoiseThemeRbParent = page.locator('.radio').filter({ has: this.turquoiseThemeRb });
    this.purpleThemeRb= page.locator('input[type="radio"][value="purple"]');
    this.purpleThemeRbParent = page.locator('.radio').filter({ has: this.purpleThemeRb });
    this.codeField = page.locator('#code');
    this.copyCodeBtn = page.locator('#code-copy-button');
    this.generatePreviewBtn = page.locator('button', {hasText: 'Сгенерировать превью'});
    this.previewField = page.locator('#preview');
    this.promocodesTrak = page.locator('.promocodes-carousel');
    this.iframeLocator = page.locator('iframe[id="3snet-frame"]');
    }


    async goto() {
        await this.page.goto('https://dev.3snet.info/eventswidget/');
    }
    

}


