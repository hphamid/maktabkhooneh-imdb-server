/**
 * Created by hamid on 8/1/16.
 */
'use strict';

function ModuleInfo(){
    this.init();
}

ModuleInfo.prototype.init = function(){
    this.fileInfo = undefined; //module file info
    this.name = '';
    this.functions = {};
    this.annotations = [];
    this.isCallable = false;
    this.args = []; //get module constructor args if exists.
};

module.exports = ModuleInfo;
