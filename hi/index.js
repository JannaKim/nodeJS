



console.log('hi'); // 비동기 처리 할 만한게없다


// npm: json 파일에 명시돼있는걸 그대로 
//스크립트 파트에 가서 해달하는 명령어르 ㄹ그대로 수행시키는 것

const t = require('axios').default; // 이 라이브러리에 디폴트 넣어라
// 함수나 클래스 일수있다.
console.log(t.get("https://google.com")) //결과 생각했더니 모름 io작업이 대표적인 비동기처리
// chrong v8 엔진 오면 그떄 처리하고 다므 작업부터 하는 것
// Promise 값 아직 모르는 채 종료된것

t.get("https://google.com").then((r) => {  //동기 역할
    console.log(r)
})

// 인풋 들어오면 하던거 멈추고..


콜스탠에 넣은걸 이따 처리함

이벤트핸들러는? 

// html 만 필요한지 통신정보 url도 필요한 지

//callback 함수

//add(1, 2, print)
// print 가 콜백함수이다

// add 결과 다름에 실행할 함수
// 쉘이 저걸 그대로 쳤더니 저런 실행은 없다고 알려준 것

//io 작업하는데 수행 완료되기 전에 된거라
// 비동기 처리임
// 동기처리하지 않는 모든게 비동기로 실행된다.

console.log(1 + 2)
console.log(1)

// 컴퓨터의 모든 자원에