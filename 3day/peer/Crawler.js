const axios = require('axios').default;
const cheerio = require("cheerio");

const GoogleSearchKeyword = async (keyword) => {
    await axios.get('https://www.google.com/search', {
        params: {
            q: keyword
        }
    })
        .then((response) => {
            const $ = cheerio.load(response.data);
            // const $rso = $("div#center_col");

            // const $ = cheerio.load(response.data);
            // const $wrap = $("div.total_wrap");

            // $wrap.each((index, element) => {
            //     var result = {
            //         title: $(element).find("a.link_tit").text().trim(),
            //         link: $(element).find("a.link_tit").attr("href"),
            //         preview: $(element).find("div.api_txt_lines.dsc_txt").text(),
            //     }

            //     console.log(result);
            // });
        })
        .catch((error) => {
            console.log(error);
        })
};

const NaverSearchKeyword = (keyword) => { // 함수가 1급객체라서 할 수 있는 것
    return axios.get("https://search.naver.com/search.naver", {
        params: {
            query: keyword
        }
    })
        .then((response) => {
            const $ = cheerio.load(response.data);
            const $wrap = $("div.total_wrap");

            var results = [];
            $wrap.each((index, element) => {
                let link = $(element).find("a.link_tit").attr("href");
                if(link === undefined){
                    link = $(element).find(".total_tit").attr("href");
                }
                
                results.push({
                    title: $(element).find(".total_tit").text().trim(),
                    link,
                    preview: $(element).find("div.api_txt_lines.dsc_txt").text(),
                });
            });

            if(results.length === 0){
                throw "검색 결과가 없습니다.\n";
            }
            return results;
        })
        .catch((error) => {
            return error
        })
};


// GoogleSearchKeyword("apple");
NaverSearchKeyword("naver");

module.exports = {
    // GoogleSearchKeyword,
    NaverSearchKeyword, // json 같이 하나의 오브젝트에서 여러개의 속성중
}