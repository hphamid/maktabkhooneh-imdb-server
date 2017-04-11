/**
 * Created by hamid on 8/12/16.
 */
'use strict';

const StringField = require("../../../requestDataHandler/dataTypes/StringField");
const ValidatableObject = require("../../../requestDataHandler/ValidatableObject");

function RefreshLoginRequest(){
    this.init.apply(this, arguments);
}

RefreshLoginRequest.prototype = Object.create(ValidatableObject.prototype);

RefreshLoginRequest.prototype.init = function(){
    this.refreshToken = new StringField(true);
    ValidatableObject.prototype.init.apply(this, arguments);
};

RefreshLoginRequest.prototype._name = function(){
    return "RefreshLoginRequest";
};

/**
 * @Request("RefreshLoginRequest")
 */
module.exports = RefreshLoginRequest;