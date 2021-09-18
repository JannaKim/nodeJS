import readline from 'readline';
import OperatingSystem from './operating_system.js';

// PascalCase <- class name
// camelCase <- else

const linux = new OperatingSystem();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}


rl.on('line', (input) => {
  const times = input.split(' ') // input format: '1 2 3'
  linux.createProcess(times.map((time) => parseInt(time)));
  rl.close();
}).on('close', function() { // 동기화가?
  //const scheduled = Promise.linux.schedule()
  while(true){ 
    linux.schedule().then() // ???????????????????????{}
    linux.processQueue.readyQueue.isReadyQueueEmpty().then()
    console.log(linux.processQueue.kernel.getPCBs());
    let hello = async function() { return "Hello" };
    hello();
    sleep(1000)
    if(linux.processQueue.readyQueue.isReadyQueueEmpty() == true){
      console.log("모든 프로세스가 종료되었습니다.")
      

    }
    //process.exit(); // 지저분..

  }
  
}); // hello hi an nyeong hi ?  !힘내세요!🦮

export default linux;