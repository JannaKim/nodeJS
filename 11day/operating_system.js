//import { state } from './PCB.js';
import ProcessQueue from './process_queue.js'
var state = Object.freeze({ready : 'ready', running : 'running', waiting : 'waiting', terminated : 'terminated'})
/*
설계: 실제 실행할 프로세스를 고르는건 job scheduler 가 한다. 
CPU 스케쥴링을 구현하는 미션이므로, 실행될 프로세스를 올리는 job scheduler 의 역할은 내가 한다. 
(실행 프로세스 목록에 aurguments 로 올린다: 디스크의 job pool 의 프로세스들 중에 당장 실행될 프로세스를 고른 것.), 
UNIX, Microsoft Windows systems have no long-term scheduler, puts every new process in memory



자바스크립에는 객체지향 프로그래밍 언어에서 기본적으로 제공하는 클래스라는 개념을 제공하지 않습니다.

생성자 함수가 다른 언어에서의 클래스(Class)와 유사한 개념이기 때문에 클래스를 사용할 수 있는 방법이 있습니다. 

그렇기 때문에 자바스크립트에서는 클래스는 없지만 OOP 와 같이 비슷하게 사용할 수 있는 문법이 존재합니다.

hellozz
*/

/*
multiple programs being loaded into memory and executed concurrently required 
firmer control and more compartmentalization.
These needs resulted in the notion of 'Process'

A process is the unit of work in a modern time-sharing system.
*/

export default class OperatingSystem {
    processQueue;
    constructor() {
        console.log(`
        Hi! You are now putting process in SSD to execute Job Scheduler.
        In general, most processes can be described as either I/O bound, CPU bound.
        Job Scheduler selects a good process mix of I/O bound(for waiting queue) or CPU- bound(for ready queue).`);
    }
    // this.createProcess;
    // this.ProcessAPI.create;

    createProcess (executeTime) {
        console.log(`${executeTime.length} programs are selected by job scheduler for CPU`)
        console.log("(ONLY THE) essential parts of each program code is loaded from disk"); // 프로그램 코드, 정적 데이터를 메모리, 프로세스의 주소 공간에 탑재한다.
        // console.log(Array.from(executeTime).reduce((prv, cur) => this.q.push(cur), 0)) // 0해줘야 처음부터됨
        //console.log(executeTime.reduce((prv, cur) => this.readyQueue.push(cur), 0)); // q에 넣기도 하고
        // 프로세스 생성
        this.processQueue = new ProcessQueue(executeTime)
        
    }

        // CPU scheduling : ! swapping may have ocurred
        //PCB 생성도 하고
        // 전개 연산자.

        // for(let i = 0; i < arguments.length; ++i){
        //     this.q.push(arguments[i]);
        // }
        //let newProcess = this.ProcessAPI.Create(arguments);
        //newProcess.reduce((prv, cur) => this.q.push(cur));
        
    async schedule(){
        let running = await this.processQueue.readyQueue.scheduleMLFQ()
        await console.log(this.processQueue.kernel.getPCBs());
        if(running.pid == -1) return
        console.log(running.pid,'??')
        //if(running.procState === state.running) running.procState = state.waiting
        //console.log(this.processQueue.kernel.getPCBs())
        
        let ret = async function(){
        if(running.procState === state.running) running.procState = state.waiting};
        ret();
        return;
        //return this.processQueue.readyQueue.inQueue;

        // return Promise.all(this.processQueue.readyQueue.scheduleMLFQ()).then((values) => {
        //     return this.processQueue.readyQueue.inQueue;
        //   }).catch((error) => {
        //     console.log(error);
        //   });
    }

    

    // loadComponents = () => {
    //     return Promise.all([p1,p2,p3,p4,p5,p6,p7,p8]).then((values) => {
    //       this.callbackOnLoad();
    //     }).catch((error) => {
    //       console.log(error);
    //     });
    //   }


}


function ProcessAPI(){ 
//     응용 프로그램이 OS로부터 권한을 요청할 수 있는 구조로 만들려면 OS와 소통할 수 있게 해야한다. 
// 이런 구조를 만들기 위해 OS에서 제공하는 함수 API가 만들어 졌다. 
    //this.Create = function(Process){
        // 프로그램 코드와 정적 데이터를 메모리, 프로세스의 주소공간에 탑재한다.
        // 탑재 : 디스크 상의 프로그램을 찾아 프로세스의 주소 공간으로 읽어 들인다.
        // 프로그램은 디스크나 SSD에 특정 실행 파일 형식으로 존재한다. 
        // 프로그램의 "중요 부분"을 디스크에서 메모리로 탑재한다.
        // 프로그램을 실행하면서 코드나 데이터가 필요할 때 필요한 부분만 메모리에 탑재한다.(페이징, 스와핑)

        /*
        current running process may have changed memory requirements and have overcommmited available memory.
        Swapping may have occured by medium-term scheduler.
        */

        
        // process is terminated! (has left!) long-term scheduler (job scheduler) is invoked.
        // Job schedular has selected processes from job pool(in disk) and loaded them into memory.
        //(IF waiting process exists. Often, in a batch system, more processes are submitted than can be executed immediately)h
        
    //    return Process.reduce( (prv, cur) => cur);

    //}
    var Destroy;
    var Wait;
    var MiscellaneousControl;
    var Status;
}

/*
Hi! You are 'THE' Job Scheduler. 
In general, most processes can be described as either I/O bound, CPU bound.
Please select a good process mix of I/O bound(for waiting queue) or CPU- bound(for ready queue).

*/

/*
단일 코어에서 멀티스레드를 이용해 "서로 다른 맥락"(이게 중요한 전제 조건)에서 쓰레드를 실행시킨다면, 한 쓰레드는 I/O 작업을 받고 다른 쓰레드는 CPU를 사용해서 단일코어 상에서도 parallel 한 (진짜로 동시에 실행하는) concurrent 작업을 하여 시간을 단축시킬 수 있다고 합니다
거꾸로 서로 다른 쓰레드가 정확히 같은 작업을 하면, 시간 단축이 전혀 이루어 지지 않는다고 합니다
결국 우리가 받는 프로세스들은 모두 I/O 작업 등 CPU 계산을 하지 않는 다른 작업들이 코드 내에 있는 프로세스들이어서, "멀티쓰레딩을 할 시에 시간을 단축시킬 수 있는 프로세스들이다" 라고 가정하는 거라 생각합니다
*/

//npm install -g npm