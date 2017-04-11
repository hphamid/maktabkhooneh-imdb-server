/**
 * Created by hamid on 8/10/16.
 */
'use strict';


const StringField = require("./StringField");

function IdField(isRequired=false, isNull=false, defaultValue = undefined) {
    this.init(isRequired, isNull, defaultValue);
}

IdField.prototype = Object.create(StringField.prototype);

IdField.prototype.getTypeName = function(){
    return "id";
};


module.exports = IdField;