const puppeteer = require('puppeteer');
const db = require('./db');

const scrapeTargets = [
    { name: 'Apples', url: 'https://www.example-grocery-site.com/products/apples', selector: '.price-tag' },
    { name: 'Tomatoes', url: 'https://www.another-market.com/produce/tomato', selector: '#product-price' },
];

async function updatePriceInDB(productName, price) {
    console.log(`Updating DB for ${productName} with price ${price}`);
    try {
        const query = `
            INSERT INTO prices (product_name, price)
            VALUES ($1, $2)
            ON CONFLICT (product_name) DO UPDATE SET price = EXCLUDED.price;
        `;
        await db.query(query, [productName, price]);
        console.log(`✅ Successfully updated ${productName}.`);
    } catch (error) {
        console.error(`❌ Failed to update DB for ${productName}:`, error);
    }
}

async function scrapeWebsite(target) {
    console.log(`Scraping ${target.url} for ${target.name}...`);
    let browser;
    try {
        browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        await page.goto(target.url, { waitUntil: 'networkidle2' });
        await page.waitForSelector(target.selector);

        const priceText = await page.$eval(target.selector, el => el.textContent);
        const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));

        if (!isNaN(price)) {
            await updatePriceInDB(target.name, price);
        } else {
            console.warn(`Could not parse a valid price for ${target.name} from text: "${priceText}"`);
        }
    } catch (error) {
        console.error(`❌ Failed to scrape ${target.name} from ${target.url}:`, error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

async function runScraper() {
    console.log('--- Starting Price Scrape Job ---');
    await Promise.all(scrapeTargets.map(target => scrapeWebsite(target)));
    console.log('--- Price Scrape Job Finished ---');
    process.exit(0);
}

runScraper();