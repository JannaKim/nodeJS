class ClassifierAlpha {

    number = 0;


    constructor(number) {

        this.number = number;

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


    isPerfect() {

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