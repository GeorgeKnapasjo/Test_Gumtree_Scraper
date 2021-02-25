const axios = require('axios');
const { testElement } = require('domutils');
// const {JSDOM} = require('jsdom');
const puppeteer = require('puppeteer');

const startBrowser = async () =>{
	let browser;
	try {
		browser = await puppeteer.launch({
            headless:false
        });
	} catch (error) {
		console.error(error)
	}
	return browser
}

module.exports = {
    startBrowser
};