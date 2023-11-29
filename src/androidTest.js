const { _android: android } = require('playwright');

(async () => {
    try {
        // Connect to the Android device
        const devices = await android.devices();
        if (devices.length === 0) {
            throw new Error("No Android devices found.");
        }
        const device = devices[0];
        console.log(`Using device: ${device.model()}`);

        // Launch the browser on the Android device
        const context = await device.launchBrowser();
        const page = await context.newPage();

        // Adjust the URL to where your local server is hosting the webpage
        await page.goto('http://192.168.1.29:8080/src/playwrightTest.html');

        // Select the input element
        const inputSelector = '#keyTester';
        await page.click(inputSelector);

        // Simulate key events (Space or Backspace)
        await page.keyboard.press('Space');

        // Keep the browser open for observation
        await new Promise(resolve => setTimeout(resolve, 10000));

        await context.close();
    } catch (error) {
        console.error('Error running Playwright Android script:', error);
    }
})();
