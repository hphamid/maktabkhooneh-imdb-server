/**
 * Created by hamid on 8/13/16.
 */
'use strict';
const ParameterHandler = require("./ParameterHandler");
const ErrorCodes = require("../util/ErrorCodes");
const Promisify = require("../util/Promisify");

module.exports.aspect = function (extraData, originalFunction, thisParam, args) {
    var nArgs = Array.prototype.slice.call(args);
    var requestBody = ParameterHandler.getParameterWithName(nArgs, extraData.pData, "requestBody");
    var newArgs = ParameterHandler.filterArguments(nArgs, extraData.pData);
    var skip = undefined;
    var limit = undefined;
    if (requestBody) {
        skip = parseInt(requestBody["skip"]);
        limit = parseInt(requestBody["limit"]);
    }

    if (skip === undefined || skip !== skip || skip < 0) {
        skip = 0;
    }
    if (limit === undefined || limit !== limit || limit > 100 || limit <= 0) {
        limit = 20;
    }

    if (extraData.limitIndex >= 0)
        newArgs.splice(extraData.limitIndex, 0, limit);
    if (extraData.skipIndex >= 0)
        newArgs.splice(extraData.skipIndex, 0, skip);
    return originalFunction.apply(thisParam, newArgs);
};