/**
 * Created by hamid on 8/10/16.
 */
'use strict';


const StringField = require("./StringField");

function EnumField(enumValues, isRequired = false, isNull = false, defaultValue = undefined) {
    if (!enumValues instanceof Array) {
        throw new Error("enum values must be an array");
    }
    enumValues.forEach(function (item) {
        if (typeof(item) != "string") {
            throw new Error("enum types must be string");
        }
    });
    this.enumValues = enumValues;
    this.init(isRequired, isNull, defaultValue);
}

EnumField.prototype = Object.create(StringField.prototype);

EnumField.prototype.getTypeName = function () {
    return "enum";
};

EnumField.prototype.getEnumValues = function () {
    return this.enumValues;
};

EnumField.prototype.filter = function (newValue) {
    if (this.enumValues.indexOf(newValue) < 0) {
       return undefined;
    }
    return newValue;
};

module.exports = EnumField;