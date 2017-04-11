/**
 * Created by hamid on 8/10/16.
 */
'use strict';

const GenericField = require("./GenericField");

function NumberField(isRequired=false, isNull=false, defaultValue = undefined, minValue = undefined, maxValue=undefined) {
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.init(isRequired, isNull, defaultValue);
}

NumberField.prototype = Object.create(GenericField.prototype);

NumberField.prototype.getTypeName = function () {
    return "number";
};

NumberField.prototype.filter = function (newValue) {
    var toSet = Number(newValue);
    if(toSet !== toSet){ //its NaN
        return undefined;
    }
    if(this.minValue !== undefined && toSet < this.minValue){
        return undefined;
    }
    if(this.maxValue !== undefined && toSet > this.maxValue){
        return undefined;
    }
    return toSet;
};

module.exports = NumberField;
