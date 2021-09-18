'use strict'
async function a() {
	let j = 0;

	function hi(w) {
		for (let i = 0; i < 1000; ++i) w += 1;
		return w;
	}
	return await hi(j);
}

async function b(x) {
	let k = await a();
	return x + k;
}
// return new Promise((resolve) => {
// 	resolve(x + k);
//   })

// console.log(b(4));
// b(4).then(console.log);

b(4).then((value) => {
	console.log(value);
  })