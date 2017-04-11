/**
 * Created by hamid on 8/6/16.
 */
'use strict';

const GetAspectFunction = require('./GetAspectFunction.js');

function RunBeforeAspectRunner(originalFunction, thisParam, dirname, moduleLoadAddress, functionName, extraData){
    var extraDataObject = JSON.parse(extraData);
    var aspectFunction = GetAspectFunction(dirname, moduleLoadAddress, functionName);
    return function(){
        var args = aspectFunction(extraDataObject, arguments);
        try{
            return originalFunction.apply(thisParam, args);
        }catch(error){
            console.log(error);
            throw error;
        }
    };
}

module.exports = RunBeforeAspectRunner;