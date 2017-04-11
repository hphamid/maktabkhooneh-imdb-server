/**
 * Created by hamid on 8/6/16.
 */
'use strict';

const GetAspectFunction = require('./GetAspectFunction.js');

function RunAfterAspectRunner(originalFunction, thisParam, dirname, moduleLoadAddress, functionName, extraData){
    var extraDataObject = JSON.parse(extraData);
    var aspectFunction = GetAspectFunction(dirname, moduleLoadAddress, functionName);
    return function(){
        try{
            var result = originalFunction.apply(thisParam, arguments);
            return aspectFunction(extraDataObject, result, arguments);
        }catch(error){
            console.log(error);
            throw error;
        }
    };
}

module.exports = RunAfterAspectRunner;