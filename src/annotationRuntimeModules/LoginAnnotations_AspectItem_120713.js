/**
 * Created by hamid on 8/13/16.
 */
'use strict';
const ParameterHandler = require("./ParameterHandler");
const ErrorCodes = require("../util/ErrorCodes");
const Backtory = require("../provider/LibsProvider").backtory();
const Promisify = require("../util/Promisify");
module.exports.loginRequired = function (extraData, originalFunction, thisParam, args){
    var nArgs = Array.prototype.slice.call(args);
    var context = ParameterHandler.getParameterWithName(nArgs, extraData, "context");
    var userId = context.getSecurityContext().userId;
    if(!userId){
        console.log(context.getSecurityContext());
        throw {code: ErrorCodes.UnAuthorized, message: "login required"};
    }
    var newArgs = ParameterHandler.filterArguments(nArgs, extraData);
    return originalFunction.apply(thisParam, newArgs);
};

module.exports.activeUser = function (extraData, originalFunction, thisParam, args){
    var nArgs = Array.prototype.slice.call(args);
    var context = ParameterHandler.getParameterWithName(nArgs, extraData.parameterData, "context");
    var userId = context.getSecurityContext().userId;
    var newArgs = ParameterHandler.filterArguments(nArgs, extraData.parameterData);
    newArgs.splice(extraData.activeIndex, 0, undefined);
    if(!userId){
        return originalFunction.apply(thisParam, newArgs);
    }
    return Promisify.wrap(Backtory.Users.getByUserId, userId).then(function(userInfo){
        newArgs[extraData.activeIndex] = userInfo;
        return originalFunction.apply(thisParam, newArgs);
    });
};