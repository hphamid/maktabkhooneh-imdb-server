/**
 * Created by hamid on 8/10/16.
 */
'use strict';

const NumberField = require("./NumberField");

function IntegerField(isRequired=false, isNull=false, defaultValue = undefined, minValue = undefined, maxValue=undefined) {
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.init(isRequired, isNull, defaultValue);
}

IntegerField.prototype = Object.create(NumberField.prototype);

IntegerField.prototype.getTypeName = function () {
    return "integer";
};

IntegerField.prototype.filter = function (newValue) {
    var toSet = parseInt(newValue);
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

module.exports = IntegerField;
