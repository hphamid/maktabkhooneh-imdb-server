/**
 * Created by hamid on 8/9/16.
 */
'use strict';

module.exports.aspect = function (extraData, originalFunction, thisParam, args) {
    var toPassArgs = [];
    var context = args[1];
    var requestBody = args[0];
    var requestData = undefined;

    var requestConverter = getConverter(extraData.requestConverter);
    var responseConverter = getConverter(extraData.responseConverter);
    var errorConverter = getConverter(extraData.errorConverter);

    var result = undefined;
    try {
        if (extraData.passIndexes) {
            extraData.passIndexes.forEach(function (element) {
                if(element >= 0){
                    toPassArgs.push(args[element]);
                }else{ //lets get convert data
                    if(requestConverter){
                        requestData = requestConverter(requestBody, extraData.requestType);
                        toPassArgs.push(requestData);
                    }else{
                        throw new Error("could not find request converter");
                    }
                }
            });
        }
        result = originalFunction.apply(thisParam, toPassArgs);
        if (!(result instanceof Promise)) {
            if(responseConverter){
                result = responseConverter(result, extraData.responseType);
            }
            context.succeed(result);
            return;
        }
        result.then(function (data) {
            if(responseConverter){
                data = responseConverter(data, extraData.responseType);
            }
            context.succeed(data);
        }).catch(function (error) {
            handleError(error, errorConverter, context);
        });
    } catch (error) {
        handleError(error, errorConverter, context);
    }

};

function handleError(error, errorConverter, context){
    if(errorConverter){
        try{
            var result = errorConverter(error);
            context.succeed(result);
        }catch(error){
            console.log("error could not been handled. error is:", error);
            context.fail(error);
        }
    }else{
        console.log("error could not convert", error);
        context.fail(error);
    }
}

function getConverter(converterInformation){
    if(!converterInformation){
        return undefined;
    }
    var cModule = require(converterInformation.address);
    return cModule[converterInformation.functionName];
}
