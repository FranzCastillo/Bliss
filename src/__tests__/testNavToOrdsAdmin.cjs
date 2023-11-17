const {By, Key, Builder, until} = require("selenium-webdriver");
require("chromedriver");


login_test = async function () {
    let driver = new Builder().forBrowser("chrome").build();

    try {
        await driver.get("http://bliss-three.vercel.app/");
        // Inputs credentials and logs in
        await driver.findElement(By.name("email")).sendKeys("cas21562@uvg.edu.gt", Key.TAB);
        await driver.findElement(By.name("password")).sendKeys("cas21562", Key.ENTER);

        
        // Searches until the element "ords" is found
        await driver.wait(until.elementLocated(By.id("ords")));

        // Clicks the element "ords"
        await driver.findElement(By.id("ords")).click()


    } catch(error) { //If an error occurs is printed
        console.log("LOGIN TEST FAILED");
        console.log("ERROR: " + error)
    }

    // Quits with a small pause
    finally {
        setTimeout(() => {
            driver.quit()
        }, 5000)
    }
}

// Calls the function
login_test();