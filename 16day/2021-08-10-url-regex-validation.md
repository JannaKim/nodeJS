---
layout: post
title:  "url, regex, validation"
excerpt: "reviews"


categories:
  - Blog
tags:
  - [Blog, jekyll, Github, Git]

 
date: 2021-08-10
last_modified_at: 2021-08-10
---
<>
url 규격을 이해해야 웹 브라우저가 동작하는 방식을 이애하는 데 도움이 된다.

https://wsvincent.com/what-happens-when-url/


1. 웹 브라우저에 url 을 치면
2. 브라우저가 DNS 로 ip 주소를 받아서 도메인 주소를 찾는다. (Domain Name Server)
3. 브라우저가 서버에 http request 를 보낸다
4. 서버가 http response 를 보낸다
5. 브라우저가 html를 rendering 하기 시작한다
6. 브라우저가 html 에 embedded 된 추가 오브젝트들을 위해 서버에게 요청 보내는 걸 반복한다.
7. 페이지가 로드되면, 브라우저가 추가 async request 들을 필요한 만큼 보낸다.

추가 async는 상황에 따라다르다!
만약에 유저가 로그인 버튼을 눌렀다면 그때 다시 비동기 함수가 호출 될수도 있는 등.


예를들어 
https://naver.com 을 치면 DNS 가 naver.com 을 IP 주소와 맞춰준다.
다음에 브라우저가 http 요청 보내고 다시 서버에게 받는다.
그다음에 html 을 rendering 하면서 cs, js, img 등의 정보를 요청함 받음을 반복한다.

 Then once the page is loaded some sites (though not mine) will make further asynchronous requests. << ??

        HTML is the content (the skeleton bones), CSS is the style (the skin/hair), and JavaScript is the interactivity (the muscles that move around).


URI, URL, URNs?

        URI : Uniform Resource Identifier

        URI는 인터넷의 리소스를 식별하기 위한 문자열이다. location, name 등.

        ex) 어떤 사람고 사람 주소가 있으면 이 사람을 알기위해 둘 중 하나는 알아야겠다.



<br/>

        URL : Uniform Resource 'Locator'
        얘도 문자열인데 얘는 '주소만' 이다. 이 리소스가 어디있는 지만 표시한다.
        웹에서 주로 이거만 사용한다. 주소만 가지고 찾아갈 수 있기에.

<br/>
        URN: 이름만 가지고

URI는 둘중에 하나, URL는 주소, URN 는 이름

rmslRK URI 는 URL 이기도 하고 URN 이기도 한 거다!

URI는 두 클래스로 나뉘어져있어서 loc, name으로 나뉜다.
URN 은 같은 수가 있으니 쓰기에 효율적이지 않다.

그래서 거의 항상 URL을 쓴다.

localize 하기 위해 http messeges 가 서버에 전달되어야 한다. 자기 url 을 가지고.

어떻게 메세지를 보낼까? 브라우저에 타이핑해서!

url 은 두 개의 필요한 요소를 갖고 있다.

protocol : 연결하고자 하는 도메인과 연결하기 위해.
추사로 path, prot, others 도 가지고 있다.

http://www.mywebsite.com/register.php

http 가 프로토콜이다. 웹의 리소스를 요청하는 거면 이거로 보낸다.
파일 보내는 거면 FTP 쓴다.

www.mywebsite.com/ :  도메인. DNS 가 이 ip address에게 unique 하게 주는 것이다 이거대신 IP 주소로 찾아갈 수도 있다.
domain in the url is insensitive
:80/ 이 숨어있다.
is a type of softwart connection point used by the TCP/IP protocol and the connecting computer.

사람이 들어가는 문이랑 사람을 받는 문이랑 위치가 같아야 한다. 이게 port 다.


<img width="827" alt="image" src="https://user-images.githubusercontent.com/74404132/128842221-177e7740-fa4f-46b6-8198-a5beb3349850.png">

언급을 안한거면 default 포트 넘버로 향한단거고, http 의 default 는 80이다. <<  이거 이용하자
디폴트가 아닌 다른 포트 번호로 가려면 언급을 해줘야 하겠다.

/~/~ 는 path 이다.

디렉토리 형식 말고 다른 애들도 있다.

<img width="871" alt="image" src="https://user-images.githubusercontent.com/74404132/128842682-5f836a31-a27a-48c5-a5b1-6e9515d7fb8b.png">

요약 : 
<img width="1432" alt="image" src="https://user-images.githubusercontent.com/74404132/128842854-6efc05ea-d1d5-46a9-ad44-028e1ac3b476.png">

이걸 이제 요소별로 파싱을 해보자.



<img width="771" alt="image" src="https://user-images.githubusercontent.com/74404132/128843317-be88c385-fa1c-4952-8eba-8123a73d6993.png">



.com/abc < 이거 다음엔 쿼리, 프래그맨트, 하위 패쓰 세개중에 하나로만 이루어져있다

<img width="686" alt="image" src="https://user-images.githubusercontent.com/74404132/128852849-f3ee5aa4-bf30-4498-904e-463583e4172e.png">
저작권 : 피어 J031 https://github.com/bu-geon



그리고 이렇게 파싱한게 제대로 됐는지
jest 를 활용해서 테스트 함수를 7개 이상 짠다..


https://www.daleseo.com/jest-basic/







* * * 
정규표현식 다시 복습

가능한 url:

https:
http: 
www.abc.in
www.abc-.in
www.abc-adf.gov


www. 
