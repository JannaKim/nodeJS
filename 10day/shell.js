// 작동 xxx


//https://heropy.blog/2019/01/31/node-js-npm-module-publish/



let vmgit = require('./vmgit.js');

process.stdin.resume();
process.stdin.setEncoding('utf8');

var data = [];
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
  data.push(line);
  // data = line.split(' ').map((el) => parseInt(el));
});
reader.on('close', () => {
  console.log(Number(data[0]) + Number(data[1]));
  reader.close();
  process.exit();
});

let input;

var run = function(){
    /*
         git branch // 현재 위치한 브랜치

     git remote add upstream https://github.com/ORIGIN_OWNER/ORIGIN_REPO.git

    remote 설정.

    내가 PR을 보낼 곳을 추가해 준다.
    원격 저장소의 이름은 upstream 으로 지정한 것.



     git branch apple // 새 브랜치 만들기
     git checkout -b 브랜치 // 이런 브랜치 있나 보고 없으면 만든다.


     git checkout apple // 이 브랜치로 이동하기

     git checkout apple // 이 브랜치로 이동하기

     git log master..develop1 // dev에만 있는 커밋 알려준다

     git log develop1..master // dev에만 있는 커밋 알려준다

      git push origin test // 이 브랜치에 푸시하기



  git request-pull v1.0 https://git.ko.xz/project master // on my master branch
  */
    
    require('readline').createInterface({input: process.stdin,output: process.stdout}).on(
        'line',(input) => {
            // data = input.split(' ').map((el) => parseInt(el));
            // console.log(data[0] + data[1]);
            // reader.close();
            console.log(input)
    });

    vmgit.logManager();

    var fs = require('fs');
    var data = fs.readFileSync('log.txt', 'utf-8');
    fs.writeFileSync('a.js', 'a.js if created')
    console.log('02 readSync: %s',data);
};





run()
