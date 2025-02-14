import { test, expect } from 'playwright/test';
import { HomePage } from '../pages/homepage';

test.describe('Home Page Tests', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateTo();
    });

    test('Initial page elements should display correctly', async () => {
        await expect(homePage.hotelDescription).toContainText('Welcome to Shady Meadows');
        await expect(homePage.hotelDescription).toBeVisible();
        await expect(homePage.mainImage).toBeVisible();
    });

    test('Each room option has an image and info', async () => {
        const roomOptionsCount = await homePage.getAllRoomOptionsCount();
        await expect(roomOptionsCount).toBeGreaterThan(0); // Assert that the count is greater than 0
        const imagesResult = await homePage.allRoomOptionsHaveImages();
        await expect(imagesResult).toBeTruthy();
    });
});