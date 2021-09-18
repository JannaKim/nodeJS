var EventEmitter = require('events');


class Queues extends EventEmitter{
    constructor (){
        super();
    }
    queue = { //요리 객체 리스트
        'waiting orders' : [],
        'cooking' : [],
        'waiting delivery' : [],
        'delivery' : []   
    }
}

module.exports = {Queues : Queues}