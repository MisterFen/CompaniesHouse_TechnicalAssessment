import { test, expect } from 'playwright/test';
import { HomePage } from '../pages/homepage';

test.describe('Hotel Rooms Tests', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateTo();
    });

    test('Book a hotel room @critical-path', async () => {
        //WIP. TODO
        const roomOptionsCount = await homePage.getAllRoomOptionsCount();
        if (roomOptionsCount === 0) {
            console.log('No rooms available.');
            return;
        }
        
        for (let i = 0; i < roomOptionsCount; i++) {
            const room = await homePage.roomOptions.nth(i);

            // Verify room image
            await homePage.verifyRoomImage(room);
            // Verify room button is visible
            await homePage.verifyRoomButton(room);
            // Click the 'Book' button to open the calendar
            await homePage.clickBookButton(room);
            // Verify the calendar modal appears
            await homePage.verifyCalendarIsVisible(room);
            await homePage.selectDatesFromCalendar(room, "10", "15");

            // // Verify the booking form is visible
            // await hotelRoomsPage.verifyBookingFormIsVisible();

            // // Fill the booking form with valid data
            // await hotelRoomsPage.fillBookingForm('John Doe', 'john.doe@example.com');

            // // Submit the form
            // await hotelRoomsPage.submitBookingForm();

            // // Optional: Verify the confirmation message or the next page
            // const confirmationMessage = await page.locator('.confirmation-message');
            // await expect(confirmationMessage).toBeVisible();
        }
    });
});