// const analysisList = {}

// analysis
// const cache = new Map();

// <meta property="og:url" content="https://www.naver.com/"> 으로 판단하자.


//  w.min.20210624.css  색깔도 캐시하니?
import EventEmitter from 'events'
import {info} from './5_info.js'
let Cache = Map;
const browserCache = new Cache();


const myObject = {
  name: 'plainObjectValue',
  otherKey: 'otherValue'
};




// console.log(browserCache.get({
//     name: 'plainObjectValue',
//     otherKey: 'otherValue'
//   })); // object as a key


var custom_event = new EventEmitter();
const doIhaveIt = (url) => {

    if(browserCache.get(url) == undefined) {
        browserCache.set(url, 'true');
        console.log('cache miss')
        custom_event.emit('call', false);
    }
    else {

        info.cache++
        custom_event.emit('call', true);}
}

export {custom_event, doIhaveIt}

// 캐시는 다음 방문 시 페이지를 빠르게 열 수 있도록 이미지 등 페이지의 일부를 기억합니다.
// OS()

/* call by reference
let s = new Set();
let a = {};
let b = {};

s.add(a);

console.log(s.has(a));  // true
console.log(s.has(b));  // false
*/

/*
Web caching is the activity of storing data for reuse, 
such as a copy of a web page served by a web server.
*/

custom_event.on('call', function(chk) {
    if(chk == true)
      console.log('cache hit');
    else 
      console.log('cache miss');
  });