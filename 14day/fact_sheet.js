const { log } = require("console");
const queue = require("./queue_list")

class FactSheet {

    constructor ()  {
    }   
    
    denote() { // refactorying needed 
        // 배열 명 출력하는 법?
        // for(prop in queue)  {
        //     log(`${prop} : ${queue[prop]}`)
        //   }       
        post('cooking')
        post('waiting orders')
        post('waiting for delivery')
        post('in delivery')
    }

    post(prop){
        log(prop,':')
        for(Obj in queue[prop]){
            process.stdout.write(`${Obj.employeeName} - ${Obj.customerName}'s ${Obj.food}`)
        }
        console.log('\n');
    }
  }
  
const Singleton3 = {
    instance: null,
    
    createFactSheet() {
      if(!this.instance)
        this.instance = new FactSheet();
      
      return this.instance;
    }
  }

module.exports = {Singleton3}






// let exports = module.exports = {};
// class Kichen{
//     _a;
//     constructor(v){
//         this._a = v;
//     }
//     get a(){
//         return this._a;
//     }

// }

// let K1 = new Kichen(1)
// let K2 = new Kichen(2)

// module.exports = {K1, K2}