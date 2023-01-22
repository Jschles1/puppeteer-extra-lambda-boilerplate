const chromium = require('chrome-aws-lambda');
const { addExtra } = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

export async function handler(event) {
    const puppeteer = addExtra(chromium.puppeteer as any);
    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    await browser.close();

    const response = {
        statusCode: 200,
        body: 'Hello from Lambda!',
    };

    return response;
}
