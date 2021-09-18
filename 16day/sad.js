const https = require('https');

const requestHTTPS = (url) => {
	https
		.get(url, (res) => {
			let data = '';

			res.on('data', (d) => {
				data += d;
			});
			res.on('end', (d) => {
				getLinkHref(data);
			});
		})
		.on('error', (e) => {
			console.error(e);
		});
};

const getLinkHref = (data) => {
	const linkRegex = new RegExp(/<link[^>]+href\s*=\s*[\"']([^>\"']+)[\"'][^>]*>/g);
	console.log(data);
	while (linkRegex.test(data)) {
    // 용량잰다.
    
    console.log(RegExp.$1.trim());
  }
};

requestHTTPS('https://m.naver.com');

const linkRegex = /<link[^>]+href\s*=\s*[\"']([^>\"']+)[\"'][^>]*>/g;
const scriptRegex = /<script[^>]+src\s*=\s*[\"']([^>\"']+)[\"'][^>]*>/g;
const imgRegex = /<img[^>]+src\s*=\s*[\"']([^>\"']+)[\"'][^>]*>/g;

// const https = require('https')
// const requestHTTPS = (url) =>{
//     https
//         .get(url, (res) => {
//             let data = '';

//             res.on('data', (d) => {
//                 data += d;
//             });
//             res.on('end', (d) => {
//                 //console.log(data)
//                 getLinkHref(data);
//             });
//         })
//         .on('error', (e) => {
//             console.error(e);
//         });

// };

// function getLinkHref(data){
//     //console.log(data)
//     const imgRegex = /<img[^>]+src\s*=\s*[\“''']([^>\“''']+)[\“'][^>]*>/g;
//     console.log(imgRegex.test(data))
//     console.log(data.match(imgRegex))
//     while(imgRegex.test(data)) console.log('src:', RegExp.$1.trim());
// }

// requestHTTPS('https://m.naver.com')
// /*
//     '<meta name=\"twitter:description\" content=\"네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요\"/><link rel=\"stylesheet\" href=\"https://pm.pstatic.net/dist/css/nmain.20210803.css\"><link rel=\"stylesheet\" href=\"https://ssl.pstatic.net/sstatic/search/pc/css/sp_autocomplete_210318.css\"><link rel=\"shortcut icon\" type=\"image/x-icon\" href=\"/favicon.ico?1\"/><link rel=\"apple-touch-icon\" sizes=\"114x114\" href=\"https://s.pstatic.net/static/www/u/2014/0328/mma_204243574.png\"/><link rel=\"apple-touch-icon\" href=\"https://s.pstatic.net/static/www/u/2014/0328/mma_20432863.png\"/>\"'
// )
// */

// // https.get('https://www.naver.com/', (res) => {
// //   //console.log('statusCode:', res.statusCode);
// //   //console.log('headers:', res.headers);
// //     let data = '';
// //   res.on('data', (d) => {
// //     //process.stdout.write(d);
// //     data += d;
// //   });
// //   res.on('end', (d) => {
// //     getLinkHref(data);
// // });

// // }).on('error', (e) => {
// //   console.error(e);
// // });