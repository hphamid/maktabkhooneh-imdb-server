/**
 * Created by hamid on 8/9/16.
 */
'use strict';
const AspectData = require('../../annotationSystem/data/AspectData.js');

const AspectModuleName = "Controller_AspectItem_42312";
const AspectModuleFunctionName = "aspect";


const RequestBodyParamName = "requestBody";
const ContextParamName = "context";
const RequestDataParamName = "requestData"; // to pass converter request data to controller.


function ConverterInformation() {

}

ConverterInformation.prototype.init = function () {
    this.address = "";
    this.functionName = "";
};


function ExtraData() {
    this.init();
}

ExtraData.prototype.init = function () {
    this.passIndexes = [];  // -1 is placed for request data
    this.requestType = ""; //full address to request type
    this.responseType = ""; //full address to response type
    this.requestConverter = undefined; //ConverterInformation
    this.responseConverter = undefined; //ConverterInformation
    this.errorConverter = undefined; //ConverterInformation
};


function getConverterInformation(converterInformation, dependencyHelper, baseAddress){
    if(!converterInformation){
        return undefined;
    }
    var address = dependencyHelper.getModuleRuntimeAddressWithName(converterInformation.moduleName, baseAddress);
    if(!address){
        throw new Error("could not find module" + converterInformation.moduleName);
    }
    var toReturn = new ConverterInformation();
    toReturn.address = address;
    toReturn.functionName = converterInformation.functionName;
    return toReturn;
}


/**
 * @Annotation("Controller")
 * @Target("function")
 * @Scope("compile")
 * @Priority(-100) //call late!
 */
module.exports.controller = function (appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo) {
    var toPassArgs = [RequestBodyParamName, ContextParamName];
    var handlerIdentifier = appContext.handlerContainer.generateHandlerIdentifier(moduleRuntimeInfo, functionRuntimeInfo);
    var handlerData = appContext.handlerContainer.getHandler(handlerIdentifier);
    var data = new ExtraData();
    if(handlerData == undefined){
        throw new Error("no information found. cannot add controller for module " + moduleRuntimeInfo.name);
    }
    var aspectItem = appContext.appDependencyLoader.getModuleInfo(AspectModuleName);
    var baseAddress = aspectItem.fileInfo.path;
    var requestConverter = handlerData.requestConverter || appContext.handlerContainer.getDefaultRequestConverter();
    var responseConverter = handlerData.responseConverter || appContext.handlerContainer.getDefaultResponseConverter();
    var errorConverter = handlerData.errorConverter || appContext.handlerContainer.getDefaultErrorConverter();
    data.requestConverter = getConverterInformation(requestConverter, appContext.appDependencyLoader, baseAddress);
    data.responseConverter = getConverterInformation(responseConverter, appContext.appDependencyLoader, baseAddress);
    data.errorConverter = getConverterInformation(errorConverter, appContext.appDependencyLoader, baseAddress);
    data.requestType = handlerData.request;
    data.responseType = handlerData.response;

    functionRuntimeInfo.runArgs.forEach(function (argument) {
        var id = toPassArgs.indexOf(argument);
        if (id < 0) {
            if (argument == RequestDataParamName) {
                data.passIndexes.push(-1);
            } else {
                throw new Error("cannot have parameter with name " + argument + " in module " + moduleRuntimeInfo.name +
                    " function " + functionRuntimeInfo.name);
            }
        } else {
            data.passIndexes.push(id);
        }
    });

    var aspect = new AspectData();
    aspect.type = AspectData.Around;
    aspect.extraData = data;
    aspect.module = AspectModuleName;
    aspect.functionName = AspectModuleFunctionName;
    functionRuntimeInfo.addAspect(aspect);
    functionRuntimeInfo.runArgs = toPassArgs;
};
