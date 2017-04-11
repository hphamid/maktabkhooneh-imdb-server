/**
 * Created by hamid on 8/6/16.
 */
'use strict';

module.exports.aspect = function (extraData, originalFunction, thisParam, args) {
    var toPassArgs = [];
    if (extraData.originalArguments) {
        let argsIndex = 0;
        extraData.originalArguments.forEach(function (element) {
            if (extraData.autoWiredModules[element]) {
                let dependency = getDependency(extraData.autoWiredModules[element], args);
                toPassArgs.push(dependency);
            } else {
                toPassArgs.push(args[argsIndex]);
                argsIndex++;
            }
        });
    } else {
        toPassArgs = args;
    }
    try {
        return originalFunction.apply(thisParam, toPassArgs);
    } catch (error) {
        console.log("error in autoWired", error);
        throw error;
    }
};

function getDependency(moduleInfo, args) {
    var module = require(moduleInfo.moduleAddress);
    if (moduleInfo.functionName === undefined) {
        return module;
    } else if(moduleInfo.functionName === "") {
        return callFunction(module, module, argsIndex, args)
    }else{
        return callFunction(module[moduleInfo.functionName], module, moduleInfo.toPassParamsIndex, args);
    }
}

function callFunction(func, thisParam, argIndex, args){
    var toPassArgs = [];
    if(argIndex){
        for(let i = 0; i < argIndex.length; i++){
            if(args.length <= argIndex[i]){
                throw Error("index out of range! " + argIndex +  "  " +args);
            }
            toPassArgs.push(args[argIndex[i]]);
        }
    }
    return func.apply(thisParam, toPassArgs);
}