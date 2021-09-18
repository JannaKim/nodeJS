const Presentation = require("./presentation_layer");

module.exports = class Application {
    #Presentation;
    constructor(IP){
        this.#Presentation = new Presentation(this, IP);
    }

    /**
     * 
     * @param {string} from 
     * @param {string} to 
     * @param {string} title 
     * @param {string} file 
     * @returns 
     */
    encode = (from, to, title, file) => {
        console.log("=====Application Layer=====");

        let data = `From: ${from}\r\nTo: ${to}\r\nTitle: ${title}\r\n\r\n${file}`;
        
        console.log(data, "\n");

        return this.#Presentation.encode(data);
    }

    decode = (encodedData) => {
        return [from, to, title, file]
    }
}