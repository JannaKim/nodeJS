'use strict'
import assert from 'assert'
import url from 'url'
import http from 'http'
import https from 'https'
import print from './0_print.js'
import {custom_event, doIhaveIt} from './2_cache.js'
import {info} from './5_info.js'

const TIMEOUT_IN_MILLISECONDS = 30 * 1000
const NS_PER_SEC = 1e9
const MS_PER_NS = 1e6

/**
* Creates a request and collects HTTP timings
* @function request
* @param {Object} options
* @param {String} [options.method='GET']
* @param {String} options.protocol
* @param {String} options.hostname
* @param {Number} [options.port]
* @param {String} [options.path]
* @param {Object} [options.headers={}]
* @param {String} [options.body]
* @param {Function} callback
*/

const getImgSrc = (data) => {
  const linkRegex = new RegExp(/<link[^>]+href\s*=\s*[\"']([^>\"']+)[\"'][^>]*>/g);
  print(linkRegex.test(data))
	while (linkRegex.test(data)) {
    // 용량잰다.
    
    let received_url = RegExp.$1.trim()
    let parsedInfo = url.parse(received_url, true)['host']
    console.log(received_url)
    doIhaveIt(parsedInfo)
    console.log('domain', received_url)
    console.log('skim', 'https://')
    console.log('path',received_url)
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
    // RegExp.$1.trim();
  }
};

function request ({
  method = 'GET',
  protocol,
  hostname,
  port,
  path,
  headers = {},
  body
} = {}, callback) {
  // Validation
  assert(protocol, 'options.protocol is required')
  assert(['http:', 'https:'].includes(protocol), 'options.protocol must be one of: "http:", "https:"')
  assert(hostname, 'options.hostname is required')
  assert(callback, 'callback is required')

  // Initialization
  const eventTimes = {
    // use process.hrtime() as it's not a subject of clock drift
    startAt: process.hrtime(),
    dnsLookupAt: undefined,
    tcpConnectionAt: undefined,
    tlsHandshakeAt: undefined,
    firstByteAt: undefined,
    endAt: undefined
  }

  // Making request
  const req = (protocol.startsWith('https') ? https : http).request({
    protocol,
    method,
    hostname,
    port,
    path,
    headers
  }, (res) => {
    let responseBody = ''

    req.setTimeout(TIMEOUT_IN_MILLISECONDS)

    // Response events
    res.once('readable', () => {
      eventTimes.firstByteAt = process.hrtime()
    })
    res.on('data', (chunk) => { responseBody += chunk })

    // End event is not emitted when stream is not consumed fully
    // in our case we consume it see: res.on('data')
    res.on('end', () => {
      // const line = JSON.parse(responseBody)
      // console.log(line.currently)
    getImgSrc(responseBody)
    eventTimes.endAt = process.hrtime()

    callback(null, {
      headers: res.headers,
      timings: getTimings(eventTimes),
      body: responseBody,
      
    })
    })
  })

  // Request events
  req.on('socket', (socket) => {
    socket.on('lookup', () => {
      eventTimes.dnsLookupAt = process.hrtime()
    })
    socket.on('connect', () => {
      eventTimes.tcpConnectionAt = process.hrtime()
    })
    socket.on('secureConnect', () => {
      eventTimes.tlsHandshakeAt = process.hrtime()
    })
    socket.on('timeout', () => {
      req.abort()

      const err = new Error('ETIMEDOUT')
      err.code = 'ETIMEDOUT'
      callback(err)
    })
  })
  req.on('error', callback)

  // Sending body
  if (body) {
    req.write(body)
  }

  req.end()
}

/**
* Calculates HTTP timings
* @function getTimings
* @param {Object} eventTimes
* @param {Number} eventTimes.startAt
* @param {Number|undefined} eventTimes.dnsLookupAt
* @param {Number} eventTimes.tcpConnectionAt
* @param {Number|undefined} eventTimes.tlsHandshakeAt
* @param {Number} eventTimes.firstByteAt
* @param {Number} eventTimes.endAt
* @return {Object} timings - { dnsLookup, tcpConnection, tlsHandshake, firstByte, contentTransfer, total }
*/
function getTimings (eventTimes) {
  return {
    // There is no DNS lookup with IP address
    dnsLookup: eventTimes.dnsLookupAt !== undefined ?
      getHrTimeDurationInMs(eventTimes.startAt, eventTimes.dnsLookupAt) : undefined,
    tcpConnection: getHrTimeDurationInMs(eventTimes.dnsLookupAt || eventTimes.startAt, eventTimes.tcpConnectionAt),
    // There is no TLS handshake without https
    tlsHandshake: eventTimes.tlsHandshakeAt !== undefined ?
      (getHrTimeDurationInMs(eventTimes.tcpConnectionAt, eventTimes.tlsHandshakeAt)) : undefined,
    firstByte: getHrTimeDurationInMs((eventTimes.tlsHandshakeAt || eventTimes.tcpConnectionAt), eventTimes.firstByteAt),
    contentTransfer: getHrTimeDurationInMs(eventTimes.firstByteAt, eventTimes.endAt),
    total: getHrTimeDurationInMs(eventTimes.startAt, eventTimes.endAt)
  }
}

/**
* Get duration in milliseconds from process.hrtime()
* @function getHrTimeDurationInMs
* @param {Array} startTime - [seconds, nanoseconds]
* @param {Array} endTime - [seconds, nanoseconds]
* @return {Number} durationInMs
*/
function getHrTimeDurationInMs (startTime, endTime) {
  const secondDiff = endTime[0] - startTime[0]
  const nanoSecondDiff = endTime[1] - startTime[1]
  const diffInNanoSecond = secondDiff * NS_PER_SEC + nanoSecondDiff

  return diffInNanoSecond / MS_PER_NS
}

// Getting timings



let sendRequest = function(myUrl){
  if(myUrl.indexOf("https://") == -1) myUrl = "https://" + myUrl
  
  request(Object.assign(url.parse(myUrl), {
    headers: {
      'User-Agent': 'Example'
    }
  }), (err, res) => {
    console.log(err || res.timings)
    console.log('transcap', res.body.length,'B')
  })
};
//sendRequest("https://github.com")
export {sendRequest}

