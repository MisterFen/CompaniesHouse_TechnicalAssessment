import { Page, Locator } from 'playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('');
  }

  async isImageLoaded(locator: Locator): Promise<boolean> {
    return await locator.evaluate((img: HTMLImageElement) => {
      const isComplete = img.complete;
      console.log("ARGH");
      return img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;
    });
}
}