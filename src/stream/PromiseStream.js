/**
 * Created by hamid on 8/2/16.
 */
'use strict';
const Stream = require('./Streamify.js').Stream;

function PromiseStream (options) {
    if(!options){
        options = {};
    }
    options.toPassThis = this;
    this.promiseData = [];
    Stream.call(this, func, options, false);
    var obj = this;
    this._promise = new Promise(function (resolve, reject) {
        obj._resolve = resolve;
        obj._reject = reject;
    });
}

function func(item, isDone){
    this.promiseData.push(item);
    if(isDone){
        this._resolve(this.promiseData);
    }
}

PromiseStream.prototype = Object.create(Stream.prototype);

PromiseStream.prototype.promise = function(){
    return this._promise;
};


PromiseStream.prototype.then = function(){
    this.promise().then.apply(this.promise(), arguments);
};

PromiseStream.prototype.catch = function(){
    this.promise().catch.apply(this.promise(), arguments);
};

module.exports.new = function(options){
    return new PromiseStream(options);
};

module.exports.PromiseStream = PromiseStream;