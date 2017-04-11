/**
 * Created by hamid on 8/4/16.
 */
'use strict';

const AnnotatoinHelper = require('../annotationSystem/AnnotationHelper.js');
const AspectData = require('../annotationSystem/data/AspectData.js');
const AspectModuleName = "AutoWired_AspectItem_75053";
const AspectModuleFunctionName = "aspect";

function AutoWiredModuleInformation() {

}

AutoWiredModuleInformation.prototype.init = function () {
    this.moduleName = "";
    this.moduleAddress = "";
    //if undefined just require but if functionName is not undefined then call that function. if function name is "" call module!
    this.functionName = undefined;
    this.toPassParamsNames = undefined; //just a temp variable must be undefined in last
    this.toPassParamsIndex = []; //list of parameters to pass to function item
};

function PassedExtraData() {
    this.init();
}

PassedExtraData.prototype.init = function () {
    this.originalArguments = [];
    this.autoWiredModules = {}; // a map from string to AutoWiredModuleInformation
};

function ComponentInformation() {
    this.init();
}

ComponentInformation.prototype.init = function () {
    this.moduleName = "";
    this.functionName = undefined;
    this.isProvider = false; //function name must be undefined or "" if isProvider equals to false
    this.names = []; //list of provided modules
};
// ################################################################ end of primitive data ################################################################

var components = {}; //a map form module name to Dependency Provider Information


function addComponent(appContext, isProvider, moduleRuntimeInfo, annotationValues, functionRuntimeInfo) {
    var usedAnnotations = AnnotatoinHelper.flattenAnnotations(annotationValues);
    if(usedAnnotations.length == 0 && !isProvider){
        usedAnnotations.push(moduleRuntimeInfo.name);
    }
    var toAdd = new ComponentInformation();
    toAdd.moduleName = moduleRuntimeInfo.name;
    if (isProvider && functionRuntimeInfo) {
        toAdd.functionName = functionRuntimeInfo.name;
    } else if (moduleRuntimeInfo.isCallable) {
        toAdd.functionName = "";
    } else if(!isProvider){
        toAdd.functionName = undefined;
    }else{
        throw new Error("cannot add module " + moduleRuntimeInfo.name + " as component");
    }
    toAdd.isProvider = isProvider;
    toAdd.names = usedAnnotations;
    usedAnnotations.forEach(function (element) {
        //if (appContext.appDependencyLoader.hasModule(element)) {
        //    throw new Error("there is a already a provider for module " + element
        //        + " at " + moduleRuntimeInfo.fileInfo.path);
        //}
        if (components[element] !== undefined) {
            throw new Error("there is a already a component with name " + element
                + ". component module address: " + components[element].fileInfo.path);
        }
        components[element] = toAdd;
    });
    //console.log("components", usedAnnotations, annotationValues, JSON.stringify(components));
}

function resolveDependencies(appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo,
                             useDependencyProvider, useGlobalModules = false) {
    var autoWiredItemList = getListOfAutoWiredItems(annotationValues);
    var extraData = new PassedExtraData();
    extraData.originalArguments = functionRuntimeInfo.runArgs.slice();
    var finalArguments = [];
    var aspectModuleInfo = appContext.appDependencyLoader.getModuleInfo(AspectModuleName);
    if (!aspectModuleInfo) {
        throw new Error("aspect module not found!");
    }
    var baseAddress = aspectModuleInfo.fileInfo.folder;
    extraData.originalArguments.forEach(function (element) {
        if (autoWiredItemList.size == 0) { // no parameter pass so try for every arguments
            let moduleInfo = getModuleAutoWiredInformation(moduleRuntimeInfo.name, element, extraData.originalArguments,
                appContext.appDependencyLoader, baseAddress, useDependencyProvider, useGlobalModules);
            if (moduleInfo) {
                extraData.autoWiredModules[element] = moduleInfo;
            } else {
                console.log("ignored parameter " + moduleRuntimeInfo.name + ":" + functionRuntimeInfo.name + " " + element);
                finalArguments.push(element);
            }
        } else {
            if (shouldAutoWireArgument(autoWiredItemList, element)) {
                let moduleInfo = getModuleAutoWiredInformation(moduleRuntimeInfo.name, element, extraData.originalArguments,
                    appContext.appDependencyLoader, baseAddress, useDependencyProvider, useGlobalModules);
                if (!moduleInfo) {
                    throw new Error("cannot autowire parameter " + moduleRuntimeInfo.name + ":"
                        + functionRuntimeInfo.name + " " + element);
                }
                extraData.autoWiredModules[element] = moduleInfo;
            } else {
                finalArguments.push(element);
            }
        }
    }, this);
    if (finalArguments.length == functionRuntimeInfo.runArgs.length) {
        return;
    }

    Object.keys(extraData.autoWiredModules).forEach(function (element) {
        var paramNames = extraData.autoWiredModules[element].toPassParamsNames;
        if (paramNames !== undefined && paramNames.length > 0) {
            extraData.autoWiredModules[element].toPassParamsIndex = getIndexes(paramNames, finalArguments);
        }
        extraData.autoWiredModules[element].toPassParamsNames = undefined;
    });

    var aspect = new AspectData();
    aspect.type = AspectData.Around;
    aspect.extraData = extraData;
    aspect.module = AspectModuleName;
    aspect.functionName = AspectModuleFunctionName;
    functionRuntimeInfo.addAspect(aspect);
    functionRuntimeInfo.runArgs = finalArguments;
    //console.log(JSON.stringify(functionRuntimeInfo));
}

function getIndexes(paramNames, args) {
    var indexes = [];
    for (let i in paramNames) {
        let index = args.indexOf(paramNames[i]);
        if (index < 0) {
            throw new Error("cannot find parameter " + paramNames[i]);
        }
        indexes.push(index);
    }
    return indexes;
}

function getModuleAutoWiredInformation(moduleName, elementName, originalArguments, dependencyLoader,
                                       baseAddress, useDependencyProvider = true, useGlobalModules = false) {
    //first check if there is a dependency provider for this module
    if (components[elementName] !== undefined) {
        let componentInfo = components[elementName];
        if(componentInfo.isProvider ){
            if(useDependencyProvider){
                //load as a dependency provider
                let dependencyProviderModule = dependencyLoader.getModuleInfo(componentInfo.moduleName);
                if (dependencyProviderModule === undefined) {
                    throw new Error("could not find dependency provider module " + componentInfo.moduleName);
                }
                let argNames = [];

                if (componentInfo.functionName === "") {
                    argNames = dependencyProviderModule.runArgs;
                } else {
                    let functionInfo = dependencyProviderModule.functions[componentInfo.functionName];
                    if (functionInfo === undefined) {
                        throw new Error("function " + componentInfo.functionName + " for module " +
                            componentInfo.moduleName + " not found for dependency provider");
                    }
                    argNames = functionInfo.runArgs;
                }
                let callArgs = [];
                for (let i = 0; i < argNames.length; i++) {
                    var index = originalArguments.indexOf(argNames[i]);
                    if (index < 0) {
                        console.log("module at " + moduleName + " cannot provide required parameters for provider  " +
                            componentInfo.moduleName + ". required parameter is " + argNames[i]);
                        return undefined;
                    }
                    callArgs.push(argNames[i]);
                }
                let result = new AutoWiredModuleInformation();
                result.moduleAddress = dependencyProviderModule.getRuntimeAddress(baseAddress);
                result.functionName = componentInfo.functionName;
                if (callArgs.length > 0) {
                    result.toPassParamsNames = callArgs;
                }
                return result;
            }
        }else{

            //load from components
            let moduleInfo = dependencyLoader.getModuleInfo(componentInfo.moduleName);
            if (!moduleInfo) {
                return undefined;
            }
            let toReturn = new AutoWiredModuleInformation();
            toReturn.moduleName = elementName;
            toReturn.moduleAddress = moduleInfo.getRuntimeAddress(baseAddress);
            toReturn.functionName = componentInfo.functionName;
            // no component argument support! :)
            return toReturn;
        }
    }

    //search in all components
    if (useGlobalModules) {
        //lets check if there is a module with that name!
        let moduleAddress = dependencyLoader.getModuleRuntimeAddressWithName(elementName, baseAddress);
        if (!moduleAddress) {
            return undefined;
        }
        let toReturn = new AutoWiredModuleInformation();
        toReturn.moduleName = elementName;
        toReturn.moduleAddress = moduleAddress;
        return toReturn;
    }
    return undefined;
}

function getListOfAutoWiredItems(annotationValues) {
    var toReturn = new Set();
    if (!annotationValues) {
        return toReturn;
    }
    annotationValues.forEach(function (element) {
        element.forEach(function (finalElement) {
            toReturn.add(finalElement);
        });
    });
    return toReturn;
}

function shouldAutoWireArgument(autoWiredItemList, argumentName) {
    return autoWiredItemList.has(argumentName);
}

// ################################################################ start of exports ################################################################

module.exports.init = function (appcontext, annotationInfo) {
    appcontext.contextLoadedCallbacks.push(logAllComponents)
};

function logAllComponents(appcontext){
    console.log("loaded components:");
    Object.keys(components).forEach(function(name){
        console.log("name:", name, "module:", components[name].moduleName);
    });
    console.log("all components listed");
}

/**
 * @Annotation("DependencyProvider")
 * @Target("function", "module")
 * @Scope("init")
 */
module.exports.DependencyProvider = function (appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo) {
    addComponent(appContext, true, moduleRuntimeInfo, annotationValues, functionRuntimeInfo);
};

/**
 * @Annotation("Component")
 * @Target("module")
 * @Scope("init")
 */
module.exports.component = function (appContext, moduleRuntimeInfo, annotationValues) {
    addComponent(appContext, false, moduleRuntimeInfo, annotationValues);
};

/**
 * @Annotation("Data")
 * @Target("module")
 * @Scope("init")
 */
module.exports.data = function (appContext, moduleRuntimeInfo, annotationValues) {
    addComponent(appContext, false, moduleRuntimeInfo, annotationValues);
};

/**
 * @Annotation("Repository")
 * @Target("module")
 * @Scope("init")
 */
module.exports.repository = function (appContext, moduleRuntimeInfo, annotationValues) {
    addComponent(appContext, false, moduleRuntimeInfo, annotationValues);
};

/**
 * @Annotation("AutoWired")
 * @Target("function")
 * @Scope("compile")
 * @InitMethod("init")
 * @Priority(100)
 */
module.exports.Autowired = function (appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo) {
    resolveDependencies(appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo, true, false);
};