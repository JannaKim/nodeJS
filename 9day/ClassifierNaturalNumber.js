/*
앞서 작성한 자연수 분류 ClassifierAlpha, PrimeAlpha 를 이용해서 2-100까지 자연수 중에서 완전수(perfect), 과잉수(Abundant), 부족수(Deficient), 소수(Prime) 목록을 출력한다.

map, filter, reduce 고차 함수를 활용한다.

출력을 위해서는 반드시 클로저(또는 람다)를 선언하고 반복문 대신 reduce를 활용해서 출력해야 한다.

자연수 중에서 다른 자연수의 제곱으로 표현되는 정사각수(squared) 판단 함수를 추가한다. 


reduce 는 배열만큼 돈다
이 배열을 어떻게 만들어? 클로저로

*/

// reduce 는 누적값이다.

{/* <전략>
1. for문 인자용 리스트를 만들고, for 문 사용하는 곳 전부에 리스트 인자를 순서대로 사용하는 식으로 reduce 돌린다. */
}

// 두번째 클로저 재귀
function shrink(n){ // 음, 양, 0 셋중에 파악하기
    function shrinkInner(k){
    if(Math.abs(k) < 2){
        return k; // 얘가 제일 줄인 숫자
    }
    return shrinkInner(k / 2); // 재귀로 계속 줄이기
    }
    return shrinkInner(n);
}
// 1.3  -1.3 0
// 클로저 재귀로 음, 양, 0 셋중에 파악하기
// console.log(shrink(10))
// console.log(shrink(-10))
// console.log(shrink(0))

class ClassifierAlpha {

    number = 0;


    constructor(number) {

        this.number = number;

    }    


    isFactor(potentialFactor) { // 소인수인가

        return this.number % potentialFactor == 0; 

    }


    factors() {

        var factorSet = new Set(); // filter. set 쓰는 이유 제곱수 때문에.

        for (var pod = 1; pod <= Math.sqrt(this.number); pod++ ) {

            if (this.isFactor(pod)) { //나눠 떨어지면 짝을 저장한다. 짝이라는 건 제곱수까지 만들어진다.

                factorSet.add(pod);

                factorSet.add(this.number / pod);

            }

        }

        return factorSet;

    }

// 이거 세계 커링으로 return 음 0 양으로 무엇인지 결정
    determine() { // 자기 뺀 자기 인수들의 합이 자기 자신이다

        // [ - - - - ] [   ] // - 0 +
        // -1 0 1
        var state = ClassifierAlpha.sum(this.factors()) - 2 * this.number
        return Math.round(shrink(state))

    }
    // 1 3


    static sum(factors) {

        var total = 0;

        factors.forEach( (factor) => {

            total += factor;

        });

        return total;

    }

}






class PrimeAlpha {

    number = 0;


    constructor(number) {

        this.number = number

    }


    equalSet(aset, bset) {

        if (aset.size !== bset.size) return false;

        for (var a of aset) if (!bset.has(a)) return false;

        return true;

    }


    isPrime() {

        var primeSet = new Set([1, this.number]);

        return this.number > 1 && this.equalSet(this.factors(), primeSet);

    }


    isFactor(potentialFactor) {

        return this.number % potentialFactor == 0;

    }


    factors() {

        var factorSet = new Set();

        for (var pod = 1; pod <= Math.sqrt(this.number); pod++ ) {

            if (this.isFactor(pod)) {

                factorSet.add(pod);

                factorSet.add(this.number / pod);

            }

        }

        return factorSet;

    }

}


/*

[1,2,3,4,5]
1, 5
5 4 3 2 1
1 2 3 4 5

1 2 3 4 5

2 3 4 5 6
*/
// 클로저 재귀함수로 range lo ~ hi list 생성.
function listProducer(lo, hi){ 
    let newList = []
    function numberProducer(L, mn, mx){ // 이너 두번째 인자가 정답이다. 얘를 키워키워 가져간다.
        function numberProducerInner(k, accum){
        if(k == mn - 1){
            return accum; // 얘가 내가 만들고자 한 리스트의 완성본.
        }
        accum.push(mx + mn - k) // 뒤에꺼부터 만들면서 가져가는데 k 값을 작게 설정해놔야 재귀가 끝을 맺을 것이다.
                            // k와 mx가 짝이 되는 숫자를 푸시하면 큰수 부터 내림차순으로 리스트에 들어간다.
        return numberProducerInner(k - 1, accum);
        }
        return numberProducerInner(hi, L);
    }
    return numberProducer(newList, lo, hi)
}

// lo, hi 가 정답용 2~ n 이 있고, for 문 돌리기용 1~ sqrt(n) 1 ~ n. 즉 여러개가 있다
// 범위 조정용으로 커링과 위 클로저 함수를 합성하겠다.

function create(method){ // method 에다가, 내가 문제풀이를 위해 쓰는 증가 인자들이 다 + 1 씩이라서 내가 만든 listProducer 밖에 안넣지만, 
    // 응용하면 range j 씩 점프하는 리스트 등 사용 할 수 있다. 
    // 내림파순 리스트도 만들수 있는데, 이건 method 함수에서 인자받는 곳에 뭘 좀 더 넣어줘야함 
    return function(v1){
      return function(v2){
        return method(v1, v2)
      }
    }
}
// 1[2,3,4]

let increaseBy1 = create(listProducer) // 오름차순 리스트 생성함수, 시작점 끝점 내가 조정하겠다는 뜻

const List = increaseBy1(2)(30)
//console.log(List)

// const List2 = increaseBy1(4)(17)
// console.log(List2)

// 커링과 함수 합성 다양하게? 이용하기
let from1_increaseBy1 = increaseBy1(1) // range list 생성기인데 무조건 1부터 해주겠단 뜻

let OnetoN = from1_increaseBy1(13)
//console.log(OnetoN)


// from1increaseBy1(pod)
// from1increaseBy1(sqaureof(pod))





function search(instance){ // method 에다가, 내가 문제풀이를 위해 쓰는 증가 인자들이 다 + 1 씩이라서 내가 만든 listProducer 밖에 안넣지만, 
    // 응용하면 range j 씩 점프하는 리스트 등 사용 할 수 있다. 
    // 내림파순 리스트도 만들수 있는데, 이건 method 함수에서 인자받는 곳에 뭘 좀 더 넣어줘야함 
    return function(v1){
      return function(v2){
        return method(v1, v2)
      }
    }
}


// const List = increaseBy1(2)(200)
//[1,2,3,4,5,6]
const info = ['deficient', 'perfect', 'abundant']
const info2 = ["", 'prime']
const res = List.reduce( (acc, cur) => { // acc 가 숫자별 답, cur이 현재 어떤 숫자 계산하는 지
    var alpha = new ClassifierAlpha(cur);
    //console.log(alpha.determine());
    var prime = new PrimeAlpha(cur);
    var prime_res = prime.isPrime()? 1 : 0 
    //console.log(prime.isPrime());
    // [[1], [2], [undefined], [4], [5]] -1 0 1
    console.log(cur, ':', info[alpha.determine() + 1], ',',info2[prime_res])
    return acc; // acc 안쓴다. 서로 연결이 안돼있기때문.
}, [] );

res;



// var alpha1 = new ClassifierAlpha(10);

// var alpha2 = new ClassifierAlpha(6);



// console.log(alpha1.determine());

// console.log(alpha2.determine());
// console.log(alpha2.factors());


// var prime1 = new PrimeAlpha(10);

// var prime2 = new PrimeAlpha(7);



// console.log(prime1.isPrime());

// console.log(prime2.isPrime());


/*
불변성 Immutable 값이나 변수를 적극 활용할 수 있다.
 
함수가 참조 투명성을 지키고, 부작용을 줄일 수 있도록 구현할 수 있다.
 
순수함수 Pure Function 으로 구현할 수 있다.


중복된 코드는 줄이고, 불변성, 참조투명성, 순수함수로 동작하는 함수형 표현으로 최대한 개선한다.

2^{{n-1}}\cdot (2^{n}-1)={\frac  {M_{n}(M_{n}+1)}2} 즉, 짝수 완전수와 메르센 소수 사이에는 일대일 대응이 있다는 것이 밝혀졌다.

*/


