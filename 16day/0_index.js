import {getUrl} from './1_getinput.js'
import {info} from './5_info.js'
const main = async () => {
    let pseudoNetWorkTab = getUrl
    pseudoNetWorkTab()
    return 0;
}

main()

const intervalId = setInterval(() => { // event looper
    console.log(info)
  }, 6000)

