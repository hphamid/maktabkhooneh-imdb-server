/**
 * Created by hamid on 8/10/16.
 */
'use strict';

const GenericField = require("./GenericField");

function ObjectField(isRequired=false, isNull=false, defaultValue = undefined) {
    this.init(isRequired, isNull, defaultValue);
}

ObjectField.prototype = Object.create(GenericField.prototype);

ObjectField.prototype.getTypeName = function(){
    return "object";
};

ObjectField.prototype.filter = function(newValue){
    return newValue;
};


module.exports = ObjectField;