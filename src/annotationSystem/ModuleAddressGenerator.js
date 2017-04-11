/**
 * Created by hamid on 8/6/16.
 */
'use strict';
const Path = require('path');

function setModuleGeneratedAddress(baseFolder){
    return function(moduleRuntimeInfo){
        moduleRuntimeInfo.moduleRuntimeAddress = Path.resolve(baseFolder, moduleRuntimeInfo.name + ".js");
        return moduleRuntimeInfo;
    }
}

module.exports = setModuleGeneratedAddress;



