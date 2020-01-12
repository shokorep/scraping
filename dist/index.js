"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
(async () => {
    let calenderPage;
    calenderPage = await axios_1.default.get("https://qiita.com/advent-calendar/2019/nuxt-js");
    let stCalender;
    if (calenderPage.status === 200) {
        stCalender = calenderPage.data;
    }
    else {
        stCalender = '';
    }
    const $ = cheerio_1.default.load(stCalender, { decodeEntities: false });
    let articles = new Array();
    $("div[class='adventCalendarCalendar_comment']").each((index, element) => {
        const itemTitle = $(element).find("a").text();
        const itemUrl = $(element).find("a").attr("href");
        let qiitaFlg;
        if (itemUrl.indexOf('https://qiita.com') >= 0) {
            qiitaFlg = true;
        }
        else {
            qiitaFlg = false;
        }
        let starCount = 0;
        const content = { itemTitle, itemUrl, qiitaFlg, starCount };
        articles.push(content);
    });
    console.table(articles);
    articles.forEach(async (content) => {
        // if(content.qiitaFlg && (content.itemUrl.indexOf('(')<0 && content.itemUrl.indexOf('（')<0)) {
        if (content.itemUrl.indexOf('https://qiita.com/Yoshihiro-Hirose/items/') >= 0) {
            const detailPage = await axios_1.default.get(content.itemUrl);
            let detail;
            if (detailPage.status == 200) {
                detail = detailPage.data;
            }
            else {
                detail = '';
            }
            // console.log(content.itemTitle)
            const $ = cheerio_1.default.load(detail, { decodeEntities: false });
            // ダメだったやつその１
            // $("div[class='it-Actions_item it-Actions_item-like likable]").each((index:number, element:any)=>{
            // $("div[class='p-items_container']").each((index:number, element:any)=>{
            //   // $content("div[class='it-Actions_item it-Actions_item-like likable']").each((index:number, element:any)=>{
            //     console.log('Aaaaaaaaaaaa')
            //     const test = $(element).find('a.it-Actions_likeCount').text();
            //     console.log({test})
            //     // console.log('element.next()',element.next())
            //   console.log({element},content.itemTitle)
            // const starCount:number = $(element).find("a").text();
            // console.log('content.itemUrl:',content.itemUrl,{starCount})
            // })
            // ダメだったやつその２
            //  const test2 = $('.it-Actions_likeCount a').text();
            //  console.log({test2})
            // ダメだったやつその３　refarence http://info-i.net/cheerio-load
            // $('.it-Actions_item it-Actions_item-like likable').each((index:number,ele:any)=>{
            //   console.log('$(ele).text',$(ele).text)
            // })
            console.log({ $ });
            // // これのDOMのchildrenを操作できれば良いのでは？？？？
            $('.p-items_stickyMenu.it-Actions').each((index, ele) => {
                // console.log('$(ele).text',$(ele).text())
                // const test = cheerio.html($('.it-Actions_item-like'))
                ele.children.forEach((i) => {
                    console.log({ i });
                });
                console.log({ ele });
            });
            // なにかしらは受け取った
            // const selection=$('p-items_container', 'dev');
            // console.log({selection})
        }
    });
    console.log('Happyyyyyyyyyyyyyyyyyyyyyyyy');
})();
//# sourceMappingURL=index.js.map
