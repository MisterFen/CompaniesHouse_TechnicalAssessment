import { test, expect } from 'playwright/test';
import { HomePage } from '../pages/homepage';

test.describe('Contact Form Tests', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateTo();
    });

    test('Name field validates correctly', async () => {
        const { contactFormSubmitButton, contactFormErrorBox, contactFormName } = homePage;
    
        // Empty Name
        await contactFormSubmitButton.click();
        await expect(contactFormErrorBox).toContainText("Name may not be blank");
    
        // Valid Name
        await contactFormName.fill("Jim");
        await contactFormSubmitButton.click();
        await expect(contactFormErrorBox).not.toContainText("Name may not be blank");
    });

    test.describe('Email Field Validation', () => {
      test.describe('Invalid Emails', () => {
        const invalidEmails = [
          { email: '', error: "Email may not be blank" },
          { email: 'testemail.com', error: "must be a well-formed email address" },
          { email: 'test@email@com', error: "must be a well-formed email address" },
          { email: 'test@email', error: "must be a well-formed email address" },
          { email: '😀@gmail.com', error: "must be a well-formed email address" },
        ];
    
        for (const { email, error } of invalidEmails) {
          test(`should show error for invalid email: "${email}"`, async () => {
            const { contactFormSubmitButton, contactFormErrorBox, contactFormEmail } = homePage;
    
            await contactFormEmail.fill(email);
            await contactFormSubmitButton.click();
            await expect.soft(contactFormErrorBox).toContainText(error);
          });
        }
      });
    
      test.describe('Valid Emails', () => {
        const validEmails = [
          { email: 'email@gmail.com', description: 'standard email' },
          { email: 'test.email+alex@leetcode.com', description: 'email with plus sign' },
          { email: 'user.name@domain.co', description: 'email with period in name' },
        ];
    
        for (const { email, description } of validEmails) {
          test(`should not show errors for valid email (${description})`, async () => {
            const { contactFormSubmitButton, contactFormErrorBox, contactFormEmail } = homePage;
    
            await contactFormEmail.fill(email);
            await contactFormSubmitButton.click();
            await expect(contactFormErrorBox).not.toContainText("must be a well-formed email address");
            await expect(contactFormErrorBox).not.toContainText("Email may not be blank");
          });
        }
      });
    });

    test.describe('Phone Field Validation Scenarios', () => {
      test.describe('Invalid Phone Numbers', () => {
        const invalidPhoneNumbers = [
          { phoneNumber: '', errors: ["Phone may not be blank"] },
          { phoneNumber: 'a', errors: ["Phone must be between 11 and 21 characters."] },
          { phoneNumber: '0', errors: ["Phone must be between 11 and 21 characters."] },
          { phoneNumber: '0712345678', errors: ["Phone must be between 11 and 21 characters."] },
          { phoneNumber: 'asdfghjkl11', errors: ["Phone must be between 11 and 21 characters."] },
          { phoneNumber: '0712345678901234567891', errors: ["Phone must be between 11 and 21 characters."] },
        ];
    
        for (const { phoneNumber, errors } of invalidPhoneNumbers) {
          test(`should show errors for invalid phone number: "${phoneNumber}"`, async () => {
            const { contactFormSubmitButton, contactFormErrorBox, contactFormPhone } = homePage;
    
            await contactFormPhone.fill(phoneNumber);
            await contactFormSubmitButton.click();
    
            for (const error of errors) {
              await expect.soft(contactFormErrorBox).toContainText(error);
            }
          });
        }
      });
    
      test.describe('Valid Phone Numbers', () => {
        const validPhoneNumbers = [
          { phoneNumber: '07712345678', description: 'standard UK mobile number' },
          { phoneNumber: '+447712345678', description: 'international number with area code' },
        ];
    
        for (const { phoneNumber, description } of validPhoneNumbers) {
          test(`should not show errors for valid phone number (${description})`, async () => {
            const { contactFormSubmitButton, contactFormErrorBox, contactFormPhone } = homePage;
    
            await contactFormPhone.fill(phoneNumber);
            await contactFormSubmitButton.click();
    
            await expect(contactFormErrorBox).not.toContainText("Phone may not be blank");
            await expect(contactFormErrorBox).not.toContainText("Phone must be between 11 and 21 characters.");
          });
        }
      });
    });

    test.describe('Subject Field Validation Scenarios', () => {
      let homePage: HomePage;
    
      test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateTo();
      });
    
      test.describe('Invalid subjects', () => {
        const invalidSubjects = [
          { value: '', errors: ["Subject may not be blank", "Subject must be between 5 and 100 characters."] },
          { value: 'H', errors: ["Subject must be between 5 and 100 characters."] },
          { value: 'Hiya', errors: ["Subject must be between 5 and 100 characters."] },
          { value: 'HelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorld1', errors: ["Subject must be between 5 and 100 characters."] },
        ];
    
        for (const { value, errors } of invalidSubjects) {
          test(`should show errors for subject: "${value}"`, async () => {
            const { contactFormSubmitButton, contactFormErrorBox, contactFormSubject } = homePage;
    
            await contactFormSubject.fill(value);
            await contactFormSubmitButton.click();
    
            for (const error of errors) {
              await expect.soft(contactFormErrorBox).toContainText(error);
            }
          });
        }
      });
    
      test.describe('Valid subjects', () => {
        const validSubjects = [
          { value: 'Hello', description: 'minimum length (5 characters)' },
          { value: 'HelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorld', description: 'maximum length (100 characters)' },
        ];
    
        for (const { value, description } of validSubjects) {
          test(`should not show errors for valid subject (${description})`, async () => {
            const { contactFormSubmitButton, contactFormErrorBox, contactFormSubject } = homePage;
    
            await contactFormSubject.fill(value);
            await contactFormSubmitButton.click();
    
            await expect.soft(contactFormErrorBox).not.toContainText("Subject may not be blank");
            await expect.soft(contactFormErrorBox).not.toContainText("Subject must be between 5 and 100 characters.");
          });
        }
      });
    });
});