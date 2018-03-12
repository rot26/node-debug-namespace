const pkg = require('../package.json')
const path = require('path')
const debug = require('debug')

function getModuleDir() {
    debug('debugNS:getModuleDir')('module file name: %O', require.main.filename)
    debug('debugNS:getModuleDir')('module dir name: %O', path.dirname(require.main.filename))
    return path.dirname(require.main.filename)
}

function getPathRelativeToPkg(dir) {
    debug('debugNS:getPathRelativeToPkg')('input: dir: %O', dir)
    return path.relative(getModuleDir(), dir)
}

function pathToNamespace(filePath,functionName) {
    let namespace = [
        getPackageName()
    ]
    let pathMagic = path.parse(getPathRelativeToPkg(filePath))
    if (pathMagic.dir) namespace.push(pathMagic.dir)
    if (pathMagic.name) namespace.push(pathMagic.name)
    debug('debugNS:pathToNamespace')('input functionName: %O', functionName)
    if (functionName) namespace.push(functionName)
    debug('debugNS:pathToNamespace')('namespace: %O', namespace)
    namespaceString = namespace.join(':')
    return namespaceString
}

function getPackageName() {
    return pkg.name
}

function debugNS(filePath) {
    debug('debugNS:debugNS')('filePath: %O', filePath)
    return function debugNS1(functionName){
        let ns = pathToNamespace(filePath,functionName)
        debug('debugNS:debugNS:debugNS1')('namespace: %O', ns)
        return debug(ns)
    }
}

module.exports = debugNS