/*
1. 엔진, 런타임, 콜스택

2. V8 js 엔진의 내부 구성

3. 세션스택에서 따르고 있는 메모리누수 대처법
    세션스택> 우리의 서비스와 결합되는 고객의 앱 웹에서 메모리 누수가 일어나거나 메모리 소비가 승가하지 않도록 


C 같은 언어에섯 malloc() 나 free() 와 같은 저수준의 메모리 관리를 위한 원시함수(primitive) 가 존재한다.
개발자들은 이들을 이용해 명시적으로 운영체제로부터 메모리를 할당받거나 돌려주는 자겁을 한다

js에서는 객체, 문자열 등이 생겨날 때 메모리가 할당된다.

이들이 더 이상 사용되지 않을 때는 '자동으로' 메모리가 반환되는데, 이런 과정을 가비지 컬렉션이라고 한다.
이 자동 메모리 관리는 구현상의 제한이나 버그 때문에 문제가 있을 수 있으며, 이때 개발자들이 이런 문제를 적절히 
해결하거나 최소한의 프레이드오프와 기술부채로 적절한 우회법을 구현해야 한다.

4. 메모리 생명주기
allocate -> use -> release

use: 읽기, 쓰기. 개발자가 코드 상에서 할당된 변수를 사용한다

5. 메모리에는 많은 것들이 저장 된다
<li> 프로그램에서 사용되는 모든 변수와 기타 데이터 </li>

<li> 운영체제 및 개별 프로그램의 코드 </li>

메모리 초과하면 트랩 발동?


*/

var fs = require('fs');

/*
// 2. 비동기방식의 파일읽기. 파일을 읽은 후 마지막 파라미터에 넘긴 callback 함수가 호출
fs.readFile('code.js', 'utf-8', function(error, data) {
    console.log('01 readAsync: %s',data);
});
*/

// 3. 동기방식의 파일읽기. 파일을 읽은 후 data 변수에 저장
// let data = require("fs").readFileSync("/dev/stdin", "utf8"), 

// 지역 변수 및 함수 실행 : Stack Area
// 메모리 할당 : Heap Area

/*
var data = fs.readFileSync('code.js', 'utf-8')
            .toString()
            .trim()
            .split("\n")


data.forEach(function(el, index, array) {
    data[index] = el.split(' ');
  });
  
var sum = 0,
    cnt = 0;
data.forEach(function(el, index) {
el.forEach(function(el, index) {
    console.log(el);
    console.log("hi");
});

sum = 0;
cnt = 0;
});
*/

// 자바 스크립트는 포인터를 지원하지 않는다. 
// 그러나 포인터의 목적에 부합하는개체를 사용할 수 있다.


// 0KB ~ 16KB
// 1KB = 1024 bytes
// 주소 한칸 = 8byte. 스택만으로 본다면 1kb 당 변수 128 개 선언가능


// 힙 1kB 부터
// 스택 16kb 부터

// 명령어 한줄이 8byte? 64bit CPU 상으로 생각해서.




// int * x = (int *) malloc(sizeof(int));
// 한 행에 스택과 힙 할당이 모두 발생한다.Obj
// 이미 등록된 type에 대해 count만큼 반복해서 메모리를 할당하고 
// 시작 위치 고유한 주소를 스택 영역에 추가하고 " 추가한 곳의 주소를 리턴한다.""

// init시점에 heapSize보다 커지면 할당하지말고 exception 처리를 해야한다.

/*

var d = new Date(); // Date 개체를 위해 메모리를 할당

var e = document.createElement('div'); // DOM 엘리먼트를 위해 메모리를 할당한다.
*/

var stcptr = {num1:5,num2:8}; // 모든 포인터 메모리 사이즈는 4바이트 단위로 처리한다.
// 힙 스택 합쳐서 15KB 메모리를 쓸 수 있다 = 변수 128*14개 선언 가능하다.
// 힙 1B 시작주소 0x 0000 0000 0003 FFFF 에서 시작.
// 0000 0000 0000 0100 1B 끝 시작 주소
// 0000 0000 007d 0000 1KB 끝 시작주소
// 스택 시작주소 0x FFFF FFFF FFFF FFFF 에서 시작. 32000B주소공간 기준? .. ??
// 1KB: 128B = 0000 
/// 1000 = 0x03e8
// 32000 = 0x7d00

// 32 * 1024 * 8 = 262144
var mod = changeNum(numbers);
function changeNum(var Obj){
    Obj.num2 += 2;
}
32

function Stack(name, val){

}

function stcptrJump(){
    stcptr
}


/*
init(stackSize, heapSize) 스택영역 크기와 힙영역 크기를 지정하면 프로세스 공간을 위한 기본 주소(base address)를 리턴한다.
이번 미션에서는 일반적인 프로세스 메모리 모델(배경 지식 참조)중에서 스택과 힙 영역을 위주로 구현한다. 다른 영역은 무시해도 된다.
아래 함수들에서 사용하는 포인터 주소들은 이 함수에서 리턴하는 기본 주소에서 얼마나 떨어진지 상대 주소로 표현한다.
 
setSize(type, length) type 별로 고유한 사이즈를 가지도록 등록한다.
호출 예시 setSize("int", 8)
이미 등록한 타입은 다시 사이즈를 바꿀 수 없다.
사이즈는 1,2,4,8,16,32 중에 하나만 가능하다.
 
malloc(type, count) 이미 등록된 type에 대해 count만큼 반복해서 메모리를 할당하고 시작 위치 고유한 주소를 스택 영역에 추가하고 추가한 곳의 주소를 리턴한다.
만약 해당 타입 크기가 8바이트 보다 작은 경우는 패딩을 붙이고 count만큼 반복한다.
예를 들어 boolean 타입을 1로 등록했고 malloc("boolean", 4)를 호출한다면 패딩을 붙여서 8바이트 단위로 4개를 할당한다.
init시점에 heapSize보다 커지면 할당하지말고 exception 처리를 해야한다.
 
free(pointer) malloc 할 때 할당했던 스택 영역 포인터 주소를 입력으로 받아, 스택 주소에 있는 힙영역 고유 주소를 해제하고 반환한다.

call(name, paramCount) 현재 스택 포인터에 포인터 변수를 paramCount만큼 생성한다.
paramCount는 0부터 10이하 값이다.
name은 최대 8자까지만 가능하다.
call 실행할 때마다 name값(8자로 고정)을 스택에 기록해서 아래 callstack()에서 활용한다.
name과 포인터 크기(4바이트)를 기준으로 paramCount 길이만큼 스택 공간을 차지한다. 만약 init시점 stackSize보다 커지면 강제로 할당하지 말고 exception으로 처리한다.
returnf(name)
증가했던 스택 공간을 모두 비우고 마지막 호출 위치로 이동한다.
만약 call() 호출 이후에 malloc()으로 생성한 포인터 변수도 return하면서 같이 비운다. 이런 경우 malloc()으로 생성된 힙 영역의 메모리는 free()할 수 없고 스택에 있던 포인터 변수만 삭제한다.
call()을 호출한 경우가 없을 경우 아무런 동작을 하지 않는다.
 
usage() 스택 영역 전체크기, 사용중인 용량, 남은 용량, 힙 영역 전체크기, 사용중인 용량, 남은 용량을 순서대로 리턴한다.
 
callstack() 현재 스택에 쌓여있는 호출 스택을 문자열로 리턴한다.
예를 들어 call("foo", 0), call("bar", 1), call("dap", 2), returnf("dap")을 호출한 경우는 "foo() 0xAF00 -> bar() 0xB100" 형태로 함수 이름과 스택의 주소를 리턴한다.
 
heapdump() 힙영역에서 사용중인 상태를 문자열 배열로 표현해서 리턴한다.
힙 영역에 정보는 타입과 크기, 해당 주소를 참조하는 스택 포인터 변수 정보도 포함한다.
 
garbageCollect() 힙영역에 할당된 타입들 중에서 스택에 포인터 변수가 없는 경우를 찾아서 해제하는 동작을 한다.
*/