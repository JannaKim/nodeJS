import PCB, {state} from './PCB.js'

export default class Kernel{
    PCBs;
    constructor(){
        this.PCBs = new Array();
    }

    jobScheduled(process){
        this.PCBs.push(process)
    }
    async getPCBs(){ // 실제로 이렇게 들어간 순서대로 출력할 수 있는 기능이 있나?
        let outs = []
        const res = this.PCBs.reduce( (acc, cur) => { // ex) A(terminated), 3 / 3sec
            let state = cur.procState
            let time;
            time = cur.accountingInfo.getUsedTime()
            outs.push(`${String.fromCharCode(65 + cur.pid)}(${state}), ${time} / ${cur.getBurstTime()}sec`) 
        }, [] );
        
        return outs;
    }
}

// let test = new Kernel();
// for(let i = 0; i < 2; ++i) {
//     test.jobScheduled(new PCB(i,i));
// }

// console.log(test.getPCBs())