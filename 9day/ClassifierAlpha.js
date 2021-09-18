/*
불변성 Immutable 값이나 변수를 적극 활용할 수 있다.
 
함수가 참조 투명성을 지키고, 부작용을 줄일 수 있도록 구현할 수 있다.
 
순수함수 Pure Function 으로 구현할 수 있다.


중복된 코드는 줄이고, 불변성, 참조투명성, 순수함수로 동작하는 함수형 표현으로 최대한 개선한다.

2^{{n-1}}\cdot (2^{n}-1)={\frac  {M_{n}(M_{n}+1)}2} 즉, 짝수 완전수와 메르센 소수 사이에는 일대일 대응이 있다는 것이 밝혀졌다.

*/


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
    isPerfect() { // 자기 뺀 자기 인수들의 합이 자기 자신이다

        return (ClassifierAlpha.sum(this.factors()) - this.number) == this.number 

    }


    isAbundant() {

        return (ClassifierAlpha.sum(this.factors()) - this.number) > this.number 

    }


    isDeficient() {

        return (ClassifierAlpha.sum(this.factors()) - this.number) < this.number 

    }


    static sum(factors) {

        var total = 0;

        factors.forEach( (factor) => {

            total += factor;

        });

        return total;

    }

}


var alpha1 = new ClassifierAlpha(10);

var alpha2 = new ClassifierAlpha(6);



console.log(alpha1.isPerfect());

console.log(alpha2.isPerfect());
console.log(alpha2.factors());