/**
 * Created by hamid on 7/27/16.
 */
'use strict';

const fs = require('fs');
const ModuleInfo = require('./data/ModuleInfo.js');
const FunctionInfo = require('./data/FunctionInfo.js');



/*
 @type('controller')
 */
module.exports = {};

var parser = require('annotation-parser');

function getFunctionArgs(func) {
    // First match everything inside the function argument parens.
    var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];

    // Split the arguments string into an array comma delimited.
    return args.split(',').map(function(arg) {
        // Ensure no inline comments are parsed and trim the whitespace.
        return arg.replace(/\/\*.*\*\//, '').trim();
    }).filter(function(arg) {
        // Ensure no undefined values are added.
        return arg;
    });
}

function scanModule(fileInfo){
    var filePath = fileInfo.path;
    return new Promise(function(resolve, reject){
        parser(filePath, function(err, annotations){

            if(err || !annotations) return reject(err);
            var moduleInfo = new ModuleInfo();
            moduleInfo.fileInfo = fileInfo;
            moduleInfo.name = annotations.module.name;
            moduleInfo.annotations = annotations.module.annotations;
            if(annotations.module.ref instanceof Function){
                moduleInfo.isCallable = true;
                moduleInfo.args = getFunctionArgs(annotations.module.ref);
            }else{
                moduleInfo.isCallable = false;
            }
            var functionNames = Object.keys(annotations.functions);
            for(let i = 0; i < functionNames.length; i ++){
                let functionItem = annotations.functions[functionNames[i]];
                let functionArgs = getFunctionArgs(functionItem.ref);
                let functionInfo = new FunctionInfo();
                functionInfo.args = functionArgs;
                functionInfo.name = functionNames[i];
                functionInfo.annotations = functionItem.annotations;
                moduleInfo.functions[functionNames[i]] = functionInfo;
            }
            resolve(moduleInfo);
        });
    });
}

/**
 * @hello("hamid");
 * @type('test');
 */
module.exports.scanModule = scanModule;

// @salam('123')
module.exports.getFunctionArgs = getFunctionArgs;

