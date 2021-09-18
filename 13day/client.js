const Application = require("./application_layer");
const table = require("./table");
const { log } = require("console");

table.IP.set("jk@boostcamp.connect.or.kr", "192.168.1.5");
table.IP.set("camper@boostcamp.connect.or.kr", "192.168.1.9");


const main = () => {
    log(table.IP.get("jk@boostcamp.connect.or.kr")); // set 안 꺼 가져오려면 .get() 
    log(table.MAC["192.168.1.10"]);
    //let App1 = new Application("192.168.1.5");
    // let App2 = new Application("192.168.1.9");


    //App1.encode("jk@boostcamp.connect.or.kr", "camper@boostcamp.connect.or.kr", "Hello World", "Hello BoostCamper,\r\n\tThis message written by JK.");

}

main();