// 'use strict'
// // /*
// // js executes code block in order after "hoisting". 
// // hoisting : var, function declaration
// // 그 뒤 순서대로 실행이 된다.
// // */
// // function printImmediately(print) { // 콜백 받아서 콜백을 바로 실행한다
// //     print()
// // }

// function printWithDelay(print, timeout) {
//     setTimeout(print, timeout);
// }

// // console.log('1')
// setTimeout( () =>
//     console.log('2')
// , 1000) // 지정한 시간이 지나면 콜백함수를 호출하는 것.
// // // 콜백함수? 전달해준 함수를 나중에 불러주는 것
// // console.log('3') 

// // // 콜백도 두 가지의 경우로 나눠진다.
 

// // //동기적으로 실행하는 synchronous callback,

// // printImmediately(() => console.log('hello'))


// // //비동기적으로 실행하는 asynchronous callback - 언제 실행될 지 모르는 비동기적 콜백

// // f(() => 3)
// // let func = f()
// // setTimeout(func, 1000)




// printWithDelay( () => 7, 2000);
// // //  

// let person = {
//     name : 'John Doe',
//     getName: function(v){ // 객체 안에 함수 넣는 법
//         return v}
// }

// // setTimeout(person.getName(8), 1000)// 객체 안의 요소만 따로 가져온다.
// // console.log(person.getName(8))

// //객체의 한 인자에 함수를 넣는 법:

// let hi = function(v) {
//     return v + 1
// }

// let hello = ( (v) => {return v})
// console.log(hi(1))
// console.log(hello(3))

// let yellow = ( (...param) => 
//             {
//                 return param[1]
//             })
// console.log(yellow(10, 19))

let print  = ( (...el) => { (el.forEach( (...param) => console.log(param[0]) ) )})
print(1,2,3,4)


// forEach 반복문은 Array, Map, Set 에서 사용가능한 메서드이다

// let enumu =new Map(1,2,3);
// enumu.forEach( (el, idx, arr) => { console.log(el) } );





setTimeout( () =>
    console.log('2')
, 1000) // 지정한 시간이 지나면 콜백함수를 호출하는 것.
// 콜백함수? 전달해준 함수를 나중에 불러주는 것
console.log('3') 

// 콜백도 두 가지의 경우로 나눠진다.
 

//동기적으로 실행하는 synchronous callback,

// printImmediately(() => console.log('hello'))


//비동기적으로 실행하는 asynchronous callback - 언제 실행될 지 모르는 비동기적 콜백

// f(() => 3)
// let func = f()
// setTimeout(func, 1000)


let obj = {
    hi : async () => {console.log(1) }
}

let a = ( () =>{
    let c = async() => {
     return await setTimeout(obj.hi(), 1000)
    }
    return c
}
)

a()


let func = ( (n) => {
    let num = new Promise( (resolve, reject) => {
        if(n > 10){
            resolve('y')
        }
        else reject('no')
    }

    )
    return num


})

func(4).then(console.log(1)).catch(err => {console.log(err)})