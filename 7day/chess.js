function Piece(name, color, value, row, col) {
       this.name = name;
       this.color = color;
       this.value = value;
       this.col = col;
       this.row = row;
    }
    

function Piece(type, side) {
        this.type = type;
        this.side = side;
    }
        
var PT_EMPTY = 0;
var PT_PAWN = 1;
    
if (board[row][col].type==PT_PAWN) {



    왜 필요한가?

    객체지향 프로그래밍은 이제 대부분의 프로그래밍 언어에 구현되어 있고, 많은 개발자들이 사용하는 보편적인 프로그래밍 패러다임이다. 클래스 단위로 일반적인 내용을 추상화하고, 더 구체적인 클래스를 만드는 방법을 학습하는 것은 중요하다.
    
    
    학습 목표
    
    작은 역할을 하는 클래스부터 조금씩 더 복잡한 클래스를 만들면서 객체지향 설계와 객체지향 프로그래밍 패러다임을 연습하는 것이 목표다.
    
    1단계 Pawn과 Board 클래스, 2단계 Bishop와 Rook 클래스를 추가하고, 3단계 Queen, Knight 클래스를 구현한다. 각각 다른 파일로 저장한다.
    
    더 작은 단위나 반복되는 코드가 있다면 일반화해서 별도 클래스로 구현해야 한다.
    
    
    미션
    
    단계별로 진행할 때마다 소스 파일을 gist에 저장한다.
    
    프로그램을 구현할 때 입력 → 검증 → 처리/계산 → 형식 → 출력 단계를 구분한다.
    
    프로그램을 시작하면 King을 제외한 흑/백 체스말을 초기화한다.
    
    프로그램을 동작하는 동안, 반복해서 입력을 받는다.
    
    움직이려는 말이 있는 위치와 이동하려는 위치를 차례 입력받아서 말을 이동한다.
    입력값은 말이 있는 위치 2자리 문자와 -> 화살표와 이동하려는 위치 2자리 문자를 입력받는다. 형식에 맞지 않으면 다시 입력받는다.
    예시) B2->B3 : B2에 있던 Pawn을 B3로 이동한다.
    
    만약 흑 또는 백 체스말이 상대편 말이 있던 곳으로 이동해서 잡는 경우는 현재 체스판 점수를 출력한다.
    
    입력값이 ?물음표로 시작하면 해당 위치에 있는 말이 움직일 수 있는 경우를 모두 출력한다.
    단, 자신과 같은 색의 말이 가리고 있는 경우는 멈춘다.
    예시) A1에 흑색 Rook가 있고, C3에 흑색 Bishop이 있는 경우 ?A1 : "A2,A3,A4,A5,A6,A7,A8,B1"
    예시) F1에 흑색 Bishop이 있고, E2와 G2에 흑색 Pawn이 있는 경우 ?F1 : "없음"
    
    체스말을 이동하는 명령은 백색부터 시작해서, 흑과 백이 번갈아서 입력해야 한다. 입력할 때마다 체스판 현황을 출력한다.
    
    
    체스판과 체스말 요구사항
    
    Board는 8x8 (가로 rank x 세로 file) 크기 체스판에 체스말(Piece) 존재 여부를 관리한다.
    
    
    
    
    Board는 현재 있는 말을 확인해서 흑과 백 점수를 출력한다.
    색상별로 Pawn 1점, Bishop와 Knight 3점, Rook 5점, 퀸은 9점으로 계산한다.
    
    Board는 모든 말의 위치를 간접적으로 알 수 있고, display() 함수는 1-rank부터 8-rank까지 rank 문자열 배열로 보드 위에 체스말을 표시한다.
    흑색 Pawn는 ♟ U+265F, Knight는 ♞ U+265E, Biship은 ♝ U+265D, Rook는 ♜ U+265C, Queen은 ♛ U+265B를 빈 곳은 "."을 표시한다.
    백색 Pawn는 ♙ U+2659, Knight는 ♘ U+2658, Biship은 ♗ U+2657, Rook는 ♖ U+2656, Queen은 ♕ U+2655를 빈 곳은 "."을 표시한다.
    예를 들어 초기화 상태에 Rook, Bishop, Queen만 있는 경우 1-rank는 "♜♞♝.♛♝♞♜" 가 된다.
    
    특정 위치에 특정 말을 생성하는 initPiece(type, position) 함수를 구현한다.
    초기화할 때 1,2-rank는 흑백 체스말이, 7,8-rank는 백색 체스말이 위치한다.
    체스말 초기 위치가 아니면 생성하지 않는다.
    이미 해당 위치에 다른 말이 있으면 생성하지 않는다.
    체스말 종류별로 최대 개수보다 많이 생성할 수는 없다.
    Pawn는 색상별로 8개. Bishop, Rook는 색상별로 2개, Queen는 색상별로 1개만 가능하다.
    생성하지 않는 경우는 exception 예외처리로 상위에서 어떤 예외상황인지 판단한다.
    
    특정 말을 옮길 때는 Board에서 제공하는 move(from, to) 함수를 사용한다.
    같은 색상의 말이 to 위치에 다른 말이 이미 있으면 옮길 수 없다.
    말을 옮길 수 있으면 true, 옮길 수 없으면 false를 리턴한다.
    만약, 다른 색상의 말이 to 위치에 있는 경우는 기존에 있던 말을 제거하고 이동한다.
    다른 색상의 말을 제거한 경우는 흑과 백 점수를 출력한다.
    
    체스말은 위치값을 Position 타입으로 갖는다.
    꼭 Position 값을 다루기 위한 데이터 구조를 별도로 만든다.
    Position은 file은 A부터 H까지, rank는 1부터 8까지 입력이 가능하다.
    file과 rank 값은 enum으로 선언한다.
    
    체스말은 흑Black 또는 백White 둘 중에 하나여야 한다. 
    상태값으로 지정한다면 생성할 때 결정하고 변경할 수 없어야 한다.
    타입으로 구분한다면 다형성으로 동작하도록 한다.
    
    체스말은 현재 위치 Position을 기준으로 이동할 수 있는 모든 위치를 리턴하는 possiblePositions() 함수를 제공한다.
    다른 말이 있는지 여부는 판단하지 않는다.
    
    
    Pawn 타입 요구사항
    
    생성 위치는 흑색은 2-rank 또는 백색 7-rank에만 가능하다.
    
    백색은 더 작은 rank로 움직일 수 있고, 흑색은 더 큰 rank로 움직일 수 있다.
    
    체스 게임과 달리 처음에도 1칸만 움직일 수 있고, 다른 말을 잡을 때도 대각선이 아니라 직선으로 움직일 때 잡는다고 가정한다.
    
    
    Bishop 타입 요구사항
    
    생성 위치는 흑색은 C-1 과 F-1 에만 가능하고, 백색은 C-8 과 F-8 에만 가능하다.
    
    모든 색상이 놓여진 칸을 기준으로 대각선으로만 움직일 수 있다.
    
    
    Rook 타입 요구사항
    
    생성 위치는 흑색은 A-1 과 H-1 에만 가능하고, 백색은 A-8 과 H-8 에만 가능하다.
    
    모든 색상이 놓여진 칸을 기준으로 좌-우 또는 위-아래 방향으로 움직일 수 있다.
    
    
    Queen 타입 요구사항
    
    생성 위치는 흑색은 E-1에만 가능하고, 백색은 E-8 에만 가능하다.
    
    모든 색상이 놓여진 칸을 기준으로 대각선이 좌-우, 위-아래 방향으로 움직일 수 있다.
    
    
    Knight 타입 요구사항
    
    생성 위치는 흑색은 B-1 과 G-1 에만 가능하고, 백색은 B-8 과 G-8 에만 가능하다.
    
    모든 색상이 놓여진 칸을 기준으로 전진1칸+대각선1칸으로만 움직일 수 있다.
    
    체스 게임과 달리 전진하는 칸이 막혀있으면 움직일 수 없다.
    
    
    실행 예시
    
    Result


    that.addOptionStyles = function(cell, userSettings){
		var stg = {
			attackable: true,
			movable: true
		};        
		CHESSAPP.utils.extend(stg, userSettings);

		if(stg.attackable){
			CHESSAPP.utils.addClass(cell.reference, "attackable");
		}

		if(stg.movable){
			CHESSAPP.utils.addClass(cell.reference, "movable");
		}
    };
    
    that.switchTurn = function(){
        if(_settings.turn == "W"){
            _settings.turn = "B";
        }else{
            _settings.turn = "W";
        }
    };
    
    that.setUpBoard = function(){
        if(that.pieces){
            //reset pieces
            delete that.pieces;
        }
        //create pieces
        that.pieces = [
        {
                x: 0,
                y: 0,
                color: 'B',
                pieceType: "rook"
        },
        {
            x: 0,
            y: 7,
            color: 'W',
            pieceType: "rook"
        },
        {
            x: 7,
            y: 0,
            color: 'B',
            pieceType: "rook"
        },
        {
            x: 7,
            y: 7,
            color: 'W',
            pieceType: "rook"
        },
        {
            x: 4,
            y: 7,
            color: 'W',
            pieceType: "king"
        },
        {
            x: 4,
            y: 0,
            color: 'B',
            pieceType: "king"
        },
        {
            x: 6,
            y: 0,
            color: 'B',
            pieceType: "knight"
        },
        {
            x: 1,
            y: 0,
            color: 'B',
            pieceType: "knight"
        },
        {
            x: 6,
            y: 7,
            color: 'W',
            pieceType: "knight"
        },
        {
            x: 1,
            y: 7,
            color: 'W',
            pieceType: "knight"
        },
        {
            x: 5,
            y: 0,
            color: 'B',
            pieceType: "bishop"
        },
        {
            x: 2,
            y: 0,
            color: 'B',
            pieceType: "bishop"
        },
        {
            x: 5,
            y: 7,
            color: 'W',
            pieceType: "bishop"
        },
        {
            x: 2,
            y: 7,
            color: 'W',
            pieceType: "bishop"
        },
        {
            x: 3,
            y: 0,
            color: 'B',
            pieceType: "queen"
        },	
        {
            x: 3,
            y: 7,
            color: 'W',
            pieceType: "queen"
        }
        ];
        //add pawns
        for(var p = 0; p < 8; p++)
        {
            that.pieces.push({
                x : p,
                y: 1,
                color: 'B',
                pieceType: "pawn"
            });
        }
        for(var p = 0; p < 8; p++)
        {
            that.pieces.push({
                x : p,
                y: 6,
                color: 'W',
                pieceType: "pawn"
            });
        }
        //set initial numOfMoves to 0
        for(var i = 0; i < that.pieces.length; i++){
            that.pieces[i].numOfMoves = 0;
    
        }
        CHESSAPP.ui.drawPieces(that.pieces,that.cells);
        that.updateOptions();
    };
    that.clearAllOptionStyles = function(){
        for(var y = 0; y < 8; y++){     
            for(var x = 0; x < 8; x++){
                CHESSAPP.ui.clearOptionStyles(that.cells[x][y]);
            }
        }
    };


    set initial location? default - Y / manual - N 

    B2->B3

    incorrect form . try again

    력값이 ?물음표로 시작하면 해당 위치에 있는 말이 움직일 수 있는 경우를 모두 출력한다.
단, 자신과 같은 색의 말이 가리고 있는 경우는 멈춘다.
예시) A1에 흑색 Rook가 있고, C3에 흑색 Bishop이 있는 경우 ?A1 : "A2,A3,A4,A5,A6,A7,A8,B1"


특정 위치에 특정 말을 생성하는 initPiece(type, position) 함수를 구현한다.
초기화할 때 1,2-rank는 흑백 체스말이, 7,8-rank는 백색 체스말이 위치한다.
체스말 초기 위치가 아니면 생성하지 않는다.
이미 해당 위치에 다른 말이 있으면 생성하지 않는다.
체스말 종류별로 최대 개수보다 많이 생성할 수는 없다.
Pawn는 색상별로 8개. Bishop, Rook는 색상별로 2개, Queen는 색상별로 1개만 가능하다.
생성하지 않는 경우는 exception 예외처리로 상위에서 어떤 예외상황인지 판단한다.