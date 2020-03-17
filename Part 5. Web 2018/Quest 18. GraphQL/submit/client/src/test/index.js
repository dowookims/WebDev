const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch ({headless: false });
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:8080', { waitUntil: 'documentloaded' });
    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        }
    });
    console.log("Dimensions : ", dimensions);
    await browser.close();
})();