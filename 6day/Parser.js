import {stack} from '.XML_implementation.js'

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

module.exports = {
    Parser
    // GoogleSearchKeyword,
     // json 같이 하나의 오브젝트에서 여러개의 속성중
}