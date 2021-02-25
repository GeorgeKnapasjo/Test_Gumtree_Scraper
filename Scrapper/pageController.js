const pageScraper = require('./pageScraper');
const scrapeAll = async(browserInstance) =>{
    let browser;
    try{
        browser = await browserInstance;
        await pageScraper.Testscraper(browser)
    }
    catch(err){
        console.log(`could not resolve ${err}`)
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);