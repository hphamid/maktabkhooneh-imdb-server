/**
 * Created by hamid on 8/10/16.
 */
'use strict';

function ValidationError(fieldName){
    this.init(fieldName);
}

ValidationError.prototype.init = function(fieldName){
    this.fieldName = fieldName;
};

module.exports = ValidationError;