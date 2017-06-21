/**
 * Created by Darya Computer on 8/9/2016.
 */
'use strict';

const fs = require('fs');
const Path = require('path');
const AnnotationHelper = require('../annotationSystem/AnnotationHelper');


const LambdaConfigFileName = "lambda_config.json";

//const LambdaConfigFileName = 'lambda_configNew.json';
const HandlerInformation = require("../requestHandler/HandlerInformation");



/**
 * @Annotation("SchedulingCron")
 * @Target("function")
 * @Scope("compile")
 * @Priority(-1)
 * */
module.exports.cronJob = function (appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo) {
    var cron = annotationValues[0][0];
    var id = appContext.handlerContainer.generateHandlerIdentifier(moduleRuntimeInfo, functionRuntimeInfo);
    var handlerInfo = appContext.handlerContainer.getHandler(id);
    handlerInfo.extraData.schedulingCron = cron;
};

/**
 * @Annotation("Memory")
 * @Target("function")
 * @Scope("compile")
 * @Priority(-1)
 * */
module.exports.memory = function (appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo) {
    var limit = annotationValues[0][0];
    var id = appContext.handlerContainer.generateHandlerIdentifier(moduleRuntimeInfo, functionRuntimeInfo);
    var handlerInfo = appContext.handlerContainer.getHandler(id);
    handlerInfo.extraData.memoryLimit = limit;
};

/**
 * @Annotation("Time")
 * @Target("function")
 * @Scope("compile")
 * @Priority(-1)
 * */
module.exports.time = function (appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo) {
    var limit = annotationValues[0][0];
    var id = appContext.handlerContainer.generateHandlerIdentifier(moduleRuntimeInfo, functionRuntimeInfo);
    var handlerInfo = appContext.handlerContainer.getHandler(id);
    handlerInfo.extraData.timeLimit = limit;
};


module.exports.init = function (appContext, annotationInfo) {
    appContext.contextLoadedCallbacks.push(writeLambdaConfigFile);
};

/**
 * @Annotation("Post")
 * @Target("function")
 * @Scope("compile")
 * @InitMethod("init")
 * @Priority(0)
 * */
module.exports.post = function (appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo) {
    var urls = AnnotationHelper.flattenAnnotations(annotationValues);
    var id = appContext.handlerContainer.generateHandlerIdentifier(moduleRuntimeInfo, functionRuntimeInfo);
    if (!appContext.handlerContainer.hasHandler(id)) {
        let handler = new HandlerInformation();
        handler.method = "post";
        handler.moduleName = moduleRuntimeInfo.name;
        handler.functionName = functionRuntimeInfo.name;
        appContext.handlerContainer.setHandler(id, handler);
    }
    var handlerInfo = appContext.handlerContainer.getHandler(id);
    handlerInfo.urls = handlerInfo.urls.concat(urls);
};


function generateHandlerAddress(appBaseDir, moduleRuntimeAddress, functionName) {
    var address = Path.relative(appBaseDir, moduleRuntimeAddress);
    if (moduleRuntimeAddress.indexOf("../") >= 0) {
        throw new Error("module is out of src folder " + moduleRuntimeAddress);
    }
    address = address.replace(/.js$/, "");
    address = address.replace(/[\/\\\\]/, "/");
    address = address + "." + functionName;
    return address;
}


function writeLambdaConfigFile(appContext) {
    var dest = Path.join(appContext.appDirectory, LambdaConfigFileName);
    var createdObject = makeLambdaObjectToWrite(appContext);
    fs.writeFileSync(dest, JSON.stringify(createdObject, null, 4));
}

function makeLambdaObjectToWrite(appContext) {
    var dependencyLoader = appContext.appDependencyLoader;
    var handlerList = appContext.handlerContainer.listAllHandlers();
    var toReturn = {};
    handlerList.forEach(function (element) {
        var module = dependencyLoader.getModuleInfo(element.moduleName);
        if (!module) {
            throw new Error("could not find module " + element.moduleName);
        }
        var handlerAddress = generateHandlerAddress(appContext.appDirectory, module.moduleRuntimeAddress, element.functionName);
        if (element.urls.length == 0) {
            throw new Error("there is no address for module " + handlerAddress);
        }
        element.urls.forEach(function (url) {
            console.log("mapped", url, ":", handlerAddress);
            if (toReturn[url] !== undefined) {
                throw new Error("duplicate urls for " + url + " handlers: "
                    + JSON.stringify(element) + ", " + JSON.stringify(toReturn[url]));
            }
            var memoryLimit = element.extraData.memoryLimit || 128;
            var timeLimit = element.extraData.timeLimit || 6000;
            var schedulingCron = element.extraData.schedulingCron;
            toReturn[url] = {
                handlerName: handlerAddress,
                timeLimitInMilliSeconds: timeLimit,
                memoryLimit: memoryLimit,
                schedulingCron : schedulingCron
            }
        });
    });
    return toReturn;
}


