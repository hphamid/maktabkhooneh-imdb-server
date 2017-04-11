/**
 * Created by hamid on 8/1/16.
 */
'use strict';

const AspectDataContainer = require('./AspectDataContainer.js');


function FunctionInfo(){
    this.init();
}

FunctionInfo.prototype.init = function(){
    this.name = '';
    this.args = [];
    this.annotations = [];
};

module.exports = FunctionInfo;