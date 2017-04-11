/**
 * Created by hamid on 8/13/16.
 */
'use strict';

const ParameterHandler = require("../annotationRuntimeModules/ParameterHandler");
const AspectData = require("../annotationSystem/data/AspectData");
const AspectModuleName = "PaginationAnnotation_AspectItem_14046";
const AspectFunctionName = "aspect";

/**
 * @Annotation("Pagination")
 * @Target("function")
 * @Scope("compile")
 */
module.exports.Local = function(appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo){
    var aspectInfo = appContext.appDependencyLoader.getModuleInfo(AspectModuleName);
    if(aspectInfo === undefined){
        throw new Error("cannot find aspect");
    }

    var skipIndex = functionRuntimeInfo.runArgs.indexOf("userSkip");
    if(skipIndex >= 0) functionRuntimeInfo.runArgs.splice(skipIndex, 1);
    var limitIndex = functionRuntimeInfo.runArgs.indexOf("userLimit");
    if(limitIndex >= 0) functionRuntimeInfo.runArgs.splice(limitIndex, 1);

    if(skipIndex < 0 && limitIndex < 0){
        throw new Error("no userSkip or userLimit found in " + moduleRuntimeInfo.name + ":" + functionRuntimeInfo.name);
    }

    var data = ParameterHandler.makeSureParametersExists(functionRuntimeInfo, ["requestBody"]);
    var aspectData = new AspectData();
    aspectData.module = aspectInfo.name;
    aspectData.extraData = {skipIndex: skipIndex, limitIndex: limitIndex, pData:data};

    aspectData.functionName = AspectFunctionName;
    aspectData.type = AspectData.Around;
    functionRuntimeInfo.addAspect(aspectData);
};
