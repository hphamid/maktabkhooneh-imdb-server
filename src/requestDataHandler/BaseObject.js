/**
 * Created by hamid on 8/11/16.
 */
'use strict';
const GenericField = require("./dataTypes/GenericField");


function BaseObject(initObject = undefined) {
    this.init(initObject);
}

BaseObject.prototype.init = function (initObject = undefined) {
    if (initObject === undefined || initObject == null) {
        return;
    }
    var keys = this._map();
    Object.keys(keys).forEach(function (key) {
        if (this[key] instanceof GenericField) {
            this[key].setValue(initObject[key]);
        } else if (this[key] instanceof BaseObject) {
            this[key].init(initObject[key]);
        }
    }, this);
};
BaseObject.prototype.setValue = function (initObject) {
    this.init(initObject);
};


BaseObject.prototype._map = function () {
    var toReturn = {};
    Object.keys(this).forEach(function (key) {
        if (this[key] instanceof GenericField) {
            toReturn[key] = this[key].getTypeName();
        } else if (this[key] instanceof BaseObject) {
            toReturn[key] = this[key]._map();
        }
    }, this);
    return toReturn;
};


BaseObject.prototype._name = function () {
    return "BaseObject";
};

module.exports = BaseObject;