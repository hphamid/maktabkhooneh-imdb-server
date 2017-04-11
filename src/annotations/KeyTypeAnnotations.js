/**
 * Created by hamid on 8/13/16.
 */
'use strict';

const ParameterHandler = require("../annotationRuntimeModules/ParameterHandler");
const AspectData = require("../annotationSystem/data/AspectData");
const AspectModuleName = "KeyTypeAnnotations_AspectItem_092727";
const MasterKeyRequiredAspectFunctionName = "masterKeyRequired";

/**
 * @Annotation("MasterKeyRequired")
 * @Target("function")
 * @Scope("compile")
 */
module.exports.masterKeyRequired = function(appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo){
    var aspectInfo = appContext.appDependencyLoader.getModuleInfo(AspectModuleName);
    if(aspectInfo === undefined){
        throw new Error("cannot find aspect");
    }
    var data = ParameterHandler.makeSureParametersExists(functionRuntimeInfo, ["context"]);
    var aspectData = new AspectData();
    aspectData.module = aspectInfo.name;
    aspectData.extraData = data;
    aspectData.functionName = MasterKeyRequiredAspectFunctionName;
    aspectData.type = AspectData.Around;
    functionRuntimeInfo.addAspect(aspectData);
};
