/**
 * Created by hamid on 8/2/16.
 */
'use strict';
module.exports = function (name, logIsDone = true, parameterName=undefined) {
    return function (data, isDone) {
        if(parameterName){
            console.log(name, JSON.stringify(data[parameterName]));
        }else{
            console.log(name, JSON.stringify(data));
        }
        if(logIsDone){
            console.log(name, "isDone", isDone);
        }
        return data;
    };
};