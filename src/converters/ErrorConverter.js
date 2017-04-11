/**
 * Created by hamid on 8/11/16.
 */
'use strict';

const FailedSuccessResponse = require("../reqAndRes/responses/general/FailedSuccessResponse");
const ErrorCodes = require("../util/ErrorCodes");
const isDebug = true;

/**
 * @ErrorConverter()
 */
module.exports.convert = function(errorObject){
    var message = "unknown";
    var code = ErrorCodes.UNKNOWN;
    if(errorObject["code"] !== undefined){
        code = errorObject["code"];
    }
    if(typeof(errorObject) === "string"){
        message = errorObject;
    }else if(errorObject["message"] !== undefined){
        message = errorObject["message"];
    }else{
        if(isDebug){
            message = JSON.stringify(errorObject);
        }else{
            console.log("unresolved error happened in controller", JSON.stringify(errorObject));
        }
    }
    if(errorObject instanceof Error){
        console.log("error happened in controller", errorObject);
    }
    var toReturn = new FailedSuccessResponse();
    toReturn.code.setValue(code);
    toReturn.success.setValue(false);
    toReturn.message.setValue(message);
    if(isDebug){
        toReturn.stack.setValue(errorObject.stack);
    }
    return toReturn;
};
