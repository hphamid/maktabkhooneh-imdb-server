/**
 * Created by hamid on 8/10/16.
 */
'use strict';

var defaultErrorConverter = undefined;
var defaultRequestConverter = undefined;
var defaultResponseConverter = undefined;

var requestTypeContainer = undefined;
var responseTypeContainer = undefined;

var handlers = {}; // a map from handlerIdentifier to HandlerInformation

module.exports.setDefaultErrorConverter = function(errorConverter){
    defaultErrorConverter = errorConverter;
};

module.exports.getDefaultErrorConverter = function(){
    return defaultErrorConverter;
};


module.exports.setDefaultRequestConvert = function(requestConverter){
    defaultRequestConverter = requestConverter;
};

module.exports.getDefaultRequestConverter = function(){
    return defaultRequestConverter;
};

module.exports.setDefaultResponseConverter = function(responseConverter){
    defaultResponseConverter = responseConverter;
};

module.exports.getDefaultResponseConverter = function(){
    return defaultResponseConverter;
};

module.exports.getRequestTypeContainer = function(){
    return requestTypeContainer;
};

module.exports.setRequestTypeContainer = function(toSetRequestTypeContainer){
    requestTypeContainer = toSetRequestTypeContainer;
};

module.exports.getResponseTypeContainer = function(){
    return responseTypeContainer;
};

module.exports.setResponseTypeContainer = function(toSetResponseTypeContainer){
    responseTypeContainer = toSetResponseTypeContainer;
};

module.exports.hasHandler = function(handlerIdentifier){
    return handlers[handlerIdentifier] !== undefined;
};

module.exports.getHandler = function(handlerIdentifier){
    return handlers[handlerIdentifier];
};

module.exports.setHandler = function(handlerIdentifier, handlerInformation){
    handlers[handlerIdentifier] = handlerInformation;
};

module.exports.removeHandler = function(handlerIdentifier){
    delete handlers[handlerIdentifier];
};

module.exports.listAllHandlers = function(){
    var toReturn = [];
    Object.keys(handlers).forEach(function(key){
        toReturn.push(handlers[key]);
    });
    return toReturn;
};

module.exports.generateHandlerIdentifier = generateHandlerAddress;

function generateHandlerAddress(moduleRuntimeInformation, functionRuntimeInformation){
    return moduleRuntimeInformation.moduleRuntimeAddress + ":" + functionRuntimeInformation.name;
}