/**
 * Created by hamid on 8/6/16.
 */
'use strict';
const Path = require('path');

function GetAspectFunction(dirname, moduleAddress, functionName){
    var loadedModule = require(Path.resolve(dirname, moduleAddress));
    if(!loadedModule){
        throw "module Not found " + moduleAddress;
    }
    if(!functionName){
        return loadedModule;
    }
    return loadedModule[functionName];
}

module.exports = GetAspectFunction;