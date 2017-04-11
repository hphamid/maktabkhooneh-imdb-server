/**
 * Created by hamid on 8/8/16.
 */
'use strict';

module.exports.flattenAnnotations = function(annotations){
    var toReturn = [];
    if(!annotations){
        return toReturn;
    }
    annotations.forEach(function(element){
        element.forEach(function(item){
            toReturn.push(item);
        });
    });
    return toReturn;
};