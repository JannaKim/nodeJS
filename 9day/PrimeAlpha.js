/*
불변성 Immutable 값이나 변수를 적극 활용할 수 있다.
 
함수가 참조 투명성을 지키고, 부작용을 줄일 수 있도록 구현할 수 있다.
 
순수함수 Pure Function 으로 구현할 수 있다.


중복된 코드는 줄이고, 불변성, 참조투명성, 순수함수로 동작하는 함수형 표현으로 최대한 개선한다.
*/

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


var prime1 = new PrimeAlpha(10);

var prime2 = new PrimeAlpha(7);



console.log(prime1.isPrime());

console.log(prime2.isPrime());
