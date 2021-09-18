import ReadyQueue from './ready_queue.js'
import PCB, {state } from './PCB.js'
import Kernel from './kernel.js'
//const state = Object.freeze({ready : 'ready', running : 'running', waiting : 'waiting', terminated : 'terminated'})
export default class ProcessQueue { // CPU scheduler = MLFQ
    kernel;
    jobQueue;
    readyQueue; // should be priority queue? linked list?
    // priority : ascending
    deviceQueue;


    constructor(burstTimes) {
        // When the job scheduler accepts a job, it creates the job’s PCB 
        this.kernel = new Kernel();
        this.jobQueue = new Array();
        this.readyQueue = new ReadyQueue()
        this.deviceQueue = new Array();

        console.log("OS is ready to schedule.")
        this.jobQueueLoader(burstTimes); // 실행하려는 프로그램 받는 족족 잡큐에 때려박는 게 아니긴 하다.
        console.log("all processes are in disk")
        this.kernel.getPCBs().then()
        console.log(this.kernel.getPCBs())
        this.readyQueueLoader();
        console.log("all processes are now residing in main memory and are ready and waiting to execute in ready queue.")
        // this queue is generally stored as a linked list
        
    }

    readyQueueLoader(){
        // this.jobQueue.forEach(burstTime =>  ??????????????
        //     let newPCB = new PCB(burstTime),
        //     this.readyQueue.allocateProcess(newPCB ),
        //     this.kernel.jobScheduled(newPCB )
        // );
        for(const burstTime in this.jobQueue){
            this.jobQueue[burstTime].procState = state.waiting
            this.readyQueue.allocateProcess(this.jobQueue[burstTime])   
        }

    }


    jobQueueLoader(burstTimes) { 
        burstTimes.forEach(burstTime => {
            let newPCB = new PCB(parseInt(burstTime))
            this.kernel.jobScheduled(newPCB )
            this.jobQueue.push(newPCB)
        });
        // for(const burstTime in burstTimes){ // 열거형 포문은 json 만 ??????
        //     console.log(burstTime,'!')
        //     this.jobQueue.push(parseInt(burstTime))
        // }
    }

    
}
// this.createProcess;
// this.ProcessAPI.create;



function ProcessAPI() {
    // 응용 프로그램이 OS로부터 권한을 요청할 수 있는 구조로 만들려면 OS와 소통할 수 있게 해야한다. 
    // 이런 구조를 만들기 위해 OS에서 제공하는 함수 API가 만들어 졌다. 
    this.Create = function (Process) {
        // 프로그램 코드와 정적 데이터를 메모리, 프로세스의 주소공간에 탑재한다.
        // 탑재 : 디스크 상의 프로그램을 찾아 프로세스의 주소 공간으로 읽어 들인다.
        // 프로그램은 디스크나 SSD에 특정 실행 파일 형식으로 존재한다. 
        // 프로그램의 "중요 부분"을 디스크에서 메모리로 탑대한다.
        // 프로그램을 실행하면서 코드나 데이터가 필요할 때 필요한 부분만 메모리에 탑재한다.(페이징, 스와핑)

        /*
        current running process may have changed memory requirements and have overcommmited available memory.
        Swapping may have occured by medium-term scheduler.
        */

        // process is terminated! (has left!) long-term scheduler (job scheduler) is invoked.
        // Job schedular has selected processes from job pool(in disk) and loaded them into memory.
        //(IF waiting process exists. Often, in a batch system, more processes are submitted than can be executed immediately)h
        return Process.reduce((prv, cur) => cur);
    }
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

