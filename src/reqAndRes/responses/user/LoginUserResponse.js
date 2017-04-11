/**
 * Created by hamid on 8/12/16.
 */
'use strict';

const StringField = require("../../../requestDataHandler/dataTypes/StringField");
const BooleanField = require("../../../requestDataHandler/dataTypes/BooleanField");
const IdField = require("../../../requestDataHandler/dataTypes/IdField");
const IntegerField = require("../../../requestDataHandler/dataTypes/IntegerField");

const FailedSuccessResponses = require("./../general/FailedSuccessResponse");

function LoginUserResponse(){
    this.init.apply(this, arguments);
}

LoginUserResponse.prototype = Object.create(FailedSuccessResponses.prototype);

LoginUserResponse.prototype.init = function(){
    this.accessToken = new StringField();
    this.tokenType = new StringField();
    this.refreshToken = new StringField();
    this.expiresIn = new IntegerField();
    this.scope = new StringField();
    this.jti = new StringField();
    FailedSuccessResponses.prototype.init.apply(this, arguments);
};

LoginUserResponse.prototype._name = function(){
    return "LoginUserResponse";
};

/**
 * @Response("LoginUserResponse")
 * @Component()
 */
module.exports = LoginUserResponse;