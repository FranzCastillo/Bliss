const { By, Key, Builder, until } = require("selenium-webdriver");
require("chromedriver");
require('dotenv').config(); // Load environment variables from .env.local

const user = process.env.USER;
const pass = process.env.PASS;

module.exports = {
    login_test: async function () {
        let driver = new Builder().forBrowser("chrome").build();

        let error = null;
        let passed = false;
        try {
            await driver.get("https://bliss-three.vercel.app/");
            await driver.wait(until.elementLocated(By.name("email")), 10000);
            // Inputs credentials and logs in
            await driver.findElement(By.name("email")).sendKeys(user, Key.TAB);
            await driver.findElement(By.name("password")).sendKeys(pass, Key.ENTER);

            // Checks if the user is logged in
            const carousel = await driver.wait(until.elementLocated(By.className('photo-carrousel')), 10000);
            await driver.wait(until.elementIsVisible(carousel), 10000);
            passed = true;
        } catch (e) {
            error = e;
        } finally {
            driver.quit();
        }
        return { passed, error };
    },

    product_navigation_test: async function () {
        let driver = new Builder().forBrowser("chrome").build();

        let error = null;
        let passed = false;

        try {
            await driver.get("https://bliss-three.vercel.app");
            await driver.wait(until.elementLocated(By.name("email")), 10000);
            await driver.findElement(By.name("email")).sendKeys(user, Key.TAB);
            await driver.findElement(By.name("password")).sendKeys(pass, Key.ENTER);

            const productsTab = await driver.wait(until.elementLocated(By.id('prods')), 10000);
            await driver.wait(until.elementIsVisible(productsTab), 10000);
            await productsTab.click();

            const product = await driver.wait(until.elementLocated(By.id("1")), 10000);
            await driver.wait(until.elementIsVisible(product), 10000);
            await product.click();

            const addToCartButton = await driver.wait(until.elementLocated(By.id('add-to-cart-button')), 10000);
            await driver.wait(until.elementIsVisible(addToCartButton), 10000);
            await addToCartButton.click();

            passed = true;
        } catch (e) {
            error = e;
        } finally {
            driver.quit();
        }
        return { passed, error };
    }
};