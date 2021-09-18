
let print = ( (...line) => {
    line.forEach( (...param) => {
        process.stdout.write(param[0] + ' ');
        }
    )
    console.log()
    }
)

export { print }
