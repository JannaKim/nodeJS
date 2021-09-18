
class CpuSchInfo{
    head;
    constructor(){
        this.head = null;
    }

}

class AccountingInfo{
    usedTime;
    constructor(){
        this.usedTime = 0;
    }

    accumulateUsedTime(){
        this.usedTime += 1;
    }
    getUsedTime(){
        return this.usedTime;
    }
}

// var state = Object.freeze({create : 0, ready : 1, running : 2, terminate : 3})
export const state = Object.freeze({ready : 'ready', running : 'running', waiting : 'waiting', terminated : 'terminated'})

let pidCreator = 0;
export default class PCB {
    accountingInfo = new AccountingInfo();
    //cpuSchInfo = new CpuSchInfo();
    pc;
    pid;

    procState;
    
    #burstTime; // private field
    waitingTime;
    responseTime; // waitingTime + 첫번째 출력
    turnaroundTime; //burstTime + 
    head;


  constructor (...args) {// (burstTime) { // dummy has its own pid -1
    
    this.accountingInfo = new AccountingInfo();
    this.cpuSchInfo = new CpuSchInfo();
    this.pc = 12345;
    if(parseInt(args.length) === 1){
        this.pid = pidCreator++;
        this.#burstTime = parseInt(args[0]);
    }
    else{
        this.pid = parseInt(args[0]);
        this.#burstTime = parseInt(args[1]);
        
    }
    this.head = null;
    
    this.procState= state.ready;
    this.waitingTime = 0;
    this.responseTime = 0; // waitingTime + 첫번째 출력
    this.turnaroundTime = 0; //burstTime + 
    

  }
  getBurstTime(){
      return this.#burstTime
  }

  /*
  char *mem; // 프로세스 메모리 시작 주소
  uint sz; // 프로세스 메모리의 크기
  char *kstack; // 이 프로세스의 커널 스택의 바닥 주소
  enum proc_state state; 프로세스 상태 enum 어떻게 쓰더라
  int pid; // 프로세스 id
  struct proc *parent; // 부모 프로세스
  void *chan; // 0이 아니면, chan 에서 수면
  int killed; // 0이 아니면 종료됨
  struct file *ofile[NOFILE]; // 열린 파일
  struct inode *cwd; // 현재 디렉터리
  struct context context; // 프로세스를 실행시키려면 여기로 교환
  struct trapframe *tf; // 현재 인터럽트레 해당하는 트랩 프레임
  */
}

//module.exports = { state };
// exports.state = state