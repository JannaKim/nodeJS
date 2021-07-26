const { find } = require("cheerio/lib/api/traversing");

class LRUCache {
    constructor(numKeyword = 5, numData = 10) {
        this.numKeyword = numKeyword;
        this.numData = numData;

        this.data = new Map();
    }

    get = (keyword) => {
        if (this.data.has(keyword)) {
            let meta = this.data.get(keyword);
            meta.set("timeStamp", Date.now());
            meta.set("hitCount", meta.get("hitCount") + 1);

            return meta.get("data");
        } else {
            return null;
        }
    }

    set = (keyword, data) => {
        if (this.data.has(keyword)) {
            let meta = this.data.get(keyword);
            meta.set("timeStamp", Date.now());
            meta.set("data", data)
        } else {
            if (this.data.size < this.numKeyword) {
                this.data.set(keyword, new Map([
                    ["timeStamp", Date.now()],
                    ["hitCount", 0],
                    ["data", data],
                ]));
            }
            else {
                var minKey = null, minTime = Date.now();
                this.data.forEach((value, key, map) => {
                    var time = value.get("timeStamp");
                    if (time <= minTime) {
                        minTime = time;
                        minKey = key;
                    }
                })
                this.data.delete(minKey);

                this.data.set(keyword, new Map([
                    ["timeStamp", Date.now()],
                    ["hitCount", 0],
                    ["data", data],
                ]));
            }
        }
    }

    check = () => {
        var result = [];
        this.data.forEach((value, key, map) => {
            result.push([key, value.get("hitCount")]);
        });

        return result;
    }
}

module.exports = {
    LRUCache
}