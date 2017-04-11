/**
 * Created by hamid on 8/10/16.
 */
'use strict';

const GenericField = require("./GenericField");

function StringField(isRequired=false, isNull=false, defaultValue = undefined) {
    this.init(isRequired, isNull, defaultValue);
}

StringField.prototype = Object.create(GenericField.prototype);

StringField.prototype.getTypeName = function(){
    return "string";
};

StringField.prototype.filter = function(newValue){
    if(!newValue){
        return newValue;
    }
    return newValue + "";
};


module.exports = StringField;