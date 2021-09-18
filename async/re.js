/*
js executes code block in order after "hoisting". 
hoisting : var, function declaration
그 뒤 순서대로 실행이 된다.
*/
function printImmediately(print) { // 콜백 받아서 콜백을 바로 실행한다
    print()
}

function printWithDelay(print, timeout) {
    setTimeout(print, timeout);
}

console.log('1')
setTimeout( () =>
    console.log('2')
, 1000) // 지정한 시간이 지나면 콜백함수를 호출하는 것.
// 콜백함수? 전달해준 함수를 나중에 불러주는 것
console.log('3') 

// 콜백도 두 가지의 경우로 나눠진다.
 

//동기적으로 실행하는 synchronous callback,

printImmediately(() => console.log('hello'))


//비동기적으로 실행하는 asynchronous callback - 언제 실행될 지 모르는 비동기적 콜백




printWithDelay( () => 
console.log('async callbcak')
{return printImmediately(() => {return 'hello'} }) , 2000);