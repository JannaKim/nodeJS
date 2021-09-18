const {opening} = require("./opening");

const main = () => {
    opening()
}

main();


/*
input은 수시로(interval 없이) 받는다
받은 인풋이 주문 규격을 만족하면 orderqueue에 넣는다
manager이 1초마다 orderqueue를 확인하고, 
있으면 요리사의 상태가 idle 이라면 이벤트 큐에 넘겨준다 

manager, cook 은 한명이므로 둘다 싱글톤으로 객체 만든다.
싱글톤은 PS패턴에서 참고

class Manager{
    constructor(){
        checks orderqueue per sec()
    }

    checksOrderQueuePerSec(
        if(orderqueue.length > 0 && Cook.state == 'idle'){
            //요리 큐팝하고 넘겨주기
            // 이벤트 룹?
        }
    );

받는 쿳, 배달원 수만큼 객체를 생성하는데 그럴때마다 배열에 넣는다.
이거 PCB리스트 참고
쓰면 큐팝후 푸시해서 
idle한 쿡 있는지 [0]번째 쿡만 확인해보면 되겠다.
restaurant는 일반 클래스로 하자. 

}
*/