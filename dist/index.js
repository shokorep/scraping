"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
(async () => {
    // axios.get("https://qiita.com/advent-calendar/2019/nuxt-js").then((res: any)=>{
    //     console.log(res.data)
    // })
    let aaa;
    aaa = await axios_1.default.get("https://qiita.com/advent-calendar/2019/nuxt-js");
    let stCalender;
    if (aaa.status === 200) {
        stCalender = aaa.data;
    }
    else {
        stCalender = '';
    }
    const $ = cheerio_1.default.load(stCalender, { decodeEntities: false });
    // const test = $("div[class='adventCalendarCalendar_comment']").text
    // console.log({test},test)
    // $("div[class='adventCalendarCalendar_comment']").each((item: any) => {
    //     const link = $(item);
    //     var text = link.text();
    //     var href = link.attr("href");
    //     console.log({link},{text},{href})
    // })
    // $("a").each((item: any) => {
    //   const link = $(item);
    //   var text = link.text();
    //   var href = link.attr("href");
    //   console.log({ link }, { text }, { href });
    // });
    let articles;
    $("div[class='adventCalendarCalendar_comment']").each((index, element) => {
        const itemTitle = $(element)
            .find("a")
            .text();
        const itemUrl = $(element)
            .find("a")
            .attr("href");
        let qiitaFlg;
        if (itemUrl.indexOf('https://qiita.com') >= 0) {
            qiitaFlg = true;
        }
        else {
            qiitaFlg = false;
        }
        console.log({ itemTitle }, { itemUrl }, { qiitaFlg });
        articles.push({ itemTitle, itemUrl, qiitaFlg });
    });
    console.table(articles);
})();
//     const url: string = "https://qiita.com/advent-calendar/2019/nuxt-js"
//     let page: any
//     page = await browser.newPage();
//     await page.goto(url); // 表示したいURL
//     console.log(page)
//  https.get(url, res: any => {
//   let html = "";
//   res.on("data", line => (html += line));
//   res.on("end", () => {
//     const dom = new JSDOM(html);
//     console.log(dom.window.document.querySelector("p").textContent);
//     // => list3
//   });
// });
// const document = jsdom.jsdom(page);
// var matches: any = document.querySelectorAll("p");
// console.log('aaaaa')
// console.log(matches)
// const scrapingData = await page.evaluate(() => {
//   let dataList: string[]
//   const nodeList = document.querySelectorAll(
//     ".adventCalendarCalendar_comment"
//   );
//   let i: number = 0
//   console.log(nodeList)
//   console.log(i)
//   nodeList.forEach((_node: any) => {
//     // dataList.push(_node.innerText);
//     console.log(_node.innerText, 'i:',i);
//     i = i + 1
//   });
//   return dataList;
//     });
//     /*（何か処理）*/
//     await page.screenshot({ path: 'screenShotPage.png' });
//     browser.close();
// function hello(name: string): string {
//     return `Hello, ${name}!`;
// }
// console.log(hello("World"));
// export async function main() {():string =>
//   { console.log('aaaaa')
//    console.log('bbbbbb')
//    const title: string = "あいうえお" 
//    return title
//   }}
// main().then(() => console.log("aaaaa"))
//# sourceMappingURL=index.js.map