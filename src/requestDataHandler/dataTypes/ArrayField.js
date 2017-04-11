/**
 * Created by hamid on 8/12/16.
 */
'use strict';


const GenericField = require("./GenericField");

function ArrayField(arrayType, isRequired = false, isNull = false, defaultValue = undefined) {
    this.init(arrayType, isRequired, isNull, defaultValue);
}
ArrayField.prototype = Object.create(GenericField.prototype);

ArrayField.prototype.init = function (arrayType, isRequired, isNull, defaultValue) {
    this._arrayType = arrayType;
    GenericField.prototype.init.call(this, isRequired, isNull, defaultValue);
};


ArrayField.prototype.getTypeName = function () {
    return "array";
};

ArrayField.prototype.getItemType = function () {
    return this._arrayType;
};

ArrayField.prototype.filter = function (newValue) {
    if (!newValue) {
        return undefined;
    }
    if (!(newValue instanceof Array)) {
        return [];
    }
    var toReturn = [];
    newValue.forEach(function (element) {
        if (element instanceof this._arrayType) {
            toReturn.push(element);
        } else {
            let item = new this._arrayType();
            item.setValue(element);
            toReturn.push(item);
        }
    }, this);
    return toReturn;
};

ArrayField.prototype.validate = function () {
    if (this.isRequired()) {
        return this.value() !== undefined && (this._isNull || this.value() !== null) && this.value().length > 0;
    }
    return true;
};


ArrayField.prototype.valueAsPrimitives = function () {
    var result = this.value();
    if (!result) {
        return result;
    }
    var toReturn = [];
    result.forEach(function(item){
        toReturn.push(item.value());
    });
    return toReturn;
};


module.exports = ArrayField;