/**
 * Created by hamid on 8/12/16.
 */
'use strict';

const StringField = require("../../../requestDataHandler/dataTypes/StringField");
const BooleanField = require("../../../requestDataHandler/dataTypes/BooleanField");
const IdField = require("../../../requestDataHandler/dataTypes/IdField");
const IntegerField = require("../../../requestDataHandler/dataTypes/IntegerField");

const LoginUserResponse = require("./LoginUserResponse");

function RegisterUserResponse(){
    this.init.apply(this, arguments);
}

RegisterUserResponse.prototype = Object.create(LoginUserResponse.prototype);

RegisterUserResponse.prototype.init = function(){
    this.userId = new IdField(true);
    this.email = new StringField(false);
    LoginUserResponse.prototype.init.apply(this, arguments);
    return this;
};

RegisterUserResponse.prototype._name = function(){
    return "RegisterUserResponse";
};

/**
 * @Response("RegisterUserResponse")
 * @Component()
 */
module.exports = RegisterUserResponse;