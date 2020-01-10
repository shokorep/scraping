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
        const content:article = {itemTitle, itemUrl,qiitaFlg,starCount}
        articles.push(content)
      })
    console.table(articles)
    articles.forEach(async (content:article)=> {
      if(content.qiitaFlg && (content.itemUrl.indexOf('(')<0 && content.itemUrl.indexOf('（')<0)) {
        const detailPage = await axios.get(content.itemUrl)
        let detail: string
        if(detailPage.status== 200) {
          detail = detailPage.data
        } else {
          detail =''
        }
        // console.log(content.itemTitle)
        const $: any = cheerio.load(detail, {decodeEntities: false})

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

        // これのDOMのchildrenを操作できれば良いのでは？？？？
        $('.p-items_container').each((index:number,ele:any)=>{
          console.log('$(ele).text',$(ele).text())
          })

        // なにかしらは受け取った
        // const selection=$('p-items_container', 'dev');
        // console.log({selection})

      }
    })
    console.log('Happyyyyyyyyyyyyyyyyyyyyyyyy')

})();
