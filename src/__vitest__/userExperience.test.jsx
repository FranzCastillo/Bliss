const { Builder } = require("selenium-webdriver");
import {describe, test, expect} from 'vitest'
const { login_test, product_navigation_test } = require("./SeleniumTests/selenium.cjs");

const driver = new Builder().forBrowser("chrome").build();

describe("Login Test", () => {
    test("should log in successfully", async () => {
        const {passed, error} =  await login_test();
        if (error !== null) {
            console.log(error);
        }
        expect(passed).toBe(true);
    });

    test("should navigate to a product and add it to the cart", async () => {
        const {passed, error} = await product_navigation_test();
        expect(passed).toBe(true);
    });
});