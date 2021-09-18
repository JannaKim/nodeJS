const { addAbortSignal } = require("stream");

const regex = /(?<scheme>([a-z]|[A-Z]|[0-9])+[:]\/\/)?(www.)?((?<user>([a-z]|[A-Z]|[0-9]|[-_.+])*)?(?<password>:([a-z]|[A-Z]|[0-9]|[-_.+])*))?(?<golbang>@)?(?<host>(([a-z]|[A-Z]|[0-9]|[-_+])+\.)+([a-z]|[A-Z]|[0-9])+)(?<port>:[0-9]+)?(?<pathComponents>(\/([a-z]|[A-Z]|[0-9]|[-])+)+)?[\/]?(?<query>[?]([a-z]|[A-Z]|[0-9]|[=&])+)?(?<fragment>([a-z]|[A-Z]|[0-9]|[#])+)?/;

let url = [
	'https://stackoverflow.com/questions/54307673/flutter-textfield-background-color-on-focus',
	'https://www.perforce.com/blog/qac/multithreading-parallel-programming-c-cpp#why',
	'https://github.com/JannaKim/PS/issues/new',
	'https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=aragorn82&logNo=80106738404',
	'https://www.edwith.org/challenge-web/lecture/949324?isDesc=false',
	'http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2021/first/second/last?query=ab&param=12',
	'https://mail.google.com/mail/u/0/?tab=wm#inbox',
	'https://com',
	'file://hello.com'
]


let check = ((el) => { // www.--.--
console.log()
console.log()
console.log('            ' + el + '             ')
console.log('                    is typed on broswer tab now.')
if(el.match(regex) == null){
	console.log("I'm not a valid url.")
	return
}
else{
const groups = el.match(regex).groups;

if(groups.scheme != null){
	console.log('scheme : ', groups.scheme);
	if(groups.scheme == 'file://'){
		console.log('isfileUrl : ', true);
	}
	else{
		console.log('isfileUrl : ', false);
	}

}

if(groups.users != null)
	console.log('user : ', groups.user);
if(groups.password != null)
	console.log('password : ', groups.password.slice(1));
if(groups.port != null)
	console.log('port : ', groups.port.slice(1));
if(groups.host != null)
	console.log('host : ', groups.host);  // 1
if(groups.pathComponents != null){
	console.log('urlPathComponents : ', groups.pathComponents.split('/')[groups.pathComponents.split('/').length - 1]);
	console.log('urlPathComponents : ', groups.pathComponents.split('/'));
}
if(groups.query !=null)
	console.log('query : ', groups.query)
if(groups.fragment !=null)
	console.log('fragment : ', groups.fragment)


console.log('absoluteString : ', 
(groups.scheme != null ? groups.scheme : "")  + 
(groups.user != null ? groups.user : "" ) + 
(groups.password != null ? groups.password : "") +
(groups.port != null ? groups.port : "") + 
(groups.host != null ? groups.host : "") + 
(groups.pathComponents != null ? groups.pathComponents : "") + 
(groups.query != null ? groups.query : "") +
(groups.fragment != null ? groups.fragment : "")
)
}
}
)
url.forEach( (...param) => {check(param[0])})