웹 브라우저 개발자 도구에서 네트워크 탭의 동작을 따라서 구현

로컬 메모리 캐싱 방식으로 페이지 로딩이 빨라지는 지 확인한다.


미션

node 기반으로 콘솔에서 동작하는 프로그램을 작성한다.

웹 브라우저 개발자 도구 > 네트워크 탭에 나오는 것처럼 HTTP 요청을 보내고 받는 과정들을 분석한다.

 - > 요청받은 데이터에서 정규표현식으로 원하는 걸 찾는다.


 
분석 요구사항

웹 브라우저처럼 URL을 입력하면 해당 주소로 요청을 보낸다. // getUrl.js

http/https 모듈을 활용해서 요청을 보내고 응답을 받는다.

 https.request 메서드를 이용해서 https 요청을 보낼때 포트 번호를 https일 경우 443으로 줘야 한다고 한다. 무슨말일까.

HTML에 포함된 요소들 중에서 script 태그의 src 속성, img 태그의 src 속성에 있는 주소도 다시 요청을 보내서 받는다.

다시 요청 보내서 미리 용량 객체에 저장해놓기.



모든 요청을 보낸 시각, 요청에 대한 응답을 받은 시각, 다운로드가 끝난 종료 시각을 모두 기록한다.

요청부터 응답까지 시간을 응답 대기 시간으로 표기한다.

대기시간과 다운로드 시간?
TTFB 와 관련 돼 있다. 아래 링크를 적극 참고하겠다.

https://developer.chrome.com/docs/devtools/network/reference/


응답 시작부터 마지막까지 다 받은 시간을 다운로드 시간으로 표기한다. // total


https://blog.risingstack.com/measuring-http-timings-node-js/

TTFB 시간이란?


DNS (Domain Name Servers): DNS is a hierarchical decentralized naming system used to resolve human-readable hostnames like risingstack.com into machine-readable IP addresses.

IP 주소 사람이 읽을 수 있는 도메인



timeline of HTTP request

DNS Lookup: Time spent performing the DNS lookup. DNS lookup resolves domain names to IP addresses. Every new domain requires a full round trip to do the DNS lookup. There is no DNS lookup when the destination is already an IP address.

TCP Connection: Time it took to establish TCP connection between a source host and destination host. Connections must be properly established in a multi-step handshake process. TCP connection is managed by an operating system, if the underlying TCP connection cannot be established, the OS-wide TCP connection timeout will overrule the timeout config of our application.

TLS handshake: Time spent completing a TLS handshake. During the handshake process endpoints exchange authentication and keys to establish or resume secure sessions. There is no TLS handshake with a not HTTPS request.

Time to First Byte (TTFB): Time spent waiting for the initial response. This time captures the latency of a round trip to the server in addition to the time spent waiting for the server to process the request and deliver the response.

Content Transfer: Time spent receiving the response data. The size of the response data and the available network bandwidth determinates its duration.


<구현 계획>

<img width="724" alt="image" src="https://user-images.githubusercontent.com/74404132/128691523-52bef130-b194-47d1-8ea9-91b50e8af113.png">


처음에 url 인풋 한 번만 받는다.

크롤링 순 ( 리다이렉션 된 순) 으로 network처럼 헤더정보 출력한다.
대기시간, 다운로드 시간은 시간을 재는 것일까? // new Date() 앞뒤로 쓰겠다.

도메인 개수

요청 개수 : 219개 // 숫자가 안맞는 이유는, 요청은 이만큼 했지만, 아래 형식이 아닌 요청을 했기 떄문인 것 같다.

이미지(png, gif, jpg) 개수 : 152개

코드(css, js) 개수 : 28개

전송 용량 : 6.93MB // 1글자당 1byte 로 계산.

리다이렉트 개수 : 1개 // .com 으로 끝나느 진짜 하이퍼링크 찾는다.

전체 로딩 시간 : 444ms // 이게 total



가장 큰 용량 : tpfxef.png 3.12MB

가장 오랜 대기 시간 : m.naver.com 43.3ms

가장 오랜 다운로드 시간 : tpfxef.png 1314.4ms

// 위 셋은 수시로 min, max 해준다.



<해야할 목록>

각각 모듈을 최대한 나뭐보자.

URL 입력 후 HTTP 요청 보내기 구현 // + 2

HTML 파싱 - src 속성 탐색 구현 // + 1

응답 대기 시간 측정 및 출력 // -

다운로드 시간 측정 및 출력 // -

요청 도메인 개수 측정 및 출력 // -

전체 요청 개수 측정 및 출력

전체 이미지 개수 측정 및 출력

전체 코드 개수 측정 및 출력

전체 전송 용량 측정 및 출력

리다이렉트 개수 측정 및 출력

응답 - 리소스 메모리 캐싱 구현 // 1

캐싱 데이터 측정 및 출력 // 1

* Httpanalysis '가' 캐시메모리 이용해야 할 것같아.
맵에 들어있는지보고 들어있으면 cache hit! 띄우고 

* if url in map
map[url] 둘다 써야하나? 
그럼 저거 타임 둘다 받아야하는 거 아닌가?

        function charOccurances(str) {
        var myMap = {};
        if(str.length!==0){
            for (let i = 0; i < str.length; i++) {
            myMap[str[i]] = (myMap[str[i]] || 0) + 1;
            }
        }
        return myMap;
        }

<img width="752" alt="image" src="https://user-images.githubusercontent.com/74404132/128704007-c1d38562-2916-4956-956f-577bcbd23072.png">


const str = "AbABaaaa";
console.log(charOccurances(str));

도메인 개수 : HeaderManager() 얘가 파서 받아서 하나씩 뭔지 파악하고 저장한다.

요청 개수 : 219개

이미지(png, gif, jpg) 개수 : 152개

코드(css, js) 개수 : 28개

 * 뭐가 css 이고 뭐가 js 인지 어떻게 알아? 정규표현식으로.
 HTTPS, HTTP 노드 코어 내장 모듈


먼저 string 받고 용량 출력하고 한 줄씩 리퀘스트 받는거라 퍼리하는 부분을 다른 모듈 함수로.
한줄씩 가져다주고 정보 수집은 거기서 하기.

리다이렉트 개수 : 1개
리다이렉트를 어떻게 하지? 리다이렉트 주소 나오는 족족 에미터로 기다려야 할 것 같은데? 가능할까?
300 status? 난 status 못받는 것 같다. 




TopFeatures 구조체 하나도 만들어서 여기다 저장하자.

가장 큰 용량 : tpfxef.png 3.12MB
Lsrgest = max(Largest, this)

가장 오랜 대기 시간 : m.naver.com 43.3ms

가장 오랜 다운로드 시간 : tpfxef.png 1314.4ms


<img width="614" alt="image" src="https://user-images.githubusercontent.com/74404132/128775307-8d415740-78a7-41d9-913f-5f4d6527d740.png">