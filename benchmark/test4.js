// $ node test4.js
const geoip = require('../lib/geoip')

//const ip = "207.97.227.239"
function randomByte() {
  return Math.floor(Math.random()*256)
}

const numberOfTests = 50000
let randomIPs = []
for(let i=0; i<numberOfTests; i++) {
  const k1 = randomByte()
  const k2 = randomByte()
  const k3 = randomByte()
  const k4 = randomByte()

  randomIPs.push(`${k1}.${k2}.${k3}.${k4}`)
}

const startTime = (new Date()).getTime()

const results = randomIPs.map((ip)=>geoip.lookup(ip))

const stopTime = (new Date()).getTime()

const resultCountries = results.map((result)=>result!==null? result.country : "").join(",")
console.log(resultCountries)

const avgTime = (stopTime - startTime)/numberOfTests
console.log(`${avgTime} ms`)
