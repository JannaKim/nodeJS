import * as fetch from 'node-fetch'


fetch("http://toscrape.com")
    .then(response => response.text())
    .then(html => console.log("html", html));




// quote node-fetch will pull in the dependency 'node-fetch'
// and that will grant access to command fetch

/*
function sayHello(person : string){
    return "Hello, " + person;
}

let user = "Janna User";
// document.body.textContent = sayHello(user);
console.log('hello world')
*/
