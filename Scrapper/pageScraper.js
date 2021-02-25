var fs = require("fs");
const ids = require('../ids.json')
const scraperObject = {
    url: 'https://www.gumtree.com.au/s-digital-slr/inner-sydney/c21107l3003771r50',
    mainPage: 'https://www.gumtree.com.au/',
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        console.log('keff')
        await page.waitForSelector('span.user-ad-row-new-design__title-span');
        let data = await page.evaluate(() => {
            var titles = document.querySelectorAll(`span.user-ad-row-new-design__title-span`)
            var prices = document.querySelectorAll(`span.user-ad-price-new-design__price`)
            var locations = document.querySelectorAll(`div.user-ad-row-new-design__location`)
            // var priceStatus = document.querySelectorAll(`user-ad-price-new-design__negotiable-label`)
            // var link = document.querySelectorAll(`span.user-ad-price-new-design__price`)
            var titleLinkArray = [];
            for (var i = 0; i < titles.length; i++) {
                titleLinkArray[i] = {
                    title: titles[i].innerText.trim(),
                    price: prices[i].innerText.trim(),
                    location: locations[i].innerText.trim(),
                };

            }
            console.log(titles)
            return titleLinkArray;
        })
        console.log(page.url())
        await browser.close();
        fs.writeFile("listings.json", JSON.stringify(data), function(err) {
            if (err) throw err;
            console.log("Saved!");
          });
    },
    async Testscraper (browser) {
        let page = await browser.newPage();
        await page.goto(this.mainPage);
        await page.waitForSelector('div.j-selectbox__text');
        let ids = await page.evaluate(()=>{
            var elements = document.querySelectorAll('div.j-selectbox__text')
            console.log(elements)
            var idArray = []
            for(let i = 0; i < elements.length; i++){
                idArray[i] = {
                    id:elements[i].id.split('-').filter(item => (parseInt(item) == item)),
                    category:elements[i].textContent.trim()
                }
                console.log(elements[i].id)
            }
            return idArray
        })
        await browser.close();
        fs.writeFile("ids.json", JSON.stringify(ids), function(err) {
            if (err) throw err;
            console.log("Saved!");
          });
        //   this.readIds()
    },
    // readIds(){
    //     fs.readFile('ids.json', 'utf8', function(err, data){
    //         if(err) throw err;
    //         var toSave = JSON.parse(data).map(str => str.split('-')).map(item => item.filter(number => (parseInt(number) == number)))
    //         fs.writeFile('test.json', JSON.stringify(toSave), function(err){
    //             if(err) throw err;
    //             console.log('this worked')
    //         })
    //     })
    // }
}
module.exports = scraperObject;