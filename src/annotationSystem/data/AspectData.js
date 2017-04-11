/**
 * Created by hamid on 8/1/16.
 */
'use strict';

/**
 * around aspect function format:
 * must call function in this function.
 * function(extraData, func, toPassThis, arguments){
 *      return functionOutput;
 * }
 *
 * before aspect function format:
 * function(extraData, arguments){
 *      return new arguments;
 * }
 *
 * after aspect format:
 * function(extraData, output, arguments){
 *      return new output;
 * }
 */
function AspectData () {
    this.init();
}

AspectData.prototype.init = function(){
    this.type = ""; //aspect types; allowed types are Before, After and Around
    this.module = ""; // module name
    this.functionName = "";
    this.extraData = {}; //just a place holder to keep data for aspect
};

module.exports = AspectData;

module.exports.After = "after";
module.exports.Before = "before";
module.exports.Around = "around";
