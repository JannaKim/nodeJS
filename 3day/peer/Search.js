const crawler = require("./Crawler"); // 변수에 저 값 넣고나서
const LRUCache = require("./LRUCache").LRUCache;

const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout)

let cache = new LRUCache();

const DataToString = (data) => {
    var result = "";
    data.forEach((value, index, array) => {
        result += `\n${value.title}\n${value.link}\n${value.preview}\n`
    })
    return result;
};

const CheckCache = () => {
    let keywords = cache.check();
    var result = "";
    if (keywords.length == 0) {
        result = "저장된 키워드가 없습니다.";
    } else {
        result = "키워드 :";
        keywords.forEach((value, index, array) => {
            result += ` ${value[0]}(${value[1]}),`
        });
    }
    console.log(result);
    rl.prompt();
}

const SearchNaver = (input) => {
    crawler.NaverSearchKeyword(input)
        .then((value) => {
            cache.set(input, value);
            console.log(DataToString(value));
        })
        .catch((reason) => {
            console.error(reason);
        })
        .finally(() => {
            rl.prompt();
        });
}

const Search = (input) => {
    if (input === "$cache") {
        CheckCache();
    } else {
        var data = cache.get(input);
        if (data === null) {
            SearchNaver(input);
        } else {
            console.log("\n(본 검색 결과는 캐시에 저장된 내용을 표시합니다.)\n" + DataToString(data));
            rl.prompt();
        }
    }
}

rl.setPrompt("키워드를 입력하세요> ");
rl.prompt();

rl.on("line", Search);