/**
 * Created by hamid on 8/12/16.
 */
'use strict';
const fs = require('fs');
const Path = require('path');

const SwaggerFile = "generatedSwagger.json";
const infoFileAddr = "../info.json";


const GenericField = require("../requestDataHandler/dataTypes/GenericField");
const BaseObject = require("../requestDataHandler/BaseObject");

var infoFile = Path.resolve(__dirname, infoFileAddr);
var infoString = fs.readFileSync(infoFile);
var info = JSON.parse(infoString);

const HandlerInformation = require("../requestHandler/HandlerInformation");


/**
 * @Annotation("Description")
 * @Target("function")
 * @Scope("compile")
 * @InitMethod("init");
 * @Priority(-1)
 * */
module.exports.time = function (appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo) {
    var description = annotationValues[0][0];
    var id = appContext.handlerContainer.generateHandlerIdentifier(moduleRuntimeInfo, functionRuntimeInfo);
    var handlerInfo = appContext.handlerContainer.getHandler(id);
    handlerInfo.extraData.description = description;
};


module.exports.init = function (appContext, annotationInfo) {
    appContext.contextLoadedCallbacks.push(writeSwaggerFile);
};

function writeSwaggerFile(appContext) {
    var dest = Path.join(appContext.appDirectory, SwaggerFile);
    var createdObject = makeSwaggerObjectToWrite(appContext);
    fs.writeFileSync(dest, JSON.stringify(createdObject, null, 4));
}

function makeSwaggerObjectToWrite(appContext) {
    var requestTypeContainer = appContext.handlerContainer.getRequestTypeContainer();
    var responseTypeContainer = appContext.handlerContainer.getResponseTypeContainer();
    var handlerList = appContext.handlerContainer.listAllHandlers();
    var toReturn = {};
    var definitions = {};
    var paths = {};
    var info = getProjectInfo();
    toReturn["swagger"] = "2.0";
    toReturn["info"] = {
        version: info.version,
        title: info.name
    };
    //toReturn["basePath"] = info.basePath;
    toReturn["paths"] = paths;
    toReturn["definitions"] = definitions;
    handlerList.forEach(function (element) {
        var requestType = requestTypeContainer.getTypeWithAddress(element.request, appContext.appDependencyLoader);
        var responseType = responseTypeContainer.getTypeWithAddress(element.response, appContext.appDependencyLoader);
        var desc = element.extraData.description || element.moduleName + "." + element.functionName;
        element.urls.forEach(function (url) {
            var requestItem = {};
            requestItem["parameters"] = makeItemAsInputParameter(requestType, definitions);
            requestItem["responses"] = {
                "200": {
                    "description": desc,
                    "schema" : makeItemsAsResponseParameter(responseType, definitions)
                }
            };
            var finalObject = {};
            finalObject[element.method] = requestItem;
            paths["/" + url] = finalObject;
        });
    });
    return toReturn;
}

function makeItemAsInputParameter(type, definitions) {
    var toReturn = [];
    if(!type){
        return toReturn;
    }
    var typeObject = new type();
    //console.log("type", type);
    var items = typeObject._map();
    Object.keys(items).forEach(function (element) {
        let type = items[element];
        if(typeof(type) == "string"){
            var item = {};
            item.name = element;
            item.in = "query";
            let object = typeObject[element];
            item.required = object.isRequired();
            var typeDeclare = getItemTypeInfo(object, definitions);
            Object.keys(typeDeclare).forEach(function(element){
                item[element] = typeDeclare[element];
            });
            toReturn.push(item);
        }else{
            console.log(element);
            throw new Error("cannot put object parameter in query yet!! :(");
        }
    });
    return toReturn;
}

function getItemTypeInfo(object, definitions){
    var toReturn = {};
    if(object instanceof GenericField){
        toReturn.format = object.getTypeName();
        switch (toReturn.format){
            case "array":
                toReturn.type = "array";
                toReturn.items = getItemTypeInfo(new (object.getItemType())(), definitions);
                break;
            case "id":
                toReturn.type = "string";
                break;
            case "date":
                toReturn.type = "number";
                break;
            case "integer":
                toReturn.type = "integer";
                break;
            case "number":
                toReturn.type = "number";
                break;
            case "string":
                toReturn.type = "string";
                break;
            case "boolean":
                toReturn.type = "boolean";
                break;
            case "enum":
                toReturn.type = "string";
                toReturn.enum = object.getEnumValues();
                break;
            default:
                toReturn.type = "string";
                break;
        }
        if(object.getDefault()){
            toReturn.default = object.getDefault();
        }
    }else if(object instanceof BaseObject){
        //toReturn.type = "object";
        toReturn["$ref"] = "#/definitions/" + object._name();
        addItemToDefinitions(object, definitions);
    }else{
        console.log("bad call with object", object);
    }
    return toReturn;

}

function makeItemsAsResponseParameter(type, definitions) {
    if(!type){
        return undefined;
    }
    var typeObject = new type();
    var toReturn = getItemTypeInfo(typeObject, definitions);
    if(toReturn.type !== undefined){
        delete toReturn.type;
    }
    return toReturn;
}

function addItemToDefinitions(object, definitions) {
    if(definitions[object._name()] !== undefined){
        return;
    }
    var properties = {};
    var keys = object._map();
    Object.keys(keys).forEach(function (element) {
        properties[element] = getItemTypeInfo(object[element], definitions);
    });
    definitions[object._name()] = {
        "properties": properties
    }
}


function getProjectInfo() {
    return info;
}