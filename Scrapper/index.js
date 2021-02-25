const browserObj = require('./browser');
const scraperController = require('./pageController');

let browserInstance = browserObj.startBrowser();
scraperController(browserInstance);