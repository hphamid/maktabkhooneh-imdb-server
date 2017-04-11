/**
 * Created by hamid on 8/10/16.
 */
'use strict';

const IntegerField = require("./IntegerField");

function PositiveIntegerField(isRequired=false, isNull=false, defaultValue = undefined) {
    this.init(isRequired, isNull, defaultValue);
}

PositiveIntegerField.prototype = Object.create(IntegerField.prototype);

PositiveIntegerField.prototype.getTypeName = function () {
    return "PositiveInteger";
};

PositiveIntegerField.prototype.filter = function (newValue) {
    var toSet = parseInt(newValue);
    if(toSet !== toSet || toSet < 0){ //its NaN
        return undefined;
    }
    return toSet;
};

module.exports = PositiveIntegerField;
