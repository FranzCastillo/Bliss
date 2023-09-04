const {By, Key, Builder, until} = require("selenium-webdriver");
require("chromedriver");

login_test = async function () {
    let driver = new Builder().forBrowser("chrome").build();

    try {
        await driver.get("http://localhost:5173/");
        await driver.wait(until.elementLocated(By.name("email")), 10000);
        // Inputs credentials and logs in
        await driver.findElement(By.name("email")).sendKeys("cas21562@uvg.edu.gt", Key.TAB);
        await driver.findElement(By.name("password")).sendKeys("cas21562", Key.ENTER);

        // Checks if the user is logged in
        const carousel = await driver.wait(until.elementLocated(By.className('photo-carrousel')), 10000);
        await driver.wait(until.elementIsVisible(carousel), 10000);
        console.log("LOGIN TEST PASSED");

    } catch(error) {
        console.log("LOGIN TEST FAILED BY ERROR");
        console.log("ERROR: " + error)
    } finally {
        driver.quit();
    }
}

product_navigation_test = async () => {
    let driver = new Builder().forBrowser("chrome").build();

    try {
        await driver.get("http://localhost:5173/");
        await driver.wait(until.elementLocated(By.name("email")), 10000);
        await driver.findElement(By.name("email")).sendKeys("cas21562@uvg.edu.gt", Key.TAB);
        await driver.findElement(By.name("password")).sendKeys("cas21562", Key.ENTER);

        const productsTab = await driver.wait(until.elementLocated(By.id('navbar-button-products')), 10000);
        await driver.wait(until.elementIsVisible(productsTab), 10000);
        await productsTab.click();
        console.log("PRODUCTS TAB CLICKED");

        const product = await driver.wait(until.elementLocated(By.id("1")), 10000);
        await driver.wait(until.elementIsVisible(product), 10000);
        await product.click();
        console.log("PRODUCT CLICKED");

        const addToCartButton = await driver.wait(until.elementLocated(By.id('add-to-cart-button')), 10000);
        await driver.wait(until.elementIsVisible(addToCartButton), 10000);
        await addToCartButton.click();
        console.log("PRODUCTS TAB CLICKED");
        console.log("PRODUCT NAVIGATION AND ADD TO CART TEST PASSED");3

    } catch(error) {
        console.log("NAVIGATION TEST FAILED BY ERROR");
        console.log("ERROR: " + error)
    } finally {
        setTimeout(() => {
            driver.quit();
        }, 10_000);
    }
}

// login_test();
product_navigation_test();