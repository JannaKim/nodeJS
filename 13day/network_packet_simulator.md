/*
TCP는 계속해서 통신을 확인하면서 데이터를 준다

1. TCP 연결 수립 과정
TCP를 이용한 통신들: 웹 통신, 파일 전송, 게임

'연결 수립 과정'은 프로세스와 프로세스를 연결하기 위해 '가장 먼저 수행되는 과정'이다. 
이 과정이 먼저 전달 된 다음에야 데이터가 전달되기 시작한다.

항상 클라이언트가 요청을 보낸다.

### 3 way hand - shake

    1. '클라이언트가' 서버에게 연결해도 되냐고 요청 패킷을 보낸다.
    2. 서버도 클라이언트한테 같이 요청을 받아들인다. 연결해도 된다고 패킷을 보낸다.
    3. 클라이언트가 이를 최종적으로 수락하는 패킷을 보낸다. 

핸드쉐이크 과정에서 SYN / SYN+ACK / ACK 절차와 각각 연속 번호와 ACK 번호 규칙을 확인한다.


    <img width="888" alt="image" src="https://user-images.githubusercontent.com/74404132/128266366-cb467ecc-12ad-4f17-8486-d49dacffd667.png">

ex) 클라이언트 : 크롬, 웹 서버 프로그램: 아파치, 톰캣, 엔진X. 이 프로그램을 써볼건데,
다음, 네이트: 아파치, 네이버: 엔진X 쓰고 있다. 

<img width="839" alt="image" src="https://user-images.githubusercontent.com/74404132/128266894-5e3371ae-8b61-49ec-882d-e9e2ccd714b8.png">
먼저 클라이언트에서 패킷을 만들어 보낸다.
TCP 인캡슐레이션 하고, IPv4 인캡슐레이션 하고, 이더넷을 인캡슐레이션 한다.

인캡슐레이션이란?
PC에서 다른 PC로 데이터를 전송할 때 데이터를 패키지화 하는 과정

<img width="404" alt="image" src="https://user-images.githubusercontent.com/74404132/128267859-54b10d4e-efc7-4812-b9cb-fa44520549aa.png">
데이터: 보내고 받는 데이터
데이터를 4계층인 세그먼트로, 3계층인 패킷으로, 2계층인 프레임으로 감싼다.


지금은 단순히 연결하는 과정이기 때문에, TCP 뒤 쪽에 페이로드는 없다. 
<img width="50" alt="image" src="https://user-images.githubusercontent.com/74404132/128268068-56b31640-7032-4386-ac0d-d3125f04663a.png">

출발지 포트 번호는 뭐가될 지 모르겠디. 사용자 포트 중에 아무거나 쓴다. 
목적지 포트 번호는 16진수로 쓰긴 했는데 80번 포트이다. 웹으로 요청하는 거니까

<img width="275" alt="image" src="https://user-images.githubusercontent.com/74404132/128267084-89ed483a-2cf0-44e6-b6d1-513f6f643ccc.png">
SYN번호, ACK번호

<img width="275" alt="image" src="https://user-images.githubusercontent.com/74404132/128267237-eca24a4c-96f3-475c-b744-b4e753a7ed80.png">
헤더 길이는 원래 TCP 20byte인데 4로 나눠서 5로 표시한다. ??
resolved. 사용 안한다.

<img width="272" alt="image" src="https://user-images.githubusercontent.com/74404132/128267315-e9589a30-f7b8-47f3-890e-d16745f82664.png">
플래그: 지금은 sync flag가 셋팅이 돼 있는 거다
윈도우

check sum, adj pointer

중요한거: sync flag가 셋팅이 돼 있고, SYNC번호와 ACK번호가 셋팅이 돼서 간다.

<img width="241" alt="image" src="https://user-images.githubusercontent.com/74404132/128268223-0f11d659-fc5d-4dad-ace5-7597719712bb.png">

<img width="252" alt="image" src="https://user-images.githubusercontent.com/74404132/128268248-71793077-5587-4b3c-92ab-cfa305fc00b1.png">

<img width="515" alt="image" src="https://user-images.githubusercontent.com/74404132/128268286-6cdd03b0-744e-4bc0-a30e-db2ae4bad992.png">


서버가 요청을 받았으면 디캡슐레이션 해서 내용을 확인한다.
플래그 값을 확인하고, 나한테 연결 요청을 하는 거라 알아차린다.

SYN와 ACK가 같이 세팅이 돼 있는 것이다. : 12
<img width="571" alt="image" src="https://user-images.githubusercontent.com/74404132/128268458-e1546910-6a9c-45ea-ae37-86cc8c307bbf.png">

<img width="843" alt="image" src="https://user-images.githubusercontent.com/74404132/128268620-b12f4c0e-747d-4977-8270-8bde242500bc.png">

<img width="869" alt="image" src="https://user-images.githubusercontent.com/74404132/128268688-11744128-f600-4092-a24a-ccd760290df8.png">
마지막으로 대답만 한다. : 10

네트워크 보안까지 가면, SYN, ACK도 알아야 한다.
이 부분 계산할 줄 알앙 한다.
저 값만 계산해서 할 수있는 네트워크 공격이 있다. sessionize kin?, DOS공격

<img width="1770" alt="image" src="https://user-images.githubusercontent.com/74404132/128268856-a02f8457-4344-46b0-9023-d6cf706ad0f4.png">

처음에 S: 100, A : 0 보통 S에 랜덤값, A에 0 세팅 돼서 간다. 이랬을 때 받는 쪽에서 이 값과 동기화를 시킨다
SYNC: 서로의 상태를 계속 동기화 시키는 것, 그 동기화를 컴퓨터를 이 번호를 가지고 한다.

<img width="877" alt="image" src="https://user-images.githubusercontent.com/74404132/128269172-e0160776-304f-41f4-9b27-6869137d9d8d.png">
A = 받은 S + 1
얘도 S 처음 보내는 거니 자기만의 랜덤한 값을 보낸다.
  
<img width="883" alt="image" src="https://user-images.githubusercontent.com/74404132/128269403-1d272113-0e58-4090-bb48-f7befc2657f7.png">
대각선으로 +1 이 된다.

중요한거: 마지막 답장은 S가 받은 ACK번호를 그대로 보낸다.

한번 왔다갔다 했으면 동기화가 된거라서 서버에서 받은 ACK번호를 SYN로 그대로 사용한다.

누군가가 저 동기화면 값을 계산해서?

<img width="893" alt="image" src="https://user-images.githubusercontent.com/74404132/128269660-7cec7f53-9e65-4e4e-ad83-57424545207b.png">

이 3way hand-shake다음에 클라이언트가 보낸다.

이 과정은 연결 수립하는 과정. 클라이언트가 서버에게 뭘 달라고 요청을 해야한다.
이랬을때 다른 클라이언트가 저 값을 계산해서 서버한테 보내면 서버가 걔랑 통신하게 된다
 : session hijacking

네이버에 로그인해서 인터넷 하는데 그 연결을 뺏어왔다면? 뺏어간 사람은 아이디 패스워드 없이 로그인한 페이지를 그대로 가져가는 것
악용될 수 있는 기술

해커는 프로그램으로 저걸 계산을 한다.

Base64 인코드/디코드

바이너리 데이터를 텍스트 문자열 형식으로 바꾸는 가장 고전적인 방식은 Base64 인코딩/디코딩 방식이다. 
여전히 메일이나 웹에서 사용하는 MIME 형식에 Base64 방식을 사용한다. 통계적으로 33-36% 정도 오버헤드가 발생할 수 있다.

데이터는 Base64 테이블
바이너리
*/


TCP가 아니라 UDP 방식으로 처리하려면 어떤 부분이 달라지는 지 토론한다.

4계층 프로토콜 중에서 비 연결지향형인 UDP 프로토콜

1. UDP 프로토콜이 뭔지, 어떤 역할을 하는지
2. UDP 프로토콜을 사용하는 대표적인 프로그램: tftpd
3. tftpd 사용해 데이터 공유해보기

1. UDP(User Data Protocol) = Universal Datagram Protocol
비연결지향형이라서 전송방식이 너무 단순하다. 연결 상태에서 데이터를 전달하는 게 아니기 때문에 신뢰성이 낮다.
데이터를 전달할 때 문제가 생기면, UDP는 검증, 재전송 요청을 할 수 없다
UDP 프로토콜은 간단하게 생겼다. 

PORT가 같으면 응용 프로그램이 같아질까? PORT가 달라도 응용 프로그램이 같을 수 있을까 토론한다.
