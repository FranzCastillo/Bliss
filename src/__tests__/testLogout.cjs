const {By, Key, Builder, until} = require("selenium-webdriver");
require("chromedriver");


login_test = async function () {
    let driver = new Builder().forBrowser("chrome").build();

    try {
        await driver.get("http://bliss-three.vercel.app/");
        // Inputs credentials and logs in
        await driver.findElement(By.name("email")).sendKeys("cas21562@uvg.edu.gt", Key.TAB);
        await driver.findElement(By.name("password")).sendKeys("cas21562", Key.ENTER);

        // // Checks if the user is logged in
        // let slider = await driver.findElement(By.className("carousel-root photo-carrousel"));
        // if (slider) {
        //     console.log("LOGIN TEST PASSED");
        // }

        await driver.wait(until.elementLocated(By.id("logout")));
        await driver.findElement(By.id("logout")).click()


    } catch(error) {
        console.log("LOGIN TEST FAILED");
        console.log("ERROR: " + error)
    }

    finally {
        setTimeout(() => {
            driver.quit()
        }, 5000)
    }
}

login_test();