/**
 * Created by hamid on 8/13/16.
 */
'use strict';
const ParameterHandler = require("./ParameterHandler");
const ErrorCodes = require("../util/ErrorCodes");
const Backtory = require("../provider/LibsProvider").backtory();
const Promisify = require("../util/Promisify");
module.exports.masterKeyRequired = function (extraData, originalFunction, thisParam, args){
    var nArgs = Array.prototype.slice.call(args);
    var context = ParameterHandler.getParameterWithName(nArgs, extraData, "context");
    var keyType = context.getSecurityContext().keyType;
    if(keyType !== "master"){
        console.log(context.getSecurityContext());
        throw {code: ErrorCodes.UnAuthorized, message: "master key only"};
    }
    var newArgs = ParameterHandler.filterArguments(nArgs, extraData);
    return originalFunction.apply(thisParam, newArgs);
};

