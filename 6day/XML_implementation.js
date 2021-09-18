//const crawler = require("./Parser").Parser; // 변수에 저 값 넣고나서
//const LRUCache = require("./LRUCache").LRUCache;

// 대부분의 현대 프로그래밍 언어들은 정규표현식 라이브러리를 내장하고 있다.

//const str = "<!DOCTYPE html><HTML lang=\"ko\"><BODY><P>BOOST<IMG SRC=\"codesquad.kr\"><BR/></IMG></P><P>CAMP</P></BODY></HTML>";
const str = "<!DOCTYPE html><HTML lang=\"ko\"><BODY><P>BOOST<IMG SRC=\"codesquad.kr\"></IMG><BR/></P></BODY></HTML>";
//const str = "<!DOCTYPE html><HTML lang=\"ko\"><BODY></HTML></BODY>";

let stack = new Array(100); // ?? const 가능?

function parseParagraphs(line, stc, top){ // <P>BOOST<IMG SRC="codesquad.kr"><BR/></IMG></P><P>CAMP</P>
    //console.log(line,' paraphrase')
    let openerP = -1;
    let closerP = -1;
    openerP = line.indexOf('<P>')
    if(openerP < 0) {
        if(!line.match(/\b[Pp]\b/))
            stc[top++] = {'element':line}
        return
    }

    closerP = line.indexOf('</P>')
    if(closerP < openerP) throw "ERROR: \"올바른 XML 형식이 아닙니다?.\"";
    if(closerP < 0) throw "ERROR: \"올바른 XML 형식이 아닙니다?.\"";
    const singleParagraph = line.slice(openerP, closerP + 4)
    //console.log(singleParagraph, openerP, closerP + 4, '??????')
    let innerstack = new Array(100); 
    stc[top++] = innerstack;
    Tokenizer(singleParagraph, true, innerstack, 0) // ?
    
    line = line.replace(singleParagraph,"")
    if(line.length > 0)
        
        parseParagraphs(line, stc, top+1)
    
}

function findOpentag(line, reversed){
    if(reversed == true){

        for(var i = line.length - 1; i >=0; --i){
            if(line[i].match(/^<$/)) return i;
        }
        throw "ERROR: \"올바른 XML 형식이 아닙니다?.\"";
    }
    else{
        for(var i = 0; i < line.length; ++i){
            if(line[i].match(/^<$/)) return i;
            else if(line[i].match(/^>$/)) throw "ERROR: \"올바른 XML 형식이 아닙니다?.\"";
        }
        throw "ERROR: \"올바른 XML 형식이 아닙니다?.\"";
    }

}

function findClosetag(line, reversed){
    if(reversed == true){
        for(var i = line.length - 1; i >=0; --i){
            if(line[i].match(/^>$/)) return i;
            else if(line[i].match(/^<$/)) throw "ERROR: \"올바른 XML 형식이 아닙니다.\"";
        }
        throw "ERROR: \"올바른 XML 형식이 아닙니다.\"";
    }

    for(var i = 0; i < line.length; ++i){
        if(line[i].match(/^>$/)) return i;
    }
    throw "ERROR: \"올바른 XML 형식이 아닙니다?.\"";

}


function countP(word){
    return (word.match(/p>/) || []).length +  (word.match(/P>/) || []).length + (word.match(/[/]p>/) || []).length +  (word.match(/[/]P>/) || []).length
}

function checkAttributes(chunk, stc, top){ // attibute 시작 이전 공백 위치 리턴
    const pattern_element = / .*/
    //const pattern_attributes = /.* /
    const pattern_name = /=.*/
    const pattern_value = /.*=/
    let returnel = 0;

    if(chunk.match(/.* .*/)){
        const element = chunk.replace(pattern_element, "")
        stc[top++] = {'element':element}
        returnel = chunk.indexOf(" ")
        chunk = chunk.replace(element, "")
        chunk = chunk.slice(1)
        
    }

    if(chunk.match(/.*=.*/)){

        const leftOperand = chunk.replace(pattern_name, "")
        const rightOperand = chunk.replace(pattern_value, "")
        let innerstack = new Array(100); 
        stc[top] = innerstack;
        stc[top][0] = 'attributes :['
        stc[top++][1] = {'name':leftOperand, 'value':rightOperand.replace(/\"/g,"")}
    }// stack
    return {'add': returnel, 'top':top}
}









// # <  <>    <>    > <   >  <   >
// # <P >

function Tokenizer(line, paraphrased, stc, top){
    if(line.indexOf('<') < 0 && line.indexOf('>') <0){
        stc[top++] = line
        
        return
    } // , 0

    let openeridx = 0;
    let closeridx = 0;
    try{
        openeridx = findOpentag(line, false);
        // function could throw exception
    }
    catch(e){
        openeridx = "unknown";
        //logMyErrors(e); // lass exception to error handler
        return e

    }

    if(openeridx >0) {
        const element = line.slice(0, openeridx)
        stc[top++] = {'text':element}
    }

    try{
        closeridx = findClosetag(line, false);
        // function could throw exception
    }
    catch(e){
        closeridx = "unknown";
        //logMyErrors(e); // lass exception to error handler
        return e
    }

    let address = checkAttributes(line.slice(openeridx + 1, closeridx), stc, top) // space addr
    top = address.top
    let front= "";
    if(address.add !=0)
        front = line.slice(openeridx + 1, openeridx + address.add + 1)
    else {
        front = line.slice(openeridx + 1, closeridx)
        //console.log(top)
        stc[top++] = {'elementss' : front.replace("/","")}
        if((line.match(/\b[Pp]\b/) && paraphrased == true)){
            stc[top] = null
            top--
        }

    } // attributes 갖고있으면 안에서, 아니면 밖에서
    if(paraphrased == false)
        stc[top++] = "children : ["

   let tailopeneridx = 0;
   let tailcloseridx = 0;
   try{
       tailopeneridx = findOpentag(line, true);
       // function could throw exception
   }
   catch(e){
       tailopeneridx = "unknown";
       return e
   }


   try{
       tailcloseridx = findClosetag(line, true);
       // function could throw exception
   }
   catch(e){
       tailcloseridx = "unknown";
       //logMyErrors(e); // lass exception to error handler
       return e
   }
   // arr [10]   = a[0] = stc
   // arr [].Array
   //await.push() 
   // 

    let back = line.slice(tailopeneridx + 1, tailcloseridx)
    if((front != back) && (front != back.slice(1,))){ // 문제가 있다면 br 아니면 틀린형식이다.
        if(line.indexOf(front) < 0) {
            throw "ERROR: \"올바른 XML 형식이 아닙니다.\"";}
        let idx = line.indexOf('<BR')
        let tmp = line.indexOf('<br') // 
        if(idx<tmp) idx = tmp
        if(idx + 4 >= line.length - 1){
            tailopeneridx = idx 
            let innerstack = new Array(100); 
            stc[top++] = innerstack;
            Tokenizer(line.slice(0, tailopeneridx), paraphrased, innerstack, 0)
            stc[top++]  = {'element' : line.slice(tailopeneridx + 1,tailopeneridx+3)}
            return
        }

        else {
            //console.log(front)
            throw "ERROR: \"올바른 XML 형식이 아닙니다..\"";
        }
    }
    // P
    // [p]
    // aaapaaa
    //[Pp
    // a== b  등호
    // [Pp]
    if(front.match(/\b(P|p)\b/) && back.slice(1).match(/\b(P|p)\b/) && paraphrased == false){
        if(! openeridx) {
            parseParagraphs(line, stc ,top)}
        else {
            parseParagraphs(line.slice(openeridx,), stc, top)
        }
    }
    else {
        let innerstack = new Array(100); 
        stc[top++] = innerstack;
        Tokenizer(line.slice(closeridx + 1, tailopeneridx), paraphrased, innerstack, 0)
    }

}


// [ [] ] [[] ]

let space = " ";
function Parser(s, top, floor){
    if(top == 100) return false

    if (s[top] == null) {
        Parser(s, top + 1, floor)
        return false;
    }
 
    if(Array.isArray(s[top]) == true) {
        Parser(s[top], 0, floor)
        if(s[top][2] != null) // 겹층
            console.log(space.repeat(floor*4),'}')
    }
    else {
        console.log(space.repeat(floor*4), JSON.stringify(s[top]))
        
    }
    let depth = Parser(s, top + 1, floor + 1)
    if(depth == true) console.log(space.repeat(floor*4),']')
    return true
}



const htmldoc = str.replace('<!DOCTYPE html>', "")

console.log('raw html: ', htmldoc)
console.log()
console.log(Tokenizer(htmldoc, false, stack, 0))


Parser(stack, 0,0)