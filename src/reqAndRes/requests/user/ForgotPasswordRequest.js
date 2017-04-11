/**
 * Created by hamid on 8/12/16.
 */
'use strict';

const StringField = require("../../../requestDataHandler/dataTypes/StringField");
const ValidatableObject = require("../../../requestDataHandler/ValidatableObject");

function ForgotPasswordRequest(){
    this.init.apply(this, arguments);
}

ForgotPasswordRequest.prototype = Object.create(ValidatableObject.prototype);

ForgotPasswordRequest.prototype.init = function(){
    this.username = new StringField(true);
    ValidatableObject.prototype.init.apply(this, arguments);
};

ForgotPasswordRequest.prototype._name = function(){
    return "ForgotPasswordRequest";
};

/**
 * @Request("ForgotPasswordRequest")
 */
module.exports = ForgotPasswordRequest;