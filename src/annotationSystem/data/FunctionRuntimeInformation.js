/**
 * Created by hamid on 8/4/16.
 */
'use strict';

const AspectDataContainer = require('./AspectDataContainer.js');
const FunctionInfo = require('./FunctionInfo.js');

function FunctionRuntimeInformation(){
    this.init();
}

FunctionRuntimeInformation.prototype = Object.create(FunctionInfo.prototype);

FunctionRuntimeInformation.prototype.init = function(){
    FunctionInfo.prototype.init.call(this);
    this.aspects = new AspectDataContainer();
    this.runArgs = [];
};

FunctionRuntimeInformation.prototype.setFromFunctionInfo = function(functionInfo){
    this.name = functionInfo.name;
    this.args = functionInfo.args;
    this.annotations = functionInfo.annotations;
    this.runArgs = this.args.slice();
};

FunctionRuntimeInformation.prototype.addAspect = function(aspect){
    this.aspects.addNew(aspect);
};

module.exports = FunctionRuntimeInformation;
module.exports.makeFromFunctionInfo = function(functionInfo){
    var toReturn = new FunctionRuntimeInformation();
    toReturn.setFromFunctionInfo(functionInfo);
    return toReturn;
};