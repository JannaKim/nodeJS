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

console.log(await b(4));