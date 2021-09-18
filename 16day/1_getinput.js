import readline from 'readline';
import EventEmitter from 'events'
import url from 'url'
import Singleton from './3_vm_http_analyzer.js'


var custom_event = new EventEmitter();



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;
const domainRegex = new RegExp(/https:\/\/[^/]./g);//[\w]*[^/][\w]*[^/]/g);

let vmHttpAnalyzer
let getUrl = function(){

  rl.on('line', (input) => {
    if(input.match(expression)){
        vmHttpAnalyzer = Singleton.runNetworkTab(input)
    }
    else(console.log('url is inappropriate.'))
    rl.close(input);
})
};

export {getUrl, vmHttpAnalyzer};

// const linkRegex = /<link[^>]+href\s*=\s*[\"']([^>\"']+)[\"'][^>]*>/g;
// const scriptRegex = /<script[^>]+src\s*=\s*[\"']([^>\"']+)[\"'][^>]*>/g;
// const imgRegex = /<img[^>]+src\s*=\s*[\"']([^>\"']+)[\"'][^>]*>/g;

// const domainRegex = new RegExp(/h.*[/]/g);//https:[/]{2}[^/]*/g);//[\w]*[^/][\w]*[^/]/g);
// console.log(domainRegex.test("https://a.slack-edge.com/e06451a/style/libs/lato-2-compressed.css"))
// while(domainRegex.test("https://a.slack-edge.com/e06451a/style/libs/lato-2-compressed.css")){
//   console.log(RegExp.$1.trim());
//   // console.clear()
// }