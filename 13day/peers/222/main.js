import {
    applicationLayer,
    presentationLayer,
    sessionLayer,
    transportLayer,
    networkLayer,
    dataLinkLayer,
    physicalLayer
} from "./layer.js";

/* 데이터 */

let from = "jk@boostcamp.connect.or.kr";
let to = "camper@boostcamp.connect.or.kr";
let title = "Hello World"
let file = "Hello BoostCamper,\n\tThis message written by JK.\n";

/* 송신 */

let application = applicationLayer(from, to, title, file);
let applicationMessage = application.message();
application.log()();

let presentation = presentationLayer(applicationMessage);
let presentationMessage = presentation.message();
presentation.log()();

let session = sessionLayer(presentationMessage);
let sessionMessage = session.message();
session.logMessage()();

let transport = transportLayer(sessionMessage);
let segment = transport.segment();
transport.logSegment()();

let network = networkLayer(segment);
let packet = network.packet();
network.logPacket()();

let dataLink = dataLinkLayer(packet);
let frame = dataLink.frame();
dataLink.logFrame()();

let physical = physicalLayer(frame);
let bit = physical.bit();
physical.logBit()();

/* 수신 */

let physical2 = physicalLayer(bit);
let frame2 = physical2.frame();
physical2.logFrame()();

let dataLink2 = dataLinkLayer(frame2, true);
let packet2 = dataLink2.packet();
dataLink2.logPacket()();

let network2 = networkLayer(packet2);
let segment2 = network2.segment();
network2.logSegment()();

let transport2 = transportLayer(segment2);
let message2 = transport2.message();
transport2.logMessage()();

let session2 = sessionLayer(message2);
let sessionMessage2 = session2.message2();
session2.logMessage2()();

let presentation2 = presentationLayer(sessionMessage2);
let presentationMessage2 = presentation2.message2();
presentation2.logMessage2()();

let application2 = applicationLayer(presentationMessage2);
let applicationMessage2 = application2.message2();
application2.log2()();

/* 수신 끝 */