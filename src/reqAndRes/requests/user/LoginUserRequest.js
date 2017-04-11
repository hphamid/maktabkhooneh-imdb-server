/**
 * Created by hamid on 8/12/16.
 */
'use strict';

const StringField = require("../../../requestDataHandler/dataTypes/StringField");
const ValidatableObject = require("../../../requestDataHandler/ValidatableObject");

function LoginUserRequest(){
    this.init.apply(this, arguments);
}

LoginUserRequest.prototype = Object.create(ValidatableObject.prototype);

LoginUserRequest.prototype.init = function(){
    this.username = new StringField(true);
    this.password = new StringField(true);
    ValidatableObject.prototype.init.apply(this, arguments);
};

LoginUserRequest.prototype._name = function(){
    return "LoginUserRequest";
};

/**
 * @Request("LoginUserRequest")
 */
module.exports = LoginUserRequest;