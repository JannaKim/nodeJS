const { Singleton } = require("./restaurant_business");
const { log } = require("console");
const businessPolicy = require("./business_policy")


let restaurantBusiness

const opening = () => {
    businessPolicy.nmChef = 1
    businessPolicy.nmDeliveryMen = 0
    businessPolicy.deadline = false

    log(` 🍴 요리사는 ${businessPolicy.nmChef}명, 배달 기사는 ${businessPolicy.nmDeliveryMen}명, 영업 종료 유무는 ${businessPolicy.deadline}입니다.`)
    
    restaurantBusiness = Singleton.storeOpening(businessPolicy.nmChef, 
                                                    businessPolicy.nmDeliveryMen, 
                                                    businessPolicy.false);// cook이 한 명, 이거 싱글톤이어야 하는데
}

module.exports = {opening, restaurantBusiness}
// module.exports = { restaurantBusiness } ??


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

/*
싱글톤패턴 특징

객체 자체에는 접근이 불가능해야함
객체에 대한 접근자(비공개 멤버: 클로저)를 사용해 실제 객체를 제어할 수 있다.
객체는 단 하나만 만들어지며, 해당 객체를 공유함

이런 객체 리터럴도 싱글톤 패턴이다.
var obj = {
  a: 'foo',
  b: function(){}
}

이렇게 하게되면 비공개상태 및 함수를 정의할 수 없다.
그렇기 때문에 closure 를 통해 비공개로 만들어야한다.

*/



// var Manager = (function() {
 
//     // instance 비공개 변수 정의
//     var instance;
   
//     // foo 비공개 메서드 정의
//     function foo(){
//       return {
//         // public 메서드 정의
//         publicMethod: function() {
//           return `hello Manager Pattern!`;
//         },
//         // public 속성 정의
//         publicProp: `single value`
//       }
//     }
   
   
//     // public 메서드인 getInstance 를 정의한 객체
//     // 이 메서드를 통해 비공개된 메서드와 변수에 접근 가능 (closure)
//     return {
//       getInstance: function(){
//         if(!instance){
//           instance = foo();
//         }
//         return instance;
//       }
//     }
//   })();

// var a = Singleton.getInstance();