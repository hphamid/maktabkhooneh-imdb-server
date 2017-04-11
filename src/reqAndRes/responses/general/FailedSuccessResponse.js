/**
 * Created by hamid on 8/12/16.
 */
'use strict';


const StringField = require("../../../requestDataHandler/dataTypes/StringField");
const BooleanField = require("../../../requestDataHandler/dataTypes/BooleanField");
const IntegerField = require("../../../requestDataHandler/dataTypes/IntegerField");


const ValidatableObject = require("../../../requestDataHandler/ValidatableObject");

function FailedSuccessResponse(){
    this.init.apply(this, arguments);
}

FailedSuccessResponse.prototype = Object.create(ValidatableObject.prototype);

FailedSuccessResponse.prototype.init = function(){
    this.success = new BooleanField();
    this.message = new StringField();
    this.code = new IntegerField();
    this.stack = new StringField();
    ValidatableObject.prototype.init.apply(this, arguments);
};

FailedSuccessResponse.prototype._name = function(){
    return "FailedSuccessResponse";
};

/**
 * @Response("FailedSuccessResponse")
 * @Component()
 */
module.exports = FailedSuccessResponse;