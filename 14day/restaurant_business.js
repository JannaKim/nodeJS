const { Singleton2 } = require("./manager");
let Q = require("./queue_list");
const { log } = require("console");

// Queue.emit('event', 'el','a', 'b');
class RestaurantBusiness {
    constructor (nmChef, nmDeliveryMen, deadline)  {
      this.nmChef = 0;
      this.nmDeliveryMen = 0;
      this.deadline = 0;
      this.Queue = new Q.Queues();
      
      Queue.on('event', (prop, act, Obj) => {
        if(act === 'push'){
            Queue.queue[prop].push(Obj)
        }
        else{
            Queue.queue[prop].splice(0) // O(n)
        }
      });

      Queue.on('mainboard', (write) => {
        log(write)
      });

      this.setPolicy(nmChef, nmDeliveryMen, deadline)

      this.Manager = Singleton2.hiremanager();
    }
    
    setPolicy(nmChef, nmDeliveryMen, deadline) {
      this.nmChef = nmChef;
      this.nmDeliveryMen = nmDeliveryMen;
      this.deadline = deadline;
    }
  }
  

const Singleton = {
    instance: null,
    
    storeOpening(nmChef, nmDeliveryMen, deadline) {
      if(!this.instance)
        this.instance = new RestaurantBusiness(nmChef, nmDeliveryMen, deadline);
      
      return this.instance;
    }
  }


module.exports = {Singleton}