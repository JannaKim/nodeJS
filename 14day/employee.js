const { restaurantBusiness } = require("./opening");

class Employee{
    name;
    job;
    ability;

    constructor(name, job, limit){
        this.name = name
        this.job = job
        this.ability = new Array(limit) // 안에 요리 객체
        for(let i = 0; i < limit; ++i)
            this.ability[i] = null
            
    }

    work = (food) => {
        for(let i = 0; i < limit; ++i){ // 요리나 배달 할 수 있는 공간에 객체 넣음
            if(this.ability[i] === null) continue
            this.ability[i] = food
            break
        }
    }

    idle = () => { //요라 배달 할 수 있는 지 파악하기
        for(let i = 0; i < limit; ++i){ 
            if(this.ability[i] == null) return true // 빈 공간 있다
        }
        return false
    }

    done = (food) =>{
        for(let i = 0; i < limit; ++i){ // 해당 요리 완료. 공간 비움
            if(this.ability[i] === food){
                this.ability[i] = null
                break
                
            }
        }
    }


}

module.exports = { Employee : Employee }