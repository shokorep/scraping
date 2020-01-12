import axios from "axios";
import cheerio from "cheerio";

(async () => {
    let calenderPage: any;
    calenderPage = await axios.get("https://qiita.com/advent-calendar/2019/nuxt-js");

    let stCalender: string
    if(calenderPage.status === 200) {
        stCalender = calenderPage.data
    }else {
        stCalender = ''
    }
    const $: any = cheerio.load(stCalender, {decodeEntities: false});

    type article = { itemTitle:string, itemUrl:string, qiitaFlg:boolean, starCount:number}
    let articles:article[] = new Array()
    $("div[class='adventCalendarCalendar_comment']").each((index:number, element:any)=>{
        const itemTitle: string = $(element).find("a").text();
        const itemUrl: string = $(element).find("a").attr("href");
        let qiitaFlg
        if(itemUrl.indexOf('https://qiita.com')>= 0) {
          qiitaFlg = true
        } else {
          qiitaFlg = false
        }
        let starCount = 0
        const content:article = {itemTitle, itemUrl, qiitaFlg, starCount}
        articles.push(content)
      })
    console.table(articles)
    articles.forEach(async (content:article)=> {
      if(content.qiitaFlg && (content.itemUrl.indexOf('(')<0 && content.itemUrl.indexOf('（')<0)) {
      // if(content.itemUrl.indexOf('https://qiita.com/Yoshihiro-Hirose/items/')>=0) {
        const detailPage = await axios.get(content.itemUrl)
        let detail: string
        if(detailPage.status== 200) {
          detail = detailPage.data
        } else {
          detail =''
        }

        // Cheerio 使わないver
        const str = detail.match(/"likesCount":(\d*)/)
        console.log(str![1])
        content.starCount = parseInt(str![1])
        console.log("content.starCount",content.starCount)
      }
    })
    console.table(articles)
    console.log('Happyyyyyyyyyyyyyyyyyyyyyyyy')

})();
