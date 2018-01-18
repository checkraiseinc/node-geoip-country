// $ node test4.js
const geoip = require('../lib/geoip')

function randomSegment() {
  //returns 0000 - ffff
  const segmentAsNumber = Math.floor(Math.random()*256*256)
  let segmentAsString = segmentAsNumber.toString(16)
  while(segmentAsString.length<4) {
    segmentAsString = "0"+segmentAsString
  }
  return segmentAsString
}

function randomIPv6() {
  let segments = []
  for (let i = 0; i<8; i++) {
    segments.push(randomSegment())
  }
  return segments.join(":")
}

const numberOfTests = 50000
let randomIPs = []
for(let i=0; i<numberOfTests; i++) {
  randomIPs.push(randomIPv6())
}

const startTime = (new Date()).getTime()

const results = randomIPs.map((ip)=>geoip.lookup(ip))

const stopTime = (new Date()).getTime()

const resultCountries = results.map((result)=>result!==null? result.country : "").join(",")
// console.log(resultCountries)

let correctIndices = []
results.forEach((result, index)=>{
  if (result!==null) correctIndices.push(index)
})
console.log("number of addresses with any country found: "+correctIndices.length)

const avgTime = (stopTime - startTime)/numberOfTests
console.log(`${avgTime} ms`)
