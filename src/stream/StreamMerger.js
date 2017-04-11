/**
 * Created by hamid on 8/3/16.
 */
'use strict';
const streamify = require('./Streamify.js');

module.exports.merge = function(){
    var streamsArray = arguments;
    var toReturn = streamify.create(emptyFunction);
    toReturn.isDone = makeIsDone(streamsArray);
    for(let i = 0; i < streamsArray.length; i++){
        streamsArray[i].pipeStream(toReturn);
    }
    return toReturn;
};

function makeIsDone(streamArray){
    return function () {
        var result = true;
        for (let i = 0; i < streamArray.length; i++) {
            result = result && streamArray[i].isDone();
            if (!result) {
                break;
            }
        }
        return result;
    };
}

function emptyFunction(data, isDone){
    return data;
}