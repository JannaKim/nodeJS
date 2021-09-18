var EventEmitter = require('events');

var custom_event = new EventEmitter();

custom_event.on('call', function() {
	console.log('이벤트 콜');
});



const readline = require('readline');
const { log } = require("console");

let orderqueue = new Array()
let orderqueueJson = new Object();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});



let carry = function(){


  rl.on('line', (input) => {
    if(input== '1'){
        custom_event.emit('call');
        // console.clear()
    }
    else(log('nope'))
    //rl.close(input);
})

}


carry()