/**
 * Created by hamid on 8/12/16.
 */
'use strict';
const GenericField = require("./GenericField");

function BooleanField(isRequired=false, isNull=false, defaultValue = undefined) {
    this.init(isRequired, isNull, defaultValue);
}

BooleanField.prototype = Object.create(GenericField.prototype);

BooleanField.prototype.getTypeName = function(){
    return "boolean";
};

BooleanField.prototype.filter = function(newValue){
    if(typeof newValue == "string")
        return newValue == "true";
    else
        return !!newValue;
};



module.exports = BooleanField;