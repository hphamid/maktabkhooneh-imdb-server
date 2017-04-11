/**
 * Created by hamid on 8/3/16.
 */
'use strict';

/**
 * all annotatoin function must have this annotation in order to save to annotation list
 * @type {string}
 */
const AnnotationFunctionAnnotation = "Annotation";

/**
 * you can pass a list of init methods in this module to be called before using any annotation
 * @type {string}
 */
const InitMethodAnnotation = "InitMethod";

/**
 * priority of annotations
 * more is better! :)
 * @type {string}
 */
const PriorityAnnotation = "Priority";

/**
 * define the scope of annotation.
 * supported types = compile, runtime
 * @type {string}
 */
const ScopeAnnotations = "Scope";

/**
 * define target of annotation
 * supported types = module, function
 * @type {string}
 */
const TargetAnnotation = "Target";
const ModuleTarget = "module";
const FunctionTarget = "function";

function AnnotationInformation() {
    this.moduleName = "";
    this.functionName = undefined; // if function name is undefined it means module is an annotation function
    this.annotationPriority = 0;
    this.name = "";
    this.scopes = new Set();
    this.targets = new Set();
    this.initMethods = [];
}

AnnotationInformation.prototype.hasScope = function (scope) {

    return scope === undefined || this.scopes.size == 0 || this.scopes.has(scope);
};

AnnotationInformation.prototype.hasTarget = function (scope) {
    return scope === undefined || this.targets.size == 0 || this.targets.has(scope);
};

function AnnotationContainer() {
    this.init();
}

AnnotationContainer.prototype.init = function () {
    this.annotations = {}; //a map from annotationName to AnnotationInformation
    this._dependencyLoader = undefined;
};


//a function to scan a module an load functions as annotation if marked.
AnnotationContainer.prototype.checkModuleAndLoadAnnotations = function (moduleInfo, appContext) {
    //first check if module in an annotation function
    this._addModuleAsAnnotation(moduleInfo, appContext);
    //now check function annotations
    for (let element in moduleInfo.functions) {
        let functionRuntimeInfo = moduleInfo.functions[element];
        this._addFunctionAsAnnotation(moduleInfo, functionRuntimeInfo, appContext);
    }
    return moduleInfo;
};

// check if module is annotation function
AnnotationContainer.prototype._addModuleAsAnnotation = function (moduleInfo, appContext) {
    if (!isAnnotationFunction(moduleInfo.annotations)) {
        return;
    }
    var info = getAnnotationContainerFilledFromAnnotationInfo(moduleInfo.annotations);
    info.moduleName = moduleInfo.name;
    this._addNewAnnotation(info, appContext);
};

AnnotationContainer.prototype._addFunctionAsAnnotation = function (moduleInfo, functionInfo, appContext) {
    if (!isAnnotationFunction(functionInfo.annotations)) {
        return;
    }
    var info = getAnnotationContainerFilledFromAnnotationInfo(functionInfo.annotations);
    info.moduleName = moduleInfo.name;
    info.functionName = functionInfo.name;
    this._addNewAnnotation(info, appContext);
};

AnnotationContainer.prototype._addNewAnnotation = function (annotationInformation, appContext) {
    if (this.annotations[annotationInformation.name] === undefined) {
        this.annotations[annotationInformation.name] = [];
    }
    //if(this.annotations[annotationInformation.name] !== undefined){
    //    throw "duplicate annotation" + JSON.stringify(this.annotations[annotationInformation.name]) + " and " +
    //    JSON.stringify(annotationInformation);
    //}
    this.annotations[annotationInformation.name].push(annotationInformation);
    this._callInitMethodsOfAnnotation(annotationInformation, appContext);
};

//run init module of annotations
AnnotationContainer.prototype._callInitMethodsOfAnnotation = function (annotationInformation, appContext) {
    var module = this._getAnnotationModule(annotationInformation);
    annotationInformation.initMethods.forEach(function (element) {
        console.log("about to call init functions of " + annotationInformation.name);
        module[element](appContext, annotationInformation);
    });
};


function isAnnotationFunction(annotations) {
    return annotations[AnnotationFunctionAnnotation] !== undefined &&
        annotations[AnnotationFunctionAnnotation].length > 0;
}

function getAnnotationContainerFilledFromAnnotationInfo(annotations) {
    var toReturn = new AnnotationInformation();
    toReturn.name = annotations[AnnotationFunctionAnnotation][0][0];
    if (annotations[ScopeAnnotations] !== undefined) {

        annotations[ScopeAnnotations].forEach(function (usedElement) {
            usedElement.forEach(function (element) {
                toReturn.scopes.add(element);
            });
        });
    }

    if (annotations[TargetAnnotation] !== undefined) {
        annotations[TargetAnnotation].forEach(function (usedElement) {
            usedElement.forEach(function (element) {
                toReturn.targets.add(element);
            });
        });
    }

    if (annotations[PriorityAnnotation] !== undefined) {
        toReturn.annotationPriority = annotations[PriorityAnnotation][0][0];
    }

    if (annotations[InitMethodAnnotation] != undefined) {
        annotations[InitMethodAnnotation].forEach(function (usedElement) {
            usedElement.forEach(function (element) {
                toReturn.initMethods.push(element);
            });
        });
    }
    return toReturn;
}

AnnotationContainer.prototype.setAnnotationDependencyLoader = function (toSet) {
    this._dependencyLoader = toSet;
};

AnnotationContainer.prototype.getAnnotationDependencyLoader = function () {
    return this._dependencyLoader;
};

/**
 * scan a module for annotations and call annotation functions.
 * @param moduleRuntimeInfo
 * @param scope is compile or runtime or undefined which means both! :))
 * @param appContext
 */
AnnotationContainer.prototype.ScanAndLoadModuleUsedAnnotations = function (moduleRuntimeInfo, scope, appContext) {
    //scan module annotations
    this._onModuleAnnotationScan(moduleRuntimeInfo, scope, appContext);
    //now lets check module functions
    Object.keys(moduleRuntimeInfo.functions).forEach(function (element) {
        var functionRuntimeInfo = moduleRuntimeInfo.functions[element];
        this._onFunctionAnnotationScan(moduleRuntimeInfo, functionRuntimeInfo, scope, appContext);
    }, this);

    return moduleRuntimeInfo;
};

AnnotationContainer.prototype._onModuleAnnotationScan = function (moduleRuntimeInfo, scope, appContext) {
    var sortedAnnotations = this._getUsedAnnotationsSorted(moduleRuntimeInfo.annotations, scope, ModuleTarget,
        moduleRuntimeInfo.name);
    sortedAnnotations.forEach(function (annotationInformation) {
        this._onModuleAnnotationUsed(moduleRuntimeInfo, moduleRuntimeInfo.annotations[annotationInformation.name],
            annotationInformation, appContext);
    }, this);

};

AnnotationContainer.prototype._onFunctionAnnotationScan = function (moduleRuntimeInfo,
                                                                    functionRuntimeInfo,
                                                                    scope,
                                                                    appContext) {
    var sortedAnnotations = this._getUsedAnnotationsSorted(functionRuntimeInfo.annotations, scope, FunctionTarget,
        moduleRuntimeInfo.name, functionRuntimeInfo.name);
    sortedAnnotations.forEach(function (annotationInformation) {
        this._onFunctionAnnotationUsed(moduleRuntimeInfo, functionRuntimeInfo,
            functionRuntimeInfo.annotations[annotationInformation.name],
            annotationInformation, appContext);
    }, this);
};

AnnotationContainer.prototype._getUsedAnnotationsSorted = function (annotations, scope, target, moduleName, functionName) {
    var foundAnnotations = {};
    if (functionName === undefined) {
        functionName = "";
    }
    Object.keys(annotations).forEach(function (element) {
        var annotations = this._getAppropriateAnnotations(element, scope, target);
        annotations.forEach(function (annotationInfo) {
            console.log("Annotation", JSON.stringify(element), "used in", moduleName, functionName);
            if (foundAnnotations[annotationInfo.annotationPriority] === undefined) {
                foundAnnotations[annotationInfo.annotationPriority] = [];
            }
            foundAnnotations[annotationInfo.annotationPriority].push(annotationInfo);
        }, this);
    }, this);
    var toReturn = [];
    var sortedKeys = Object.keys(foundAnnotations).slice().sort();
    sortedKeys = sortedKeys.reverse();
    sortedKeys.forEach(function (key) {
        toReturn = toReturn.concat(foundAnnotations[key]);
    }, this);
    return toReturn;
};


//just a helper to be used in ScanAndLoadModuleUsedAnnotations
AnnotationContainer.prototype._onFunctionAnnotationUsed = function (moduleRuntimeInfo, functionRuntimeInfo,
                                                                    annotationValues, annotationInformation,
                                                                    appContext) {
    var annotationFunction = this._getAnnotationFunction(annotationInformation);

    annotationFunction.call({}, appContext, moduleRuntimeInfo, annotationValues, functionRuntimeInfo);
};

//just a helper to be used in ScanAndLoadModuleUsedAnnotations
AnnotationContainer.prototype._onModuleAnnotationUsed = function (moduleRuntimeInfo, annotationValues,
                                                                  annotationInformation, appContext) {
    var annotationFunction = this._getAnnotationFunction(annotationInformation);

    try {
        annotationFunction.call({}, appContext, moduleRuntimeInfo, annotationValues);
    } catch (err) {
        console.log("error", err);
    }
};

AnnotationContainer.prototype._getAppropriateAnnotations = function (annotationName, scope, target) {
    var toReturn = [];
    if (this.annotations[annotationName] === undefined) {
        return toReturn;
    }
    var annotationInfos = this.annotations[annotationName];
    annotationInfos.forEach(function (element) {
        if (element.hasScope(scope) && element.hasTarget(target)) {
            toReturn.forEach(function (oldAnnotationUsed) {
                if (element.annotationPriority == oldAnnotationUsed.annotationPriority) {
                    throw "duplicate annotation with same priority: " + JSON.stringify(oldAnnotationUsed) + " and " +
                    JSON.stringify(element);
                }
            });
            toReturn.push(element);
        }
    });
    return toReturn;
};

AnnotationContainer.prototype._getAnnotationModule = function (annotationInformation) {
    var dependencyLoader = this.getAnnotationDependencyLoader();
    return dependencyLoader.loadModuleByName(annotationInformation.moduleName);
};

AnnotationContainer.prototype._getAnnotationFunction = function (annotationInformation) {
    var module = this._getAnnotationModule(annotationInformation);
    if (annotationInformation.functionName == undefined) {
        return module;
    }
    return module[annotationInformation.functionName];
};

module.exports = AnnotationContainer;
