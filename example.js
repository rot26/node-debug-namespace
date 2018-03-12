const path = require('path')
const debugNS = require('./index')(__filename); debugNS()('BOF')
// const debugNS = require('deubgNS')(__filename); debugNS()('BOF')


function main(name) {
    debugNS('main')('name: %O', name)
    console.log(`hello ${name}`)
}

main('world')

debugNS()('EOF')