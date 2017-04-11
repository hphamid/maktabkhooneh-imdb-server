/**
 * Created by hamid on 8/11/16.
 */
'use strict';
const ConverterInformation = require("../requestHandler/ConverterInformation");

/**
 * @Annotation("ErrorConverter")
 * @Target("function")
 * @Scope("init")
 * */
module.exports.errorConverter = function(appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo){
    var oldErrorConverter = appContext.handlerContainer.getDefaultErrorConverter();
    if(oldErrorConverter !== undefined){
        throw new Error("there exists a error converter!");
    }
    var converterInformation = new ConverterInformation();
    converterInformation.moduleName = moduleRuntimeInfo.name;
    converterInformation.functionName = functionRuntimeInfo.name;
    appContext.handlerContainer.setDefaultErrorConverter(converterInformation);
};

/**
 * @Annotation("RequestConverter")
 * @Target("function")
 * @Scope("init")
 * */
module.exports.requestConverter = function(appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo){
    var oldRequestConverter = appContext.handlerContainer.getDefaultRequestConverter();
    if(oldRequestConverter !== undefined){
        throw new Error("there exists a request converter!");
    }
    var converterInformation = new ConverterInformation();
    converterInformation.moduleName = moduleRuntimeInfo.name;
    converterInformation.functionName = functionRuntimeInfo.name;
    appContext.handlerContainer.setDefaultRequestConvert(converterInformation);
};

/**
 * @Annotation("ResponseConverter")
 * @Target("function")
 * @Scope("init")
 * */
module.exports.responseController = function(appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo){
    var oldRequestConverter = appContext.handlerContainer.getDefaultResponseConverter();
    if(oldRequestConverter !== undefined){
        throw new Error("there exists a response converter!");
    }
    var converterInformation = new ConverterInformation();
    converterInformation.moduleName = moduleRuntimeInfo.name;
    converterInformation.functionName = functionRuntimeInfo.name;
    appContext.handlerContainer.setDefaultResponseConverter(converterInformation);
};