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

    async verifyRoomImage(room: Locator): Promise<boolean> {
        const hasImage = await room.locator('img.img-responsive.hotel-img').isVisible();
        return hasImage;
    }

    async verifyRoomButton(room: Locator): Promise<boolean> {
        const hasButton = await this.getBookButton(room).isVisible();
        return hasButton;
    }

    async verifyCalendarIsVisible(room: Locator): Promise<boolean> {
        const hasCalendar = await room.locator('.rbc-calendar').isVisible();
        return hasCalendar;
    }

    async selectDatesFromCalendar(room: Locator, from: string, to: string): Promise<void> {
        // Wait for the calendar to be visible
        await this.verifyCalendarIsVisible(room);
    
        //TESTING:
        // const testFrom = this.page.locator('.hotel-room-info').locator('.rbc-calendar').locator('.rbc-date-cell:not(.rbc-off-range)').filter({hasText: "10"});
        // const testTo = this.page.locator('.hotel-room-info').locator('.rbc-calendar').locator('.rbc-date-cell:not(.rbc-off-range)').filter({hasText: "12"});
        
        // Get all date cells in the calendar
        const allDates = this.getRoomCalendar(room).locator('.rbc-date-cell:not(.rbc-off-range)');
        const fromDateCell = allDates.filter({hasText: from});
        const toDateCell = allDates.filter({hasText: to}).first();

        // Ensure both dates exist
        if (!(await fromDateCell.isVisible())) {
            throw new Error(`Start date "${from}" not found in the calendar.`);
        }
        if (!(await toDateCell.isVisible())) {
            throw new Error(`End date "${to}" not found in the calendar.`);
        }
    
        // Drag from the "from" date to the "to" date
        await fromDateCell.dragTo(toDateCell);
    }
    

    async clickBookButton(room: Locator): Promise<void> {
        await this.getBookButton(room).click();
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

    getBookButton(room: Locator): Locator {
        return room.getByRole('button', { name: /Book this room/i });
    }   

    getRoomCalendar(room: Locator): Locator {
        return room.locator('.rbc-calendar');
    }   
}