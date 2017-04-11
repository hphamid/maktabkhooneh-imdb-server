/**
 * Created by hamid on 8/13/16.
 */
'use strict';

const ParameterHandler = require("../annotationRuntimeModules/ParameterHandler");
const AspectData = require("../annotationSystem/data/AspectData");
const AspectModuleName = "LoginAnnotations_AspectItem_120713";
const LoginRequiredAspectFunctionName = "loginRequired";
const ActiveUserAspectFunctionName = "activeUser";

/**
 * @Annotation("LoginRequired")
 * @Target("function")
 * @Scope("compile")
 * @Priority(1)
 */
module.exports.loginRequired = function(appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo){
    var aspectInfo = appContext.appDependencyLoader.getModuleInfo(AspectModuleName);
    if(aspectInfo === undefined){
        throw new Error("cannot find aspect");
    }
    var data = ParameterHandler.makeSureParametersExists(functionRuntimeInfo, ["context"]);
    var aspectData = new AspectData();
    aspectData.module = aspectInfo.name;
    aspectData.extraData = data;
    aspectData.functionName = LoginRequiredAspectFunctionName;
    aspectData.type = AspectData.Around;
    functionRuntimeInfo.addAspect(aspectData);
};

/**
 * @Annotation("ActiveUser")
 * @Target("function")
 * @Scope("compile")
 */
module.exports.activeUser = function(appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo){
    var activeUserIndex = functionRuntimeInfo.runArgs.indexOf("activeUser");
    if( activeUserIndex < 0){
        throw new Error("active user not found!");
    }
    functionRuntimeInfo.runArgs.splice(activeUserIndex, 1);
    var aspectInfo = appContext.appDependencyLoader.getModuleInfo(AspectModuleName);
    if(aspectInfo === undefined){
        throw new Error("cannot find aspect");
    }
    var data = ParameterHandler.makeSureParametersExists(functionRuntimeInfo, ["context"]);
    var aspectData = new AspectData();
    aspectData.module = aspectInfo.name;
    aspectData.extraData = {parameterData:data, activeIndex: activeUserIndex};
    aspectData.functionName = ActiveUserAspectFunctionName;
    aspectData.type = AspectData.Around;
    functionRuntimeInfo.addAspect(aspectData);
};


