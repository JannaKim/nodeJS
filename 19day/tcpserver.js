/*
1) UDP 서버와 클라이언트 요구사항
 
UDP 소켓을 직접 다루는 방식을 학습하고 다음과 같이 서버를 구현한다.
 
node에서 제공하는 네트워크 라이브러리를 활용한다.
 
JS: 노드 net.Socket 공식문서
 
0.0.0.0 (ANY) 주소와 12020 포트 번호를 bind 하는 서버를 구현한다.
서버 역할을 담당하는 클래스(또는 모듈)을 구현한다.
 
새로운 client가 접속하면 어떤 IP와 Port 번호에서 접속했는지 client 정보를 콘솔 로그로 출력한다.
 
UDP Client 에서는 HTTP 요청 메시지 형식에 맞춰서 패킷을 만들어서 서버로 전송한다.
위에 그림에는 URL만 표시되어 있지만, 해당 URL로 보내는 HTTP Request 자체를 만들어서 보내야 한다.

UDP 서버 소켓 주소와 포트 bind & listen

UDP Client 에서 HTTP Request 전송

HTTP Request 객체 수신

HTTP Request 메시지 전송 - Socket Client 동작

HTTP Response 수신 + 데이터 병합

HTTP Response 저장

HTTP 요청 주소 매칭 + 응답 찾기

HTTPS 요청 처리 결과 확인

등록된 Blocklist 차단 후 응답하기

*/

//들어온 사람 출력하기


import net from 'net' // 서버를 생성 
import analyzeData from './analysis.js' // 서버를 생성 

(() => { 
var server = net.createServer(function(socket){ console.log(socket.address().address + " connected to."); 

// client로 부터 오는 data를 화면에 출력. 이거 받을때마다 족족일까?
socket.on('data', function(data){ 
  console.log('connected client says :' + data); }); 

// client와 접속이 끊기는 메시지 출력 
socket.on('close', function(){ console.log('client disconnected.'); }); 
// client가 접속하면 화면에 출력해주는 메시지 
socket.write('I (server) responded to you! welcome to me (server)!'); 
socket.write(`I allowed you to connect with port num ... Your port num is .... My (server )IP address is ...`); }); 
// 에러가 발생할 경우 화면에 에러메시지 출력 
server.on('error', function(err){ console.log('err'+ err ); }); 
// Port 5000으로 접속이 가능하도록 대기 
server.listen(12020, function(){ console.log('listening on 12020..'); });
})() // 이거 js 실행하면 무조건 딱 한 번 실행된다.

// socket.io.listen(server).on('connection', function (socket) {
//     var address = socket.handshake.address;
//     console.log('New connection from ' + address.address + ':' + address.port);
//   });



/*
tcp/ip 프로토콜은 http와 어떻게 맞물려 동작하는 것일까?  그리고 무슨 차이가 있을까?

일단 가장 큰 차이점은 동작하는 계층이 다르다.

tcp/ip 는 transport 계층에서 동작한다. 

http는 application 계층에서 동작 한다. 이 계층에서 동작하는 프로토콜은 http  말고도 smtp, IMAP 등이 있다. 

 개념적으로 살펴 보자면 HTTP, HTTPS, FTP 등의 프로토콜은 TCP/IP  이 위에서 동작하는 거라고 볼수ㅣ있다.

그중 http는 tcp/ip 위에서 어떤 형태로 웹에서 작동할지를 정해놓은  통신프로토콜일 뿐이다. 이 프로토콜위에서  http (하이퍼텍스트)를 전송 하는 규약)임.

그리고 http 통신은 비동기 통신을 기본으로하여 연결성 X


*/


// import * as SocketIO from "socket.io";
// import * as http from "http";
// import * as https from "https";
// import * as express from "express";


// const handler = express();

// const httpServer = (useHttps) ?
//   https.createServer(serverOptions, handler) :
//   http.createServer(handler);

// const io = SocketIO(httpServer);
// httpServer.listen(port, () => console.log("listening") );
// io.on('connection', (socket) => onSocketIoConnection(socket));


// function onSocketIoConnection(socket: SocketIO.Socket) {      
//     // I usually create a custom kind of session object here.
//     // then I pass this session object to the onMessage and onDisconnect methods.
  
//     socket.on('message', (msg) => onMessage(...));
//     socket.once('disconnect', (reason) => onDisconnect(...));
//   }

