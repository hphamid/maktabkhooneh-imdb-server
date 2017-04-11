/**
 * Created by hamid on 8/12/16.
 */
'use strict';

/**
 *
 * @Component()
 */
module.exports = function(){
    var finalResult = {};
    Array.prototype.slice.call(arguments).forEach(function(item){
        Object.keys(item).forEach(function(key){
            finalResult[key] = item[key];
        });
    });
    return finalResult;
};