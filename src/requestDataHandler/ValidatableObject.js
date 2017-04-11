/**
 * Created by hamid on 8/10/16.
 */
'use strict';

const GenericField = require("./dataTypes/GenericField");
const ValidationError = require("./ValidationError");
const BaseObject = require("./BaseObject");

function ValidatableObject(){
    this.init.apply(this, arguments);
}

ValidatableObject.prototype = Object.create(BaseObject.prototype);

ValidatableObject.prototype.clean = function(){
    // do the clean up here!
};

ValidatableObject.prototype.validate = function(){
    var errors = [];
    Object.keys(this).forEach(function(key){
        if(this[key] instanceof GenericField){
            if(!this[key].validate()){
                errors.push(new ValidationError(key));
            }
        }else if(this[key] instanceof ValidatableObject){
            let items = this[key].validate();
            errors = errors.concat(items);
        }
    }, this);
    return errors;
};

module.exports = ValidatableObject;