/**
 * Created by hamid on 8/1/16.
 */
'use strict';

const Path = require('path');
const AspectDataContainer = require('./AspectDataContainer.js');
const ModuleInfo = require('./ModuleInfo.js');
const FunctionRuntimeInformation = require('./FunctionRuntimeInformation.js');

function ModuleRuntimeInformation() {
    this.init();
}

ModuleRuntimeInformation.prototype = Object.create(ModuleInfo.prototype);

ModuleRuntimeInformation.prototype.init = function(){
    ModuleInfo.prototype.init.call(this);
    this.constructorAspects = new AspectDataContainer();
    this.functionsAspects = new AspectDataContainer();
    this.runArgs = [];
    this.moduleRuntimeAddress = ''; // moduleAddress to use in require statement
    this.moduleRef = undefined; //cache of module
};

ModuleRuntimeInformation.prototype.addNewConstructorAspect = function (aspectData) {
    this.constructorAspects.addNew(aspectData);
};

ModuleRuntimeInformation.prototype.addNewRunctionAspect = function (aspectData) {
    this.functionsAspects.addNew(aspectData);
};

ModuleRuntimeInformation.prototype.hasCache = function(){
    return this.moduleRef !== undefined;
};

ModuleRuntimeInformation.prototype.setFromModuleInfo = function(moduleInfo){
    this.fileInfo = moduleInfo.fileInfo; //module file info
    this.name = moduleInfo.name;
    this.annotations = moduleInfo.annotations;
    this.args = moduleInfo.args;
    this.functions = {};
    if(this.fileInfo){
        this.moduleRuntimeAddress = this.fileInfo.path; // moduleAddress to use in require statement
    }else{
        this.moduleRuntimeAddress = "";
    }
    this.runArgs = this.args.slice();
    if(moduleInfo.functions !== undefined){
        Object.keys(moduleInfo.functions).forEach(function(element){
            this.functions[element] = FunctionRuntimeInformation.makeFromFunctionInfo(moduleInfo.functions[element]);
        }, this);
    }
};

ModuleRuntimeInformation.prototype.getRuntimeAddress = function(fromAddress){
    if(Path.extname(fromAddress) !== ''){
        fromAddress = Path.dirname(fromAddress);
    }
    const relative = Path.relative(fromAddress, this.moduleRuntimeAddress);
    // console.log("relative is " + relative);
    return relative.replace(/\\/g, '\/');
};

module.exports = ModuleRuntimeInformation;

module.exports.makeFromModuleInfo = function(moduleInfo){
    const toReturn = new ModuleRuntimeInformation();
    toReturn.setFromModuleInfo(moduleInfo);
    return toReturn;
};