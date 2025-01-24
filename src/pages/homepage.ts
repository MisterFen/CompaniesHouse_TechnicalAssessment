import { Page, Locator } from 'playwright/test';
import { BasePage } from '../pages/basepage'

export class HomePage extends BasePage{

    public hotelDescription = this.page.locator('.hotel-description');
    public mainImage = this.page.getByRole('img', { name: 'Hotel logoUrl' });
    // public x = this.page.getByLabel()
    public roomOptions = this.page.locator('.hotel-room-info');
    public roomOptions2 = this.page.locator('hotel-room-info');

    constructor(page: Page) {
        super(page)
    }

    async getEntryCount(): Promise<number> {
        return await this.roomOptions.count();
    }
    
    async isImagePresentInEntry(index: number): Promise<boolean> {
        const image = this.roomOptions.nth(index).locator('img');
        return await image.isVisible();
    }
    
    async isTextPresentInEntry(index: number): Promise<boolean> {
        const text = this.roomOptions.nth(index).locator('p');
        const textContent = await text.textContent();
        return textContent !== null && textContent.trim().length > 0;
    }

    async verifyRoomOptionsCount(): Promise<void> {
        // var testy = this.page.locator('.hotel-room-info');
        // const county = testy.count();
        // console.log(`Room options found: ${county}`);
        // if (county !== 4) {
        //     throw new Error(`Expected 4 room options, but found ${county}`);
        // }
    }
}