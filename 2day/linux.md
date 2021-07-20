운영체제 OS 설계시 시스템의 목표가 잘 정의돼 있어야 한다.
목표에 따라 다양한 알고리즘과 전략을 체택하기 때문이다.

리눅스 OS를 까는 것은, 프로그램들이 실행할 수 있는 다른 환경을 만들어 주는 것이다.


OS는 몇가지 주요한 관점에서 바라볼 수 있다.
1. 어떤 서비스를 제공하는 지
2. 유저, 프로그래머를 위한 어떤 인터페이스가 제공되는 지
  어떻게 제공되고 어떤 디버깅 방법이 있는지
3. 구성요소, 상호연결

<img width="526" alt="view of OS" src="https://user-images.githubusercontent.com/74404132/126280676-1946da67-7216-41d2-b91f-7bbf9e0c8866.png">


## 인터페이스란?
  a shared boundary across which two or more separate components of a computer systems exchange information.

1. 소프트웨터 인퍼페이스
  운영체제 <-> 응용프로그램(App), App <-> App, App를 구성하는 객체, 클래스, 메소드등이 "서로 커뮤니케이션할 수 있도록 메세지를 주고 받는 방법" 등을 미리 정해 놓은 것.

  API: 응용프로그램 간에 호환이 가능하도록 상호작용을 하는 방법을 정해놓은 것. 즉, API(Application Programming Interface)는 App 간에 데이터를 주고 받는 방법이다.

2. 유저 인퍼테이스
  유저들이 컴퓨터와 상호 작용하는 시스템
  interpreters 는 shells 로 알려져 있다.

  CLI(Command Line Interface = command interpreter)
  어떤 OS는 command interpreter 자체에 command를 실행하는 코드가 있다.
  * 유닉스는, implements most commands through system commands!
  즉, 유닉스의 command interpreter는 command를 이해하지 못한다.

  유닉스의 command interpreter 실행 과정:
  rm file.txt
    1. 메모리에 로드시켜 실행할 실행파일 rm 을 찾는다.
    2. 파라미터 file.txt를 가지고 실행한다.

  그러면 command는 file rm code에 그대로 따라서 정의되는 것이다.

  그래서 프로그래머사 파일 만들어서 새 커맨드를 쉽게 만들 수 있다!


## 커널이란
  the core, privileged executive that manages "all system resources" and interacts directly with "hardware".

***

# Linux 이해하기. 
  1. Linux's main system libraries of Linux were originated by the GNU project.
  gcc(GNU C compiler) 를 리눅스에서 바로 이용할 수 있다.
    cf) 윈도우는 gcc가 깔려있지 않기 때문에 직접 gcc를 설치해야 한다.


  2. 리눅스의 구성요소들은 Internet FTPC(file - transfer - protocol) archive sites 에 있다.

  File System Hiearchy Standard: the overall layout of a standard Linux file system
  
  리눅스는 configuration files, libraries, system libraries, run-time data 어디에 저장 돼 있는지를 이 규격에 따른다.


  3. Linux Licensing
    리눅스 제배포시 source code를 무조건 포함해야하는 license가 있다.
    GPL(General Public License)내에서 release 된 소프트웨어는
    binary-only product 만으로는 제배포 될 수 없다.

  4. Design Principles of Linux
    디자인 목표에는 속도, 능률, 기준의거가 있다.
    리눅스는 최근에 속도, 능률보다 "standardization" 에 집중한다.

    POSIX standards 란 서로 다른 OS 양상에 set of specifications를 구성한 기준이다.

    Linux는 
    1. POSIX document
    2. POSIX standard
    3. POSIX threading(Pthreads)
    4. POSIX extensions
    에 따른다. 

  5. user utilities
    UNIX standard: shell
    LINUX standard: bash

  6. Process Management: fork() and exec()

  7. Scheduling
    Linux 는 다른 모든 Unix 시스템과 같이 비선점 방식이다.

  8. linux scheduling 의 두 관점
    1. 유저 프로세스의 실행, 인터럽트
    2. the running of various kernel tasks
      실행 프로세스와 커널 작업(ex I/O)을 둘다 하는 것




## 쉘 

1. 쉘 이란
  인터프리터. OS와 대화하는 프로그램
  LINUX standard: bash
  Mac : zsh 도 좋다

Shell(쉘)은 운영체제상에서 사용자가 입력하는 명령을 읽고 해석하여 대신 실행해주는 프로그램이다. 즉 다시말해서, 운영체제의 커널과 사용자 사이를 이어주는 역할을 하며 사용자의 명령어를 해석하고 운영체제가 알아들을 수 있도록 도와주는 명령어 해석기이다. Linux에서 사용하는 Shell의 종류로는 다음과 같은 것들이 있다.

bash : Bourne-Again Shell(프롬프트 : #, 경로 : /bin/bash). 가장 대표적으로 사용.
sh : Bourne Shell(프롬프트 : $, 경로 : /bin/sh)
csh : C Shell(프롬프트 : %, 경로 : /bin/csh)
ksh : Kron Shell(프롬프트 : $, 경로 : /bin/ksh)
tcsh : TENEX C Shell(프롬프트 : >, 경로 : /bin/tcsh)


2. 리눅스 디렉토리들
  /
  /home
  /boot
  /home/ubuntu
  /bin
  /etc

3. 명령어

<img width="481" alt="commands" src="https://user-images.githubusercontent.com/74404132/126301876-bc33328e-9acb-4d3e-a5e6-3109f4c5b1cb.png">
  

4. 쉘 스크립트 
<img width="866" alt="shell scrpit" src="https://user-images.githubusercontent.com/74404132/126279838-1b19e1ec-58ed-4897-842d-1f6ed778de8d.png">


Shell Script(쉘 스크립트)란 Shell(쉘)에서 사용할 수 있는 명령어들의 조합을 모아서 만든 배치(batch)파일이다. 
batch interface: there commands and directives to control those commands are entered into files
 즉, 운영체제의 Shell을 이용하여 한줄씩 순차적으로 읽으면서 명령어들을 실행시켜주는 인터프리터 방식의 프로그램이다. Shell Script를 활용하여 원하는 간추린 명령을 만들고 쓸 수 있다.

환경 변수 설정은 현재의 세션에만 유효합gkek. 모든 세션에 적용하기 위해서는 .bashrc나 .profile 같은 설정 파일에 선언해야 한다.

#!/bin/bash를 적어주었는데 이것은 Unix 계열 Shell Script 파일의 필수적인 구문이다. 


5. 쉘 스크립트 문법

리눅스에서 사용되는 명령어는 모두 대소문자를 구분한다.
* * *

1. echo: 출력 read: 입력

 기본적으로 echo명령이실행되고 나면 줄바꿈이 되어 진다. 줄바꿈을 하지않고 출력하려면 

  echo -n 변수 

  echo "~" $SUER


2. sh *.sh // 스크립트파일 만들기
echo some-text > filename.txt
vi tst.txt :wq

3. 변수 
처음 할당시 자동으로 변수가 생성된다.
숫자를 넣어도 문자로 취급한다
변수를 대입할 때는 = 좌우공백이 없어야한다
test=7+5

변수는 $를 앞에 붙여서 나타내는데, $문자가 들어간 글자를 출력하귀 위해서는 ""로 묶는다


var=Hi
echo $var
echo "$"

<img width="392" alt="쉘환경변수연습" src="https://user-images.githubusercontent.com/74404132/126287469-a8b1bc03-74d4-4045-9253-a79deb4bc4ca.png">


sh variable.sh

    % var=$#       
    % echo "num=$#"
num=0
    % echo "parameter: $0 $1 $2 $3"
parameter: zsh   
    % echo "parameters: $@"         
parameters: 
    % echo "var=$var"
var=0
    % echo 'var=$var'
var=$var
    % echo var='ls'

sh variable.sh 1 a "b"


* * * 

4. 리눅스 권한

<img width="372" alt="리눅스 파일 권한" src="https://user-images.githubusercontent.com/74404132/126284697-ab70c0d3-b5ab-4c3e-b75e-99fc7443738a.png">



<img width="335" alt="리눅스권한" src="https://user-images.githubusercontent.com/74404132/126286571-61b42e9f-cc98-47a5-9f03-0494076f2985.png">


5. 리다이렉션 redirection

쉘어서 입력과 출력의 방향을 바꾸는 명령어
표준입력 0: 키보드
표준입력 1: 터미널
표준에러 2: 터미널 화면

// > : 표준입력을 지정파일로
// < : 키보드 대신 파일로부터 입력받음
// 2> : 표준 에러를 지정 파일로
// 2>&1 :표준 에러를 표준 출력으로
// 1>&2 : 표준 출력을 표준 에러로

./my.sh > log.txt 2>&1


6. 파이프: fork exec 함수의 분리가 이걸 가능하게 해준다.
ps -A | grep ssh

ps -ef // 프로세스 목록 조회
ps -ef|grep hugo|awk '{print $1, $2, $3, $8}'


쉘 스크립트에서 백틱 사이의 명령은 실행되고 그 결과가 앞에 명령에 입력된다.
kill -9 `ps -ef|grep hugo|awk '{print $2}'` // pid는 kill에 전달되어 종료된다

pgrep -f hugo // ps, grep 명령어 결합
// hugo는 Go 언어로 만들어진 정적 사이트 생성기이다. 빌드시간이 빠르고 안정적인 특징을 갖고 있다.

7. 키보드 입력을 만든 변수에 담기 : read
read input
echo $input

<img width="1156" alt="문법" src="https://user-images.githubusercontent.com/74404132/126302590-f575be0d-4e31-470a-b559-5f664b299e9b.png">

    


## 리눅스 설치가 필요한 이유

리눅스/유닉스 개발 환경은 백엔드 개발자들에게 익숙한 개발 환경이다.
터미널로 서버 환경에 원격으로 접속해서 원하는 작업을 할 수 있도록 친숙해져야 한다.
리눅스 / 유닉스의 역사부터 쉘 환경에 익숙해지고 스크립트로 원하는 동작을 자동화할 수 있어야 한다.


<br/>

### 단계별 명령어, 스크린 캡쳐, 진행 과정, 실행 결과를 설명하는 문서
#### 컴파일한 바이너리 실행파일은 제외.



1. 리눅스 설치: ubuntu 20.04

https://mirror.kakao.com/ubuntu-releases/20.04/ 에서 desktop ver 다운로드.

<img width="1218" alt="l1" src="https://user-images.githubusercontent.com/74404132/126297085-3550c2f8-6ee9-4c27-90c0-eb5a007c934c.png">

리눅스는 일반적으로 RDP 프로토콜을 지원하지 않아 그래픽 데스크톱 환경에서 띄우기 위해 
VNC, XRDP, XDMCP와 같은 프로토콜을 사용해야 하며 연결이 가능해지도록 일련의 설정을 해주어야 한다. 




2. 가상 환경에 원격으로 접속할 수 있도록 ssh을 설정, root 계정 이외에 본인 접속할 계정을 추가.

### 원격 접속은 중요하고 필수적인 작업이다.

리눅스 서버를 구축한다면 터미널이나 GUI 환경을 통해 여러가지 작업을 진행할 수 있다.
대부분의 리눅스 서버는 회사에서 사내 서버로서 한 장소에 묶어두거나, 호스팅 업체 및 클라우드 호스팅 등의 다양한 구성으로 이루어 졌기에 멀리 떨어져있다.

서버작업 처리를 위해 매번 갈 수 없고, 서버가 점차 많아지게 되면
각각으 ㅣ서버로 이동하여 일일이 모니터를 연결할 수가 없다. 

#### 다양한 원격 접속 프로그램을 사용하여 원격지에 있는 서버에 굳이 찾아가지 않고 해당 서버의 주소(IP 등)만 알고 있다면 다른 PC를 통해 바로 접속할 수 있다.

리룩스도 마찬가지다.

### 이러한 원격 접속을 이용하여 터미널 환경을 사용할 수 있도록 고안된 프로토콜이 
### Rlogin, Telnet, SSH 이다. 

우리가 흔히 접하는 프로그램인 Xshell, PuTTY, iTerm, SecureCRT는 
" 윈도우에서 원격 리눅스 서버로 터미널 접속 프로토콜을 사용하여 연결할 수 있도록 도와주는 " 터미널 에뮬레이터 클라이언트인데, 리눅스 내에서 실행되는 터미널 또한 마찬가지로 터미널 에뮬레이터로 불린다.
" 실존하는 것이 아닌 가상으로 구현된 복제품 "이기 때문이다. 

기존의 터미널과 다른점: 기존 터미널은 포괄적으로 볼 수 있는 컴퓨터와 사용자 간의 소통을 위한 인터페이스이다. 




3. 본인 계정 패스워드 설정

4. 로컬 컴퓨터에서 가상환경 리모트 컴퓨터에 ssh로 접속해서 본인계정으로 로그인

5. 본인 계정에서 /backup 디렉토리를 생성하고 764 모드로 접근권한 바꿔서,
본인 계정으로 /backup 경로 아래에 파일을 생성할 수 있도록 설정한다.


chmod 764 test.txt
  : user group others 권한을  rwe rw r 로 바꾼다.


chmod: 변경하고자 하는 권한과 파일명을 명시하여 실행한다
리눅스 파일 권한 확인: ls -l

rwe : read, write, execute
4 2 1

-: 파일
d: 디렉토리

3개씩 끊어서 본다.
앞 3개: 소유자의 권한
중간 3개: group에 대한 권한
뒤 3개: others에 대한 권한


440: user, group에 대해서만 read 권한을 부여

700: user의 모든 권한을 부여하고 group과 others는 모든권한을 제외

+x: 실행권한 추가 부여
g+w: group에 write권한 부여
o-rwx: others의 모든 권한 박탈



6. 가상 환경에 오늘 날짜 + 서울 시간대로 지정해서 로컬과 가상 환경이 동일하도록 맞춘다.

7. 가상 환경에서 터미널을 열고 date 명령으로 오늘 날짜를 출력한 상태로, 화면을 캡쳐한다.

8. 가상 환경에 node.js v14.x 를 설치하고 버전을 확인한다.

9. set.js 파일을 복사해서 실행한다.





<br/>




<br/>
