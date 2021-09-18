import PCB, {state} from './PCB.js'
// import linux from './operating_system.js'
//const { state } = require('./PCB');
//import {state} from "./PCB.js";



export default class ReadyQueue{
    Queue; // each queue has QueueHeader
    readyQueueEmpty = false;
    S
    dummy;
    headOfTail;
    /*
    undefined 타입 = 기본적으로 값이 할당되지 않은 변수. undefined 타입은 변수 자체의 값 또한 undefined 이다.
    null = 아무것도 참조하고 있지 않다라는 의미가 담겨 있다.
    */
    constructor(){
        this.Queue= new Array(5);
        this.inQueue = []
        this.S = 1; // 실행 단위가 정수라서 마지막 남은 하나를 위해
        this.dummy = new PCB(-1, 0)
        this.dummy.head = this.dummy
        this.headOfTail = this.dummy
        for(let i = 0; i < 5; ++i){
            let QueueHeader = { queueHead : null, queueTail : null}
            this.Queue[i] = QueueHeader
            this.Queue[i].queueHead = this.dummy // each head points next PCB
            this.Queue[i].queueTail = this.dummy
        }
        

        // contains pointers to the first and final PCBs in the list.
        
    }
    
    allocateProcess(process){ // 성공!
        process.head = this.dummy
        //console.log(this.headOfTail.pid,'->')
        this.headOfTail.head = process
        this.headOfTail = process
        this.Queue[0].queueTail.head = process // 처음 들어온 프로세스는 상위 큐에 위치한다.
        //console.log(this.headOfTail.pid,'!')
        this.Queue[0].queueTail = process
            //console.log(i)
    }


    /*
    1. 우선순위 A > 우선순위 B 일 경우, A가 실행, B는 실행되니 않는다.
    2. 우선순위 A = 우선순위 B 일 경우, A 와 B는 RR 방식으로 실행된다.
    3. 작업이 시스템에 들어가면 최상위 큐에 배치된다.
    4. 작업이 지정된 단계에서 배정받은 시간을 소진하면(CPU를 포기한 횟수와 상관없이), 작업의 우선순위가 한단계 감소한다
    5. 일정 주기 S가 지난 후, 시스템의 모든 작업을 최상위 큐로 이동시킨다.

    S를 뭐로 정할까..
    */
    async scheduleMLFQ(){
        let flag = false
        let outOfTimeSlice;
        for(let i = 0; i < 5; ++i){
            if(this.Queue[i].queueHead.head.pid != this.dummy.pid){
                //console.log(this.Queue[i].queueHead.head.pid , '!=',this.dummy.pid )
                //console.log(this.Queue[i].queueTail.pid)
                outOfTimeSlice = this.Queue[i].queueHead.head // dummy 다음 꺼 뽑는다
                this.Queue[i].queueHead.head = outOfTimeSlice.head
                outOfTimeSlice.head = this.dummy
                outOfTimeSlice.procState = state.running
                outOfTimeSlice.accountingInfo.accumulateUsedTime();
                /* ?????????????
                linux.processQueue.kernel.getPCBs().then()
                console.log(linux.processQueue.kernel.getPCBs())
                */
                let time = outOfTimeSlice.accountingInfo.getUsedTime()
                if(time === outOfTimeSlice.getBurstTime()){
                    outOfTimeSlice.procState = state.terminated
                }
                else{
                    
                    this.Queue[i].queueTail.head = outOfTimeSlice // 작업의 우선순위가 한단계 감소한다
                    this.Queue[i].queueTail = outOfTimeSlice
                }
                //console.log(this.Queue[i].queueHead.head.procState, this.Queue[i].queueHead.head.pid, '~')
                //this.Queue[i].queueHead.head = outOfTimeSlice.head
                //console.log(this.Queue[i].queueHead.head.procState, this.Queue[i].queueHead.head.pid, '^')
                
                flag = true
                //this.upgrade()
                break
            }
        }
        if(flag == false) {// js는 정상이 아니다
            this.readyQueueEmpty = true;
            return this.dummy}
        //console.log(outOfTimeSlice.pid,'ret')
        return outOfTimeSlice
    }

    upgrade(){
        for(let i = 1; i < 5; ++i){
            if(this.Queue[i].queueHead.head.pid != this.dummy.pid){
                this.Queue[i - 1].queueTail.head = this.Queue[i].queueHead.head
                this.Queue[i - 1].queueTail = this.Queue[i].queueHead.head
                this.Queue[i].queueHead.head = this.dummy
                this.Queue[i].queueTail = this.dummy
            }
        }  
    }

    async isReadyQueueEmpty(){
        return this.readyQueueEmpty
    }




}

// let test = new Queue();
// const processes = []; // literal init
// for(let i = 7; i < 9; ++i) {
//     processes.push(new PCB(i,i));
// }
// test.allocateProcess(processes)
// let pointer = test.Queue[0].queueHead
// while(pointer != null){
//     console.log(pointer.pid)
//     pointer = pointer.head
// }
// console.log(test.scheduleMLFQ().pid)
// console.log(test.Queue[0].queueHead.head.pid)