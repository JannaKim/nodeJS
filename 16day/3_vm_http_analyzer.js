import {sendRequest} from './4_http_timings.js'
import print from './0_print.js'
import url from 'url'
import {info} from './5_info.js'

class VmHttpAnalyzer {
    constructor (received_url)  {
      this.mainUrl = received_url;
      let parsedInfo = url.parse(received_url, true)
      this.host = parsedInfo['host']
      this.path = parsedInfo['path']

      this.analyze(received_url)
      this.getTime(received_url)
    //   info.redirectionUrl.forEach(element => 
    //     this.analyze(element),
    //     this.getTime(element)
    //     )
      }

    analyze(received_url){
        if(this.host == null){
            this.host = this.path
            this.path = '/'
        }
        console.log('domain', this.host.replace('https://',""))
        console.log('skim', 'https://')
        console.log('path',this.path)
        if(received_url.indexOf('.com') != -1) {
            info.domains+=1
            info.redirectionUrl.push(received_url)
            console.log('type document')
        }
        if(received_url.indexOf('.css') != -1) {
            info.code+=1
          console.log('type css')
      }
  
      if(received_url.indexOf('.js') != -1) {
        info.code+=1
          console.log('type js')
      }
      if(received_url.indexOf('.png') != -1) {
        info.img+=1
          console.log('type png')
      }
      if(received_url.indexOf('.gif') != -1) {
        info.img+=1
          console.log('type gif')
      }
      if(received_url.indexOf('jpg') != -1) {
        info.img+=1
          console.log('type jpg')
      }
      if(received_url != this.mainUrl){
          info.domains+=1
        info.redirectionUrl.push(received_url)
      }

    }

    
    getTime(received_url) {
      // Getting timings
        sendRequest(received_url)
        
            }
  }
  

const Singleton = {
    instance: null,
    
    runNetworkTab(received_url) {
      if(!this.instance)
        this.instance = new VmHttpAnalyzer(received_url);
      
      return this.instance;
    }
  }


export default Singleton