

/*

1. initial setup
  nodejs redownload
  /usr/local/bin/node
  /usr/local/bin/npm
  Make sure that /usr/local/bin is in your $PATH.

  NPM 계정이 먼저 있어야한다....



  echo $path

  sudo vi /etc/paths

  ~/bin 추가.

  npm install -g n
  The operation was rejected by your operating system.

  [Error: EACCES: permission denied, access '/usr/local/lib/node_modules'] {

  sudo chown -R ownerName: /usr/local/lib/node_modules

  sudo chown -R janna: /usr/local/lib/node_modules 

  npm도 git처럼 npm init이라고 저장소를 만들어주고 사용해야 패키지 관리가 가능한것으로 보인다.
  npm 관련 폴더를 하나 만들어준다.

  mkdir 3day

  npm init를 사용하면 자동적으로 정해지는 파일의 이름이 

  npm init -y sets up a package that allows you to download lot of dependencies
  index.js이다. packege.json 파일에서 정해둔 'main' entry에 해당하는 파일이 없을 경우 node.js는 index.js 파일을 자동으로 찾아 불러온다. 또한 package.json 파일이 없을 경우에도 동일한 작업을 수행한다.


  rm 명령어는 -r 옵션을 주지 않을 경우 디렉토리는 삭제할 수 없다
  rm -r 3day/node_modules 

  /Users/janna/.rbenv/shims /Users/janna/.rbenv/bin /Library/Frameworks/Python.framework/Versions/3.9/bin /usr/local/bin /usr/bin /bin /usr/sbin /sbin /Users/janna/.rbenv/shims /Users/janna/.rbenv/bin /Users/janna/opt/anaconda3/bin /Users/janna/opt/anaconda3/condabin /Library/Frameworks/Python.framework/Versions/3.9/bin
  세상에..

  그 파일로 이동해서 
  npm init

  npm init -y
  npm i cheerio node-fetch typescript ts-node// a library for fetching data ex axios


    "scripts": {
      "start": "ts-node src/index.ts" // test -> start to run typescript file
    },

  touch src/index.ts
  mv nodeTest src 파일명변경

  typescript 설치가 필요했다...

  npm install -g typescript

  tsc index.ts 하면 test.js 생성된다.

  html 에서
  <body>  
      <script src="test.js"></script>  
  </body>  
  부분에 document.body.textContent = sayHello(user); 함수 이런값이 실행 되는 것.

  셋 다 같은 폴더에 있어야 한다.


  그래도 Failed at the crawl@1.0.0 start script.
  해결:
  npm install -D tslib @types/node

  실행은 성공

  Cannot find name 'document'. D

  console.log('hello world'); 만 내용물로 두면 실행된다 저 문제는 나중에 다시 찾기.

  will be writing script in typescript for completion



2. fetching html

    web crawler whould fetch some html from a website.

    tst html 을 가져옴 
    npx http-server -p 10000 html

  이거 안됨. 통과

  http://toscrape.com 이용


  fetch expects 2 arguments ??

    npx 는 npm을 좀 더 편하게 사용하기 위해서 npm에서 제공해주는 하나의 도구




3. searching for elements

4. crawling the links

5. stay on the same page

 - const { host, protocol } = urlParsar.parse(url);
 - handle absolute vs relative links
 - downloading images
*/
const axios = require("axios"); // axios.get 함수를 이용하여 비동기로 스포츠 뉴스의 html 파
const cheerio = require("cheerio"); // Promise 객체에 cheerio를 이용하여 데이터를 가공합니다
const log = console.log;

const getHtml = async () => {
  try {
    return await axios.get('https://leetcode.com/problemset/all/');
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.wrapper tr").children("tr.array");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('array-tl a').text(),
          url: $(this).find('array-tl a').attr('href'),
          //image_url: $(this).find('p.poto a img').attr('src'),
          //image_alt: $(this).find('p.poto a img').attr('alt'),
          summary: $(this).find('p.lead').text().slice(0, -11),
          date: $(this).find('span.p-time').text()
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res => log(res));
