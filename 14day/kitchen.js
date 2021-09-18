var State;
(function (State) {
State["runnable"] = "runnable";
State["running"] = "running";
State["waiting"] = "waiting";
State["blocked"] = "blocked";
State["terminated"] = "terminated";
})(State || (State = {}));

// kichen
/*
부엌은 싱글톤. 식당 하나 개업시킨 거니까
매니저 한명, 요리사 n명 불러서 안에서만 관리한다.
private로 선언하고 메소드로만 관리한다

요리사는 이너 클래스로 만들어보자.  요리사는 부엌에만 있지
매니저는 어떤 사업이던 필요하니까 객체 그냥 만든다
배달?

대기중인 요리사 목록을 관리해야 한다.
대기중인 배달 기사 목록을 관리해야 한다.

현황판에는 주문한 고객별로 주문한 메뉴 현황과 배달 현황을 구분해서 표시해야 한다.
현황판용 겟 메소드 만들기
*/
module exports = class Kichen{
    _state = State."runnable";

    constructor(){

    }

    get state(){
        return this._state;
    }

    get state(changedState){
        this._state = changedState;
    }

    cook = (menu, amount) => {

    }

//     이제 요리사(Chef)는 메뉴를 한 번에 2개 메뉴까지 동시에 만들 수 있다고 가정한다.
// 스레드를 생성하는 게 아니라 이벤트 큐를 받아서 처리하는 방식으로 동작해야 한다.
// 요리사는 메뉴를 만들기 시작할 때와 끝날 때 마다 이벤트를 발생한다.

// 담당하는 메뉴를 분배하는 방식을 구현한다
}
//   running 명령어들이 실행중
//   waiting 프로세스가 어떤 사건이 일어나기를 기다림
//   입출작업이 완료를 기다리는 것 같은 특별한 사건을 기다림

/*
상태 열거 상수 설명

객체 생성	NEW	스레드 객체가 생성, 아직 start() 메소드가 호출되지 않은 상태
실행 대기	RUNNABLE	실행 상태로 언제든지 갈 수 있는 상태
일시 정지	WAITING	다른 스레드가 통지할 때까지 기다리는 상태
TIMED_WAITING	주어진 시간 동안 기다리는 상태
BLOCKED	사용하고자 하는 객체의 락이 풀릴 때까지 기다리는 상태
종료	TERMINATED	실행을 마친 상태

출처: https://widevery.tistory.com/27 [Everything]

    this.list = [
      { name: "A", status: Status.ready, time: 0, totalTime: 3 },
      { name: "B", status: Status.ready, time: 0, totalTime: 5 },
      { name: "C", status: Status.ready, time: 0, totalTime: 7 },
      { name: "D", status: Status.ready, time: 0, totalTime: 10 },
      { name: "E", status: Status.ready, time: 0, totalTime: 15 },
    ];
  }

class ProcessQueue extends QueueImpl {
  constructor() {
    super();

자식 클래스 써보고 싶다.
*/ 