/**
 * Created by hamid on 8/4/16.
 */
'use strict';

function DependencyLoader(){
    throw "abstract class!";
}

DependencyLoader.prototype.init = function(){

};

DependencyLoader.prototype.loadModuleByName = function(moduleName){
    return undefined;
};

DependencyLoader.prototype.getModuleRuntimeAddressWithName = function(moduleName, from){
    return '';
};

DependencyLoader.prototype.addModule = function(moduleName){

};

DependencyLoader.prototype.hasModule = function(moduleName){
    return false;
};


DependencyLoader.prototype.getModuleInfo = function(moduleName) {
    return {};
};
