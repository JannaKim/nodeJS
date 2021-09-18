![image](https://user-images.githubusercontent.com/74404132/129174545-3eab8e56-c54d-46cf-9ebe-e66626c1c362.png)

![image](https://user-images.githubusercontent.com/74404132/129177667-b2f641c8-c816-47b2-8d62-00a4cb47c048.png)

외부의 다른 웹 서버를 찾아서 요청을 보내고 응답을 받아서 화면에 표시하기까지 흐름을 이해하는 게 중요하다.

dns 쿼리는 dnsSync.resolve() 를 사용한다.?

http request messege 에는 뭐가 필요할까?

client 만들면
무조건 내 프록시 서버로 받게하고
그 프록시 서버가 갖다주는 걸로 하자.

get request 함수 따로 만들어서
보내는 url랑 진짜 보내는 내 포트랑 따로 또 잘라서 작업해서 내 프록시 서버로 보내도록하자

net 쓰면 안된다며 왜 net.Socket 은 돼?

http 메세지의 끝은 보통 \r\n\r\n으로 끝난다.
한줄이나 두줄 더 띄어쓰기 해줘야 한다.

UDP 서버에서 bind되는 포트는 하나로 고정입니다. 클라이언트에서 접속할때 사용하는 포트는 높은 번호에서 랜덤으로 선택됩니다.
그리고 클라이언트가 서버와 다른 PC에 있어도 동작할 수 있으니 IP도 다를 수 있다고 생각합니다.

정상적으로 전송되었는지 WireShark 같은 네트워크 분석 도구에서 확인한다. (옵션)