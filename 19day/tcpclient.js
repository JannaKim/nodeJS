/*
udp - dgram
tcp - net
dns 찾기 - dns
파일입출력 - fs
*/

import net from 'net'

// 서버 5000번 포트로 접속 
var socket = net.connect({port : 12020}); socket.on('connect', function(){ console.log('connected to server!'); 
// 2초 간격으로 banana hong을 서버로 요청 
setInterval(function(){ 
    socket.write('client (I) am connected to server (ongoing)'); }, 2000); 
    console.log(`I connected you with port num ${this.localPort}, to your port num ${this.remoteAddress}. My IP address is ${this.localAddress}`);
    //console.log(`리모트 : ${this.remoteAddress} / ${this.remotePort}`);
}); 


// 서버로부터 받은 데이터를 화면에 출력 
socket.on('data', function(chunk){ console.log('recv:' + chunk); }); 


// 접속이 종료됬을때 메시지 출력 
socket.on('end', function(){ console.log('disconnected.'); }); 
// 에러가 발생할때 에러메시지 화면에 출력 
socket.on('error', function(err){ console.log(err); }); 
// connection에서 timeout이 발생하면 메시지 출력 
socket.on('timeout', function(){ console.log('connection timeout.'); });



/*

UDP 서버 소켓 주소와 포트 bind & listen


UDP Client 에서 HTTP Request 전송


HTTP Request 객체 수신


HTTP Request 메시지 전송 - Socket Client 동작


HTTP Response 수신 + 데이터 병합


HTTP Response 저장


HTTP 요청 주소 매칭 + 응답 찾기


HTTPS 요청 처리 결과 확인


등록된 Blocklist 차단 후 응답하기


HTTP Request 종류와 HTTP Response 종류에 대해 학습하고 정리한다.


운영체제에서 HTTP Proxy를 설정하고 웹 브라우저가 어떻게 동작하는지 확인한다.


리눅스 또는 CLI 환경에서 wget 이나 curl 명령 사용법을 학습하고, HTTP Proxy 동작을 대해 학습한다.


HTTP/2 규격과 HTTP/3 규격에 대해 학습하고 발전하는 과정을 토론한다.


네트워크로 요청을 보내고 응답을 받는 과정을 WireShark 같은 네트워크 패킷 분석 도구를 통해서 확인한다.


WireShark 도구가 동작하는 원리에 대해 학습한다.

*/