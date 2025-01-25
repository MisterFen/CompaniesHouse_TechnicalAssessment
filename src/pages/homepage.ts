import { Page, Locator } from 'playwright/test';
import { BasePage } from '../pages/basepage';

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public hotelDescription: Locator = this.page.locator('.hotel-description');
    public mainImage: Locator = this.page.getByRole('img', { name: 'Hotel logoUrl' });
    public roomOptions: Locator = this.page.locator('.hotel-room-info');
    //Contact Form locators
    public contactFormName: Locator = this.page.getByTestId('ContactName');
    public contactFormEmail: Locator = this.page.getByTestId('ContactEmail');
    public contactFormPhone: Locator = this.page.getByTestId('ContactPhone');
    public contactFormSubject: Locator = this.page.getByTestId('ContactSubject');
    public contactFormDescription: Locator = this.page.getByTestId('ContactDescription');
    public contactFormSubmitButton: Locator = this.page.getByRole('button', { name: 'Submit' })
    public contactFormErrorBox: Locator = this.page.locator('.contact').locator('.alert');
    public contactFormSubmissionMessage: Locator = this.page.locator('.contact').locator('.col-sm-5').nth(0);
    public contactFormSubmissionMessageTitle = this.contactFormSubmissionMessage.getByRole("heading");

    async getAllRoomOptions() {
        const allRoomOptions = await this.roomOptions;
        return allRoomOptions;
    }

    async getAllRoomOptionsCount(): Promise<number> {
        await this.page.waitForSelector('.hotel-room-info', { state: 'visible' }); // Wait for the elements to become visible
        const allRoomOptions = await this.getAllRoomOptions();
        return await allRoomOptions.count();
    }

    async allRoomOptionsHaveImages(): Promise<boolean> {
        await this.page.waitForSelector('.hotel-room-info', { state: 'visible' }); // Wait for the elements to become visible
        // Wait for room options to be visible
        const allRoomOptions = await this.getAllRoomOptions();
        const count = await allRoomOptions.count();
        for (let i = 0; i < count; i++) {
            // Get the specific room option by index
            const roomOption = allRoomOptions.nth(i);
    
            // Check if the image exists inside the room option
            const hasImage = await roomOption.getByRole("img").isVisible();
    
            // If any room option does not have an image, return false
            if (!hasImage) {
                return false;
            }
        
        }
        return true;
    }
}