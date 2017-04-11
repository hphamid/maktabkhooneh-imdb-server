/**
 * Created by hamid on 8/10/16.
 */
'use strict';

function HandlerInformation(){
    this.init();
}

HandlerInformation.prototype.init = function(){
    this.moduleName = "";
    this.functionName = "";
    this.method = "";
    this.urls = [];
    this.errorConverter = undefined; //if set use this error converter
    this.responseConverter = undefined; //if set use this converter;
    this.requestConverter = undefined; //if set use this converter;
    this.request = undefined; //request type
    this.response = undefined; //response type
    this.extraData = {};
};

module.exports = HandlerInformation;