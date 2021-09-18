var http = require('http');
var cheerio = require('cheerio');
  
var options = {
    hostname: 'httpbin.org'
  };
  
function handleResponse(response) {
  var serverData = '';
  response.on('data', function (chunk) {
    serverData += chunk;
  });
  response.on('end', function () {
  
    var $ = cheerio.load(serverData);
  
    var result = $(".bash").text();            // 클래스가 bash인 요소를 선택
    var result2 = result.replace(/(^\s+|\s+$)/g, ""); // 앞뒤의 화이트 스페이스를 제거
    console.log("Find by class : bash -> " + result2);
  
    result = $("#AUTHOR").text();                     // id가 AUTHOR인 요소를 선택
    result2 = result.replace(/(^\s+|\s+$)/g, "");     // 앞뒤의 화이트 스페이스를 제거
    console.log("Find by id : AUTHOR -> " + result2);
  });
}
  
http.request(options, function(response){
  handleResponse(response);
}).end();

