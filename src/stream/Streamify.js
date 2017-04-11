/**
 * Created by hamid on 8/1/16.
 * just a helper function to make api more simple an beautiful
 */
'use strict';
// Stream automatically pass each item of array as a single call to function. if you want to get array as single object
// set passArrayAsSingle to true;

function Stream() {
    if (arguments.length > 0) {
        this.init.apply(this, arguments);
    }
}

Stream.prototype.init = function (func, options, runAfter) {
    if (arguments.length == 0) {
        return; // there is no data! :)
    }
    this.passArrayAsSingle = false; // if function return array must pass it as a single object or pass each item?
    this.passIsDone = true; //pass is done as function input?
    this.next = [];
    this.func = func;
    this.toPassThis = undefined;
    this.extraArguments = undefined;
    this.buffer = [];
    this.waitingListCount = 0;
    this._isDone = runAfter;
    if (options) {
        if (options.passArrayAsSingle != undefined) {
            this.passArrayAsSingle = options.passArrayAsSingle;
        }
        if (options.passIsDone != undefined) {
            this.passIsDone = options.passIsDone;
        }
        if (options.toPassThis != undefined) {
            this.toPassThis = options.toPassThis;
        }
        if (options.extraArguments != undefined) {
            this.extraArguments = options.extraArguments;
        }
    }
    if (!this.toPassThis) {
        this.toPassThis = Object.create(null);
    }
    if (runAfter) {
        call(this, this.extraArguments);
    }
};

function call(obj, args) {

    obj.waitingListCount++;
        var result = obj.func.apply(obj.toPassThis, args);
    if (result instanceof Promise) {
        result.then(function (data) {
            obj.waitingListCount--;
            onResult(obj, data);
        }).catch(function (error) {
            console.log(error);
            obj.waitingListCount--;
        });
    } else {
        obj.waitingListCount--;
        onResult(obj, result);
    }
}

Stream.prototype.isDone = function(){
    return this._isDone;
};

Stream.prototype.newData = function (data, isDone, parentStream) {
    if (data === undefined && isDone == false) {
        return;
    }
    var args = [];
    this._isDone = isDone;
    args.push(data);
    if (this.passIsDone) {
        args.push(this.isDone());
    }
    args = args.concat(this.extraArguments);
    call(this, args);
};

function onResult(obj, data) {
    obj.buffer.push(data);
    obj.flush();
}

function passBufferData(obj, isDone) {
    if (obj.next.length == 0) {
        return;
    }
    for (let i = 0; i < obj.buffer.length; i++) {
        passSingleItem(obj, obj.buffer[i], ((i === obj.buffer.length - 1) && isDone));
    }
    obj.buffer = [];
}

function passSingleItem(obj, item, isDone) {
    var isNextDone = isDone && (obj.waitingListCount <= 0);
    if (!obj.passArrayAsSingle && item instanceof Array) {
        for (let i = 0; i < item.length; i++) {
            callStreamsNewData(obj.next, item[i], (i === item.length - 1) && isNextDone, obj);
        }
    } else {
        callStreamsNewData(obj.next, item, isNextDone, obj);
    }
}

function callStreamsNewData(streams, data, isDone, parentStream){
    for(let i = 0; i < streams.length; i++){
        streams[i].newData(data, isDone, parentStream);
    }
}

Stream.prototype.pipe = function (func, options) {
    var item = new Stream(func, options, false);
    this.addNext(item);
    this.flush();
    return item;
};

Stream.prototype.pipeStream = function (streamItem) {
    this.addNext(streamItem);
    this.flush();
    return streamItem;
};

Stream.prototype.pipeStreams = function (streamArray){
    for(let i = 0; i < streamArray.length; i++){
        this.addNext(streamArray[i]);
    }
    this.flush();
};
Stream.prototype.addNext = function (streamItem) {  // be careful for outside usage. no data flush! :)
    this.next.push(streamItem);
    return streamItem;
};

Stream.prototype.flush = function () {
    passBufferData(this, this.isDone());
};

function makeStream (func, options) {  //make stream and call func
    return new Stream(func, options, true);
}
module.exports.init = makeStream;

module.exports.initFromArray = function(array){
    return makeStream(function(){
        return array;
    });
};

module.exports.create = function (func, options) { //just make stream
    return new Stream(func, options, false);
};

module.exports.Stream = Stream;

//just to make syntax a little better!
module.exports.bind = function(func, extraParams=[], passIsDone=true, thisParam={}){
    return function(moduleInfo, isDone){
        var args = [];
        if(moduleInfo){
            args.push(moduleInfo);
        }
        if(passIsDone){
            args.push(isDone);
        }
        args = args.concat(extraParams);
        return func.apply(thisParam, args);
    }
};