var customerState;
(function (customerState) {
customerState["runnable"] = "runnable";
customerState["running"] = "running";
customerState["waiting"] = "waiting";
customerState["blocked"] = "blocked";
customerState["cutTheMustard"] = "cutTheMustard"; // to succeed, to have the ability to do something.
})(customerState || (customerState = {}));

// chef occupancy time
//let exports = module.exports = {};
class Customer{
    customerId = "";
    state = customerState."runnable";
    left = {
        "cooking" : -1,
        "deliver" : 10
    }
    

    constructor(nmCooking){
        this.left["cooking"] = nmCooking;
    }

    get state(){
        return this.state;
    }

    get state(changedState){
        this.state = changedState;
    }

    cook = (menu, amount) => {
        
    }


}

/*
스레드를 생성하는 게 아니라 이벤트 전달 방식으로 동작해야 한다.
*/