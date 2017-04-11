/**
 * Created by hamid on 8/6/16.
 */
'use strict';

const GetAspectFunction = require('./GetAspectFunction.js');

function RunBeforeAspectRunner(originalFunction, thisParam, dirName, moduleLoadAddress, functionName, extraData){
    var extraDataObject = JSON.parse(extraData);
    var aspectFunction = GetAspectFunction(dirName, moduleLoadAddress, functionName);
    return function(){
        return aspectFunction(extraDataObject, originalFunction, thisParam, arguments);
    };
}

module.exports = RunBeforeAspectRunner;
