/**
 * Created by hamid on 8/11/16.
 */
'use strict';
var ValidatableObject = require("../requestDataHandler/ValidatableObject");
var TypeContainerSample = require("../requestHandler/TypeContainerSample");


function RequestObjectData(){
    this.init();
}
RequestObjectData.prototype.init = function(){
    this.name = "";
};


var requestData = {}; // a map from name to requestObject

function RequestTypeContainer(){

}

RequestTypeContainer.prototype = Object.create(TypeContainerSample.prototype);

RequestTypeContainer.prototype.getTypeModuleName = function(typeName){
    console.log("got type name", typeName);
    if(requestData[typeName] !== undefined){
        return requestData[typeName].name;
    }
    return undefined;
};

RequestTypeContainer.prototype.getTypeWithTypeName = function(typeName, dependencyLoader){
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

RequestTypeContainer.prototype.getTypeWithAddress = function(address, dependencyLoader){
    if(!address){
        return undefined;
    }
    return require(address);
};



module.exports.init = function (appcontext, annotationInfo) {
    var oldContainer = appcontext.handlerContainer.getRequestTypeContainer();
    if(oldContainer !== undefined){
        throw new Error("there is a handler!!");
    }
    appcontext.handlerContainer.setRequestTypeContainer(new RequestTypeContainer());
};


/**
 * @Annotation("Request")
 * @Target("module")
 * @Scope("init")
 * @InitMethod("init")
 * */
module.exports.request = function (appContext, moduleRuntimeInfo, annotationValues) {
    var name = annotationValues[0][0];
    if(requestData[name] !== undefined){
        throw new Error("there is already a Request with name " + moduleRuntimeInfo.name);
    }
    var data = new RequestObjectData();
    data.name = moduleRuntimeInfo.name;
    requestData[name] = data;
};



/**
 * @Annotation("RequestType")
 * @Target("function")
 * @Scope("compile")
 * */
module.exports.requestType = function (appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo) {
    var type = annotationValues[0][0];
    var id = appContext.handlerContainer.generateHandlerIdentifier(moduleRuntimeInfo, functionRuntimeInfo);
    // console.log(id);
    var handlerInfo = appContext.handlerContainer.getHandler(id);
    var baseAddress = __dirname;
    if(requestData[type] === undefined){
        throw new Error("could not find request type:" + type + " in module " + moduleRuntimeInfo.name + " function " + functionRuntimeInfo.name) ;
    }
    handlerInfo.request = appContext.appDependencyLoader.getModuleRuntimeAddressWithName(requestData[type].name, baseAddress);
};


/**
 * @RequestConverter()
 */
module.exports.convert = function(requestBody, dataType){
    var DataClass = require(dataType);
    if(DataClass === undefined){
        throw new Error("could not find data type " + dataType);
    }
    var Data = new DataClass(requestBody);
    if(!Data instanceof ValidatableObject){
        throw new Error("Bad Data type!" + dataType);
    }
    var errors = Data.validate();
    if(errors && errors.length > 0){
        throw errors;
    }
    return Data; //return result or throw error.
};