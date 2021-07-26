// 대부분의 현대 프로그래밍 언어들은 정규표현식 라이브러리를 내장하고 있다.

const str = "<!DOCTYPE html><HTML lang=\"ko\"><BODY><P>BOOST<IMG SRC=\"codesquad.kr\"><BR/></IMG></P><P>CAMP</P></BODY></HTML>";


/*

<!DOCTYPE html>
    <HTML lang=\"ko\">
        <BODY>
            <P>BOOST<IMG SRC=\"codesquad.kr\"><BR/></IMG></P>
            <P>CAMP</P>
        </BODY>
    </HTML>


*/


class Stack {
    constructor() {
      this._arr = [];
    }
    push(item) {
      this._arr.push(item);
    }
    pop() {
      return this._arr.pop();
    }
    peek() {
      return this._arr[this._arr.length - 1];
    }
  }


const stack = new Stack(); // ?? const 가능?



const pattern = /(<.+>{1})<(BODY.+)/
const ans = pattern.exec(str)
//console.log(ans)

// const el = /^.+<+/
// const tmp = el.exec(str)
// console.log(tmp)
// const ans2 = str.replace(el, "")
// console.log(ans2)
// const pattern = /[+-]?(\d*\.)?\d+/
// console.log(pattern.exec('123.34'))


const front_reg = />.+/
const back_reg = /^.+<+/

// const par_reg = /<[Pp]>.*<[/][Pp]>.+/
const par_reg = /[/][Pp]>.+/

function areParagraphs(lo, hi, line){
    if (lo.match(/^[pP]$/) && hi.match(/^[/][pP]$/)){
        if( countP(line) >= 4) return true
        return false
    }
    return false

    
}

function innerside(line){
    let inner = ""

    const tmpstack = new Stack(); 
            for(var i = line.length - 4; i>0; --i){
                if(line[i] != '>' && line[i-1] != /^[Pp]$/) tmpstack.push(line[i])
                else break
            }
            
            while(tmpstack.length >0) inner += tmpstack.pop()
            //console.log('inner', inner)
    return inner
}

function parseParagraphs(line){ // <P>BOOST<IMG SRC="codesquad.kr"><BR/></IMG></P><P>CAMP</P>
    //console.log(line,' paraphrase')
    let openerP = -1;
    let closerP = -1;
    openerP = line.indexOf('<P>')
    if(openerP < 0) {
        stack.push({'element':line})
        return
    }

    closerP = line.indexOf('</P>')
    if(closerP < openerP) throw "ERROR: \"올바른 XML 형식이 아닙니다?.\"";
    if(closerP < 0) throw "ERROR: \"올바른 XML 형식이 아닙니다?.\"";
    const singleParagraph = line.slice(openerP, closerP + 4)
    //console.log(singleParagraph, openerP, closerP + 4, '??????')
    Tokenizer(singleParagraph, true) // ?
    
    line = line.replace(singleParagraph,"")
    if(line.length > 0)
        parseParagraphs(line)

    /*
    const innerStack = new Array();

    while(line){
        console.log('line: ', line)
        const remain = par_reg.exec(line)
        //console.log(remain, '??')
        if(remain == null) break
        console.log(countP(remain[0]))
        if(countP(remain[0]) < 4) {
            let inner = innerside(line)
            if(inner.length > 0)
                Tokenizer(inner, true)
            break
        }
        let leftmostP = line.replace(remain[0],"") + '/p>'
        //console.log('single paragraph', leftmostP)

        let inner = leftmostP.slice(3, -4)
        //console.log(inner)
        const contextidx = inner.indexOf('<')
        //console.log("nn", contextidx, inner)
        
        if(contextidx != 1) leftmostP = inner.slice(contextidx)
        //line.replace(back_reg , "").slice(0,-1)
        //innerStack
        console.log('this?', leftmostP.slice(0,contextidx))
        stack.push(leftmostP.slice(0,contextidx))
        if(leftmostP.match(/^[/][pP]>$/)) break
        Tokenizer(leftmostP, true)
        const start = leftmostP.length
        line = line.slice(start+1)
        

        //console.log('remain: ', leftmostP.slice(3))
        //if(remain[0].indexOf(/<\w>/) < 0) break
        //line = leftmostP.slice(3)
    }
    //stack.push(innerStack)
    */
    /*
    //console.log(tmp)
    const front = line.replace(front_reg, "").slice(1)
    console.log('front: ',front)
    //console.log(ans2)


    const back_erased= back_reg.exec(front_erased)
    const back = line.replace(back_reg , "").slice(0,-1)
    console.log('back: ',back)
    */
    
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

function checkAttributes(chunk){ // attibute 시작 이전 공백 위치 리턴
    const pattern_element = / .*/
    //const pattern_attributes = /.* /
    const pattern_name = /=.*/
    const pattern_value = /.*=/
    let returnel = 0;

    if(chunk.match(/.* .*/)){
        const element = chunk.replace(pattern_element, "")
        stack.push({'element':element})
        returnel = chunk.indexOf(" ")
        chunk = chunk.replace(element, "")
        chunk = chunk.slice(1)
        
    }

    if(chunk.match(/.*=.*/)){
        //console.log("c", chunk)

        const leftOperand = chunk.replace(pattern_name, "")
        const rightOperand = chunk.replace(pattern_value, "")
        //console.log(leftOperand, ',',rightOperand)
        stack.push({'attributes':{'name':leftOperand, 'value':rightOperand.replace(/\"/g,"")}}) 
    }
    //console.log('retel', returnel)
    return returnel
}
function Tokenizer(line, paraphrased){
    console.log('GO', line)
    if(line.indexOf('<') < 0 && line.indexOf('>') <0){
        stack.push(line)
        return
    }

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

    //console.log(openeridx)

    if(openeridx >0) {
        //console.log(line.slice(0, openeridx),'@?!', openeridx)
        const element = line.slice(0, openeridx)
        stack.push({'text':element})
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

    // if(paraphrased == true){
    //     console.log('find')
    //     let idxset = []
    //     try{
    //         parseParagraphs(line.slice(openeridx,));
    //         return
    //         // function could throw exception
    //     }
    //     catch(e){
    //         idxset = "unknown";
    //         //logMyErrors(e); // lass exception to error handler
    //         return e
    //     }   
    // }
    let address = checkAttributes(line.slice(openeridx + 1, closeridx)) // space addr
    //console.log("address", address)
    let front= "";
    if(address !=0)
        front = line.slice(openeridx + 1, openeridx + address + 1)
    else {
        front = line.slice(openeridx + 1, closeridx)
        stack.push({'element':front.replace("/","")})
        if(front.match(/\b(P|p)\b/)){ // !!??
            stack.pop()
        }
    } // attributes 갖고있으면 안에서, 아니면 밖에서
    stack.push("children")
    // console.log(front,front.match(/\b(P|p)\b/), 'm' ) //?????????? !!!!
    if(front.match(/\b(P|p)\b/)){ // ;;
        console.log('popped')
        stack.pop()
    }
    


    //console.log((line.match(/>/g) || []).length, ((line.match(/</g) || []).length == 1))

    //const stack2 = new Stack(); // ?? const 가능?
    //stack2.push({'1':1, '2':2})
    //stack.push(stack2)
    //console.log(stack)

    // const front_reg = />.+/
    // const back_reg = /^.+<+/    
    
    //console.log(tmp)
    //const contextidx = line.indexOf('<')
    //console.log("nn", contextidx, inner)
    /*
    if(contextidx != 1) line = line.slice(contextidx)
    //line.replace(back_reg , "").slice(0,-1)
    //innerStack
    console.log('this?', line)
    stack.push(line.slice(0,contextidx))
    
    front = line.replace(front_reg, "")
    console.log('front: ',front)
    //console.log(ans2)


    const back_erased= back_reg.exec(front_erased)
    const back = line.replace(back_reg , "").slice(0,-1)
    console.log('back: ',back)
    stack.push(front)

    console.log(areParagraphs(front, back, line), line)
    if(areParagraphs(front, back, line) == true){
        //const paragraphs = back_erased[0].slice(1,-1)
        parseParagraphs(line)
    }
    
    
    else if(back_erased != null) {
        const result = back_erased[0].slice(1,-1)
        //console.log(result , ' recursion')
        Tokenizer(result, paraphrased)
    }
    stack.push(back)
    */

   let tailopeneridx = 0;
   let tailcloseridx = 0;
   try{
       tailopeneridx = findOpentag(line, true);
       // function could throw exception
   }
   catch(e){
       tailopeneridx = "unknown";
       //logMyErrors(e); // lass exception to error handler
       return e

   }

   //console.log(tailopeneridx)


   try{
       tailcloseridx = findClosetag(line, true);
       // function could throw exception
   }
   catch(e){
       tailcloseridx = "unknown";
       //logMyErrors(e); // lass exception to error handler
       return e
   }

    let back = line.slice(tailopeneridx + 1, tailcloseridx)
    //console.log(back.slice(1), front, '?')
    console.log(tailopeneridx , closeridx)
    if(tailopeneridx < closeridx){
        if (front.slice(0,-1).match(/\b[B|b][R|r][/]*\b/)) return;
        else throw "ERROR: \"올바른 XML 형식이 아닙니다?.\"";
    }
    if(front.match(/\b(P|p)\b/) && back.slice(1).match(/\b(P|p)\b/) && paraphrased == false){
        console.log("Paraphrase!", openeridx,)
        stack.push('children: ') // xxxxxxxx
        stack.push({'element' : 'P'})
        if(! openeridx) parseParagraphs(line)
        else parseParagraphs(line.slice(openeridx,))
        stack.push('P')
        stack.push(']')
    }
    else {
        Tokenizer(line.slice(closeridx + 1, tailopeneridx), false)
    }
    stack.push(back)
    if(back.match(/\b[/]\b\b(P|p)\b/)  && paraphrased == false){ // !!??
        stack.pop()
    }
    //stack.push(' ')

}
//<P>BOOST<IMG SRC="codesquad.kr"><BR/></IMG></P><P>CAMP</P>
const htmldoc = str.replace('<!DOCTYPE html>', "")

console.log(htmldoc)
console.log(Tokenizer(htmldoc, false))


// console.log(stack)

/*
console.log(findClosetag("aa<aa"));
console.log(findClosetag(">"));

*/

/*

let openeridx = "";
try{
    openeridx = findOpentag("...>");
    console.log(openeridx)
    // function could throw exception
}
catch(e){
    openeridx = "unknown";
    console.log("ERROR: \"올바른 XML 형식이 아닙니다.\"") // ?
    // logMyErrors(e); // lass exception to error handler

}
*/

let space = " ";
function Parser(s, floor){
    //console.log(floor)
    
    //space = space.repeat(floor)
    /*
    
    //console.log('.', space, '.')
        //console.log("?",stc._arr[0])
    for(let i = 0; i < stc._arr.length; ++i){
        console.log(stc._arr[i],Array.isArray(stc._arr[i]))
        if(Array.isArray(stc._arr[i]) == true) printstc(stc._arr[i], floor + 1)
        else console.log(space, stc._arr[i])
    }

    
    */

    //let floor = 0;

    if ((s._arr).length == 0) return floor;
 
    var x = s._arr[s._arr.length - 1];

    // Pop the top element of the stack
    s.pop();

    // Recursively call the function Parser
    //Parser(s);

    // Print the stack element starting
    // from the bottom
    
    floor += Parser(s, floor + 1);
    //console.log(floor)

    if(Array.isArray(x._arr) == true) floor += Parser(x, floor)
    else console.log(JSON.stringify(x))

    // Push the same element onto the stack
    // to preserve the order
    s.push(x);
    return floor + 1
}

//stack.push([1,2,{'2':2,'3':23}])
Parser(stack, 0)
//console.log(JSON.stringify(stack,1))

//console.dir(stack.stringify(), {depth : null}) 

//console.log(Array.isArray([1,2,3,4]))