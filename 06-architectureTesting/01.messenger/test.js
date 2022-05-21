const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const mockData = {
    "-LxHVtajG3N1sU714pVj":{
        "author":"Spami",
        "content":"Hello, are you there?"},
        "-LxIDxC-GotWtf4eHwV8":{
            "author":"Garry",
            "content":"Yep, whats up :?"},
            "-LxIDxPfhsNipDrOQ5g_":{
                "author":"Spami",
                "content":"How are you? Long time no see? :)"},
                "-LxIE-dM_msaz1O9MouM":{
                    "author":"George",
                    "content":"Hello, guys! :))"},
                    "-LxLgX_nOIiuvbwmxt8w":{
                        "author":"Spami",
                        "content":"Hello, George nice to see you! :)))"},
                        "2a1dd015-22cb-4425-9116-f6ac6a6c1f6b":{
                            "author":"az",
                            "content":"hi",
                            "_id":"2a1dd015-22cb-4425-9116-f6ac6a6c1f6b"
                        }
};

function json(data){
    return {
        status: 200,
        headers: {

            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'

        },
        
        body: JSON.stringify(data)

    }
}

describe('Tests', async function() {
    this.timeout(5000);
     let page, browser;

     before (async () => {
         browser = await chromium.launch();
     });

     after (async () => {
         await browser.close();
     });

     beforeEach(async () => {
         page = await browser.newPage();
     });

     afterEach(async () => {
         await page.close();
     });

     it ('loads messages', async() => {
        await page.route('**/jsonstore/messenger*', (route) => {
            route.fulfill(json(mockData));
        });
        await page.goto('http://localhost:5500');

        await page.click('text=Refresh');
        const content = await page.$eval('textarea[id="messages"]', (m) => m.value);

        expect(content).to.contains(`Spami: Hello, are you there?`);
        expect(content).to.contains(`Garry: Yep, whats up :?`);
        expect(content).to.contains(`Spami: How are you? Long time no see? :)`);
        expect(content).to.contains(`George: Hello, guys! :))`);
        expect(content).to.contains(`Spami: Hello, George nice to see you! :)))`);

     });

     it('sends message', async () => {
        await page.goto('http://localhost:5500');
        await page.fill('#author', 'User');
        await page.fill('#content', 'message');
        await page.click('text=Send');
        await page.click('text=Refresh');

        const content = await page.$eval('textarea[id="messages"]', (m) => m.value);
        expect(content).to.contains('User: message');
    });
});