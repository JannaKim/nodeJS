import { v4 as uuidv4 } from "uuid";
import { writeFileSync } from "fs";

export const applicationLayer = (from, to, title, file) => {
    const data = `From: ${from}\r\n` + `To: ${to}\r\n` +
        `Title: ${title}\r\n` + `\r\n` + file;

    const datas = from;

    return {
        message: () => data,
        message2: () => datas,
        log: () => () => console.log(data),
        log2: () => () => {
            console.log("From:", datas[0]);
            console.log("To:", datas[1]);
            console.log("Title:", datas[2]);
            console.log();
            console.log(JSON.stringify(datas[3]));
        }
    };
}

export const presentationLayer = (message) => {
    const file = message.split("\r\n").slice(4).join("\r\n");
    const fileBase64 = Buffer.from(file).toString("base64");
    const data = message.split("\r\n").slice(0, 4).join("\r\n") + "\r\n" + fileBase64;

    const data2 = message;

    return {
        message: () => data,
        message2: () => {
            return data2.split("\\r\\n").map((e, i) => {
                if (i === 3) {
                    writeFileSync("./attachment.file", Buffer.from(e, "base64").toString("utf8"));
                    return Buffer.from(e, "base64").toString("utf8");
                };
                return e;
            });
        },
        log: () => () => console.log(data),
        logMessage2: () => () => {
            console.log(">> 수신 데이터");
            console.log(data2);
            console.log();
            console.log("디코딩 데이터 파일 :", "attachment.file");
        }
    };
}

export const sessionLayer = (datas) => {
    const session = uuidv4();
    const data = datas.split("\r\n").slice(0, 3).join("\r\n") + "\r\n" +
        `Session-Id: ${session}` + "\r\n" +
        datas.split("\r\n").slice(3).join("\r\n");

    const upMessage = datas.split("\\r\\n").join("\r\n\cut").split("\cut");

    return {
        message: () => data,
        message2: () => JSON.stringify(upMessage.slice(0,3).concat(upMessage.slice(5)).join("")),
        logMessage: () => () => console.log(data),
        logMessage2: () => () => {
            console.log(">> 수신 데이터");
            console.log(JSON.stringify(upMessage.slice(0,3).concat(upMessage.slice(5)).join("")));
            console.log();
            console.log("Session-Id :", upMessage[5]);
        }
    };
}

export const transportLayer = (datas) => {
    const data = datas;
    const segments = Array(Math.ceil(datas.length / 100)).fill()
        .map((_, i) => data.slice(100 * i, 100 * (i + 1)))

    const sendPacket = (packet, sPort, dPort, sSequence, dSequence) => {
        return [packet, sPort, dPort, sSequence, dSequence, 0];
    }

    const receivePacket = (packet, sPort, dPort, sSequence, dSequence, fSequence) => {
        return [packet, sPort, dPort, fSequence ? fSequence : sSequence, dSequence, 0];
    }

    const sendData = (packet, sPort, dPort, sSequence, data, segmentation) => {
        return [packet, sPort, dPort, sSequence, segmentation, data.length, JSON.stringify(data).slice(1, -1)]
    }

    const sendPacketLog = (packet, sPort, dPort, sSequence, dSequence) => {
        console.log(">> Sending Packet :", packet);
        console.log("source Port :", sPort);
        console.log("Destination Port :", dPort);
        console.log("Sequence Number :", sSequence);
        console.log("Ack Number :", dSequence);
        console.log("Content-Length :", 0);
        console.log([packet, sPort, dPort, sSequence, dSequence, 0]);
        console.log();
    }

    const receivePacketLog = (packet, sPort, dPort, sSequence, dSequence, fSequence) => {
        console.log(">> Received Packet :", packet);
        console.log("source Port :", sPort);
        console.log("Destination Port :", dPort);
        console.log("Sequence Number :", sSequence);
        console.log("Ack Number :", dSequence);
        console.log("Content-Length :", 0);
        console.log([packet, sPort, dPort, fSequence ? fSequence : sSequence, dSequence, 0]);
        console.log();
    }

    const sendDataLog = (packet, sPort, dPort, sSequence, fSequence, data, segmentation) => {
        console.log(">> Sending Packet :", packet);
        console.log("source Port :", sPort);
        console.log("Destination Port :", dPort);
        console.log("Sequence Number :", fSequence);
        console.log("Segmentation :", segmentation)
        console.log("Content-Length :", data.length);
        console.log([packet, sPort, dPort, sSequence, segmentation, data.length, JSON.stringify(data).slice(1, -1)]);
        console.log();
    }

    const message = Array.isArray(datas) ? datas.map(e => e[2]) : undefined;

    return {
        segment: () => {
            let result = [];

            let sPort = 10000;
            let dPort = 8080;
            let sSequence = 10;
            let dSequence;
            result.push(sendPacket("SYN", sPort++, dPort, sSequence++, dSequence));
            dSequence = 100;
            result.push(receivePacket("SYN+ACK", dPort, sPort, ++dSequence, sSequence));
            result.push(sendPacket("ACK", sPort, dPort, sSequence, dSequence));
            let fSequence = ++sSequence;
            segments.forEach((e, i) => {
                fSequence += e.length;
                result.push(sendData("DATA", sPort, dPort, sSequence, e, i !== segments.length - 1));
                result.push(receivePacket("ACK", sPort, dPort, fSequence, ++dSequence, sSequence));
                sSequence++;
            });
            return result;
        },
        message: () => message.filter(e => e[0] === "DATA").map(e => e[e.length - 1]).join(""),
        logSegment: () => () => {
            console.log(`>> 요청 데이터\n${JSON.stringify(data).slice(1, -1)}\n`);

            let sPort = 10000;
            let dPort = 8080;
            let sSequence = 10;
            let dSequence;
            sendPacketLog("SYN", sPort++, dPort, sSequence++, dSequence);
            dSequence = 100;
            receivePacketLog("SYN+ACK", dPort, sPort, ++dSequence, sSequence);
            sendPacketLog("ACK", sPort, dPort, sSequence, dSequence);
            let fSequence = ++sSequence;
            segments.forEach((e, i) => {
                fSequence += e.length;
                sendDataLog("DATA", sPort, dPort, sSequence, fSequence, e, i !== segments.length - 1);
                receivePacketLog("ACK", sPort, dPort, fSequence, ++dSequence, sSequence);
                sSequence++;
            });
        },
        logMessage: () => () => {
            message.forEach(e => {
                console.log(">> Received Packet:", JSON.stringify(e));
                if (e[0] === "SYN" || e[0] === "SYN+ACK" || e[0] === "DATA") receivePacketLog(...e);
                else sendPacketLog(...e);
                console.log();
            })
        }
    };
}

export const networkLayer = (data) => {
    const sourceIp = "192.168.1.5";
    const destinationIp = "192.168.1.9";
    const packet = data.map(e => [sourceIp, destinationIp, e]);

    const segment = data.map(e => e[2]).filter(e => e[1] === destinationIp);

    return {
        packet: () => packet,
        segment: () => segment,
        logPacket: () => () => {
            packet.forEach(e => {
                console.log(">> 요청", JSON.stringify(e[2]));
                console.log(JSON.stringify(e));
                console.log();
            });
        },
        logSegment: () => () => {
            segment.forEach(e => {
                console.log(`>> 요청 ${e}`);
                console.log("발신 IP 주소 =>", sourceIp);
                console.log("수신 IP 주소 (일치) =>", destinationIp);
                console.log();
            })
        }
    }
}

export const dataLinkLayer = (data, rec) => {
    const sourceMac = "3C:5A:B4:6F:EA:DC";
    const destinationMac = "3C:5A:B4:93:01:4B";
    const frame = data.map(e => [sourceMac, destinationMac, e]);

    const packet = rec ? data.map(e => JSON.parse(e)).filter(e => e[1] === destinationMac) : undefined;

    return {
        frame: () => frame,
        packet: () => packet,
        logFrame: () => () => {
            frame.forEach(e => {
                console.log(">> 요청", JSON.stringify(e[2]));
                console.log(JSON.stringify(e));
                console.log();
            })
        },
        logPacket: () => () => {
            packet.forEach(e => {
                console.log(`>> 요청 ${e}`);
                console.log("수신 MAC 주소 (일치) =>", destinationMac);
                console.log("발신 MAC 주소 =>", sourceMac);
                console.log();
            })
        }
    };
}

export const physicalLayer = (data) => {
    const bit = data.map(e => {
        return JSON.stringify(e).split("").map(v => v.charCodeAt(0));
    }).reduce((pre, val) => [...pre, ...val], []);

    const frame = data.map(e => String.fromCharCode(e))
        .join("").split("][").join("]\cut[").split("\cut");

    return {
        bit: () => bit,
        frame: () => frame,
        logBit: () => () => console.log(bit),
        logFrame: () => () => {
            frame.forEach(e => {
                console.log(">> 전달받은 프레임 값을 다시 문자열로 바꿔서 출력한다.");
                console.log(e);
                console.log();
            })
        }
    };
}