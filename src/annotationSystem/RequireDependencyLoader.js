/**
 * Created by hamid on 8/4/16.
 */
'use strict';

const ModuleRuntimeInformation = require('./data/ModuleRuntimeInformation.js');

function RequireDependencyLoader(){
    this.init();
}

RequireDependencyLoader.prototype.init = function(){
    this.modules = {};
};

//required function for dependency loader
RequireDependencyLoader.prototype.loadModuleByName = function(moduleName){
    if(this.modules[moduleName] === undefined){
        return undefined;
    }
    return this.loadModuleReferenceWithRuntimeInformation(this.modules[moduleName]);
};

//required function for dependency loader
RequireDependencyLoader.prototype.getModuleRuntimeAddressWithName = function(moduleName, from){
    if(this.modules[moduleName] === undefined){
        return undefined;
    }
    return this.modules[moduleName].getRuntimeAddress(from);
};

RequireDependencyLoader.prototype.loadModuleReferenceWithRuntimeInformation = function(moduleRuntimeInfo){
    if(!moduleRuntimeInfo.hasCache()){
        moduleRuntimeInfo.moduleRef = require(moduleRuntimeInfo.getRuntimeAddress(__dirname));
    }
    return moduleRuntimeInfo.moduleRef;
};


RequireDependencyLoader.prototype.getModuleInfo = function(moduleName){
    return this.modules[moduleName];
};

RequireDependencyLoader.prototype.hasModule = function(moduleName){
    return this.modules[moduleName] !== undefined;
};

//required function for dependency loader
RequireDependencyLoader.prototype.addModule = function(moduleInfo){
    var module = ModuleRuntimeInformation.makeFromModuleInfo(moduleInfo);
    if(module.name === undefined){
        throw "not valid module name" + module.name;
    }
    if(this.hasModule(module.name)){ //TODO what to do realy?!
        var oldModuleInfo = this.getModuleInfo(module.name);
        //ignore error if it is the same module! :)
        if(!(oldModuleInfo.fileInfo !== undefined && moduleInfo.fileInfo !== undefined &&
            oldModuleInfo.fileInfo.path === moduleInfo.fileInfo.path)){
            throw "module already exists " + JSON.stringify(oldModuleInfo) +
            " new one is " + JSON.stringify(module);
        }else{
            return oldModuleInfo;
        }
    }
    this.modules[module.name] = module;
    return module;
};

module .exports = RequireDependencyLoader;