var deliveryState;
(function (deliveryState) {
deliveryState["runnable"] = "runnable";
deliveryState["running"] = "running";
deliveryState["waiting"] = "waiting";
deliveryState["blocked"] = "blocked";
deliveryState["cutTheMustard"] = "cutTheMustard"; // to succeed, to have the ability to do something.
})(deliveryState || (deliveryState = {}));

class DeliveryMan{
    name = "delivery man ";
    _state = deliveryState."runnable";
    

    constructor(name){
        this.name += String(name)
    }

    get state(){
        return this._state;
    }

    get state(changedState){
        this._state = changedState;
    }

    cook = (menu, amount) => {
        
    }


}