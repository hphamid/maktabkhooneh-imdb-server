/**
 * Created by hamid on 8/11/16.
 */
'use strict';

const ValidatableObject = require("../requestDataHandler/ValidatableObject");
const BaseObject = require("../requestDataHandler/BaseObject");
const TypeContainerSample = require("../requestHandler/TypeContainerSample");

function ResponseObjectData(){
    this.init();
}
ResponseObjectData.prototype.init = function(){
    this.name = "";
};

var responseData = {}; // a map from name to requestObject

function ResponseTypeContainer(){

}

ResponseTypeContainer.prototype = Object.create(TypeContainerSample.prototype);

ResponseTypeContainer.prototype.getTypeModuleName = function(typeName){
    if(responseData[typeName] !== undefined){
        return responseData[typeName].name;
    }
    return undefined;
};

ResponseTypeContainer.prototype.getTypeWithTypeName = function(typeName, dependencyLoader){
    var name = this.getTypeModuleName(typeName);
    if(name === undefined){
        return undefined;
    }
    var addr = dependencyLoader.getModuleRuntimeAddressWithName(typeName, __dirname);
    if(addr === undefined){
        return undefined;
    }
    return require(addr);
};

ResponseTypeContainer.prototype.getTypeWithAddress = function(address, dependencyLoader){
    if(!address){
        return undefined;
    }
    return require(address);
};

module.exports.init = function (appcontext, annotationInfo) {
    var oldContainer = appcontext.handlerContainer.getResponseTypeContainer();
    if(oldContainer !== undefined){
        throw new Error("there is a handler!!");
    }
    appcontext.handlerContainer.setResponseTypeContainer(new ResponseTypeContainer());
};


/**
 * @Annotation("Response")
 * @Target("module")
 * @Scope("init")
 * @InitMethod("init")
 * */
module.exports.response = function (appContext, moduleRuntimeInfo, annotationValues) {
    var name = annotationValues[0][0];
    if(responseData[name] !== undefined){
        throw new Error("there is already a Response with name " + moduleRuntimeInfo.name);
    }
    var data = new ResponseObjectData();
    data.name = moduleRuntimeInfo.name;
    responseData[name] = data;
};



/**
 * @Annotation("ResponseType")
 * @Target("function")
 * @Scope("compile")
 * */
module.exports.responseType = function (appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo) {
    var type = annotationValues[0][0];
    var id = appContext.handlerContainer.generateHandlerIdentifier(moduleRuntimeInfo, functionRuntimeInfo);
    var handlerInfo = appContext.handlerContainer.getHandler(id);
    var baseAddress = __dirname;
    if(responseData[type] === undefined){
        throw new Error("could not find data type:" + type + " in " + moduleRuntimeInfo.name + ":" + functionRuntimeInfo.name);
    }
    handlerInfo.response = appContext.appDependencyLoader.getModuleRuntimeAddressWithName(responseData[type].name, baseAddress);
};

/**
 * @ResponseConverter()
 */
module.exports.convert = function(result, dataType){
    if(!dataType){
        return result; //return new result or throw error to pass to error converter.
    }else{
        var DataClass = require(dataType);
        if(DataClass === undefined){
            throw new Error("could not find data type " + dataType);
        }
        var Data = undefined;
        if(result instanceof DataClass){
            Data = result;
        }else{
            Data = new DataClass(result);
        }
        if(!Data instanceof BaseObject){
            throw new Error("Bad Data type!" + dataType);
        }
        if(Data.success !== undefined && Data.success.value() === false){
            Data.success.setValue(true);
        }
        if(Data instanceof ValidatableObject){
            var errors = Data.validate();
            if(errors && errors.length > 0){
                throw errors;
            }
        }
        return Data; //return result or throw error.
    }
};
