/**
 * Created by hamid on 8/13/16.
 */
'use strict';

function ExtraData(){
    this.init();
}

ExtraData.prototype.init = function(){
    this.indexes = {}; // a map from name to index
    this.ignoreIndexes = []; //list of addedItems
};

//modifies functionRuntimeInfo
module.exports.makeSureParametersExists = function(functionRuntimeInfo, parameters){
    var data = new ExtraData();
    var args = functionRuntimeInfo.runArgs;
    // data.args = args.slice();
    parameters.forEach(function(name){
        var id = args.indexOf(name);
        if(id < 0){
            id = args.length;
            data.ignoreIndexes.push(id);
            args.push(name);
        }
        data.indexes[name] = id;
    });
    // data.fargs = args.slice();
    return data;
};

module.exports.filterArguments = function(args, extraData){
    if(extraData === undefined || extraData.ignoreIndexes == undefined){
        return args;
    }
    var toReturn = [];
    args.forEach(function(element, index){
        if(extraData.ignoreIndexes.indexOf(index) < 0){
            toReturn.push(element);
        }
    });
    return toReturn;
};

module.exports.getParameterWithName = function(args, extraData, parameterName){
    if(extraData === undefined || extraData.indexes == undefined){
        return undefined;
    }
    var id = extraData.indexes[parameterName];
    if(id === undefined || id > args.length || id < 0){
        return undefined;
    }
    return args[id];
};