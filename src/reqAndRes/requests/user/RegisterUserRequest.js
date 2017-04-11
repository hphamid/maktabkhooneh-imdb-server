/**
 * Created by hamid on 8/12/16.
 */
'use strict';

const StringField = require("../../../requestDataHandler/dataTypes/StringField");
const ValidatableObject = require("../../../requestDataHandler/ValidatableObject");

function RegisterUserRequest(){
    this.init.apply(this, arguments);
}

RegisterUserRequest.prototype = Object.create(ValidatableObject.prototype);

RegisterUserRequest.prototype.init = function(){
    this.email = new StringField(true);
    this.fullName = new StringField(true);
    this.password = new StringField(true);
    this.description = new StringField(true);
    ValidatableObject.prototype.init.apply(this, arguments);
};

RegisterUserRequest.prototype._name = function(){
    return "RegisterUserRequest";
};

/**
 * @Request("RegisterUserRequest")
 */
module.exports = RegisterUserRequest;