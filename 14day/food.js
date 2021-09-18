const { restaurantBusiness } = require("./opening");
class Food{
    employeeName = "";
    employeeObj;
    customerName = "";
    customerObj;
    food = "";
    cookingtime = -1;

    constructor(food, time){
        this.food = food
        this.cookingtime = time
    }

    setEmployee(name, Obj){
        this.employeeName = name
        this.employeeObj = Obj
    }

    setCustomerName(name, Obj){
        this.customerName = name
        this.customerObj = Obj
    }

    


    cook = () => {
        this.cookingtime--
        if(this.cookingtime == 0){
        restaurantBusiness.Queue.emit('mainboad', `${employeeName} - ${customerName}'s ${food} finished`);  
         
        customerObj.left["cooking"]-- // 고객이 주문한 음식 하나 마무리 했으므로 -1
        employeeObj.done(this) // 객체가 자기 자신을 보내는 법
        delete this //객체가 자기 자신을 지우는 법
        }
        /*
            해당 요리 끝 = 고객 요리 left - 1 요리 객체가 한다.
            종업원 공간 비우는 것도 한다
        */ 
    }
    

}

module.exports = { Food }
