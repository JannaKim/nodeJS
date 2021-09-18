//const Kitchen = require()
const readline = require('readline');
const menu = require("./menu");
const { log } = require("console");
const { restaurantBusiness } = require("./opening");


let orderqueueJson = new Object();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const intervalId = setInterval(() => { // event looper
    log("1 sec passed")
    if(restaurantBusiness.queue['waiting orders'].length > 0){ // & cook.state = 'ready'
      restaurantBusiness.queue['cooking'].push(restaurantBusiness.queue['waiting orders'].splice(0)) // 받은 주문 앞에 꺼 뽑아서 주문 대기큐에 집어넣음
        //log("주문 받았다!")
    }
  }, 1000)




// module.exports = {manager}

// 한 요리사당 두개메뉴 동시제작할 수 있는데 받는건 1분에 한개씩 하나봄
class Manager {
  constructor (nmChef, nmDeliveryMen, deadline)  {
    this.nmChef = 0;
    this.nmDeliveryMen = 0;
    this.deadline = 0;
    this.orderqueue = new Array()

    this.POS()
    //checkAndInstruct
  }
  
  POS(){

    rl.on('line', (input) => {
      if(input.indexOf(':') != -1){
          const nextOrder = input.split(':') // input orderingFormat: '1 2 3'
          const orderingFormat = nextOrder.map((el) => el)

          if(menu.LIST.hasOwnProperty(orderingFormat[0])){
              log("Correct formatted order is received")
              const newReceivement = {food : menu.LIST[orderingFormat[0]][0], burstTime : parseInt(menu.LIST[orderingFormat[0]][1]), amount : parseInt(orderingFormat[1])}
              estaurantBusiness.queue['waiting orders'].push(newReceivement)
              log(this.orderqueue)
          }
          else{
              log("Incorrect formatted order is received. Make order again.")
  
          }
          // console.clear()
      }
      //rl.close(input);
  })
  
  }
}


const Singleton2 = {
  instance: null,
  
  hiremanager(nmChef, nmDeliveryMen, deadline) {
    if(!this.instance)
      this.instance = new Manager(nmChef, nmDeliveryMen, deadline);
    
    return this.instance;
  }
}


module.exports = {Singleton2}


/*
          
console.log( 'orderingFormat[0]' in menu.LIST ) // true
이 방법엔 단점이 있다.
다음에서 처럼 Object의 프로토타입 체인으로 생성한 프로퍼티도 체크한다는 것이다.
Object.prototype.test_2 = undefined

Object.hasOwnProperty
메소드는 객체가 특정 프로퍼티를 소유했는지를 반환한다. 
특히 객체가 지정된 속성을 프로토타입 체인을 통해 상속되지 않은 그 객체의 
직접 속성으로 포함하는지를 나타내는 boolean을 반환한다.

menu.LIST.hasOwnProperty('orderingFormat[0]')

//let orderedMenu = orderingFormat[0]
//orderqueueJson.menu.LIST['1'][0] = {burstTime : parseInt(menu.LIST['1'][0]), amount : parseInt(orderingFormat[1])}
*/
