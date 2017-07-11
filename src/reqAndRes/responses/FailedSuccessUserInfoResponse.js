/**
 * Created by hamid on 8/12/16.
 */
'use strict';

const StringField = require("../../requestDataHandler/dataTypes/StringField");
const BooleanField = require("../../requestDataHandler/dataTypes/BooleanField");
const IdField = require("../../requestDataHandler/dataTypes/IdField");
const IntegerField = require("../../requestDataHandler/dataTypes/IntegerField");

const FailedSuccessResponses = require("./general/FailedSuccessResponse");
const UserInfoResponse = require("./user/UserInfoResponse");

function FailedSuccessUserInfoResponse(){
    this.init.apply(this, arguments);
}

FailedSuccessUserInfoResponse.prototype = Object.create(FailedSuccessResponses.prototype);

FailedSuccessUserInfoResponse.prototype.init = function(){
    this.userInfo = new UserInfoResponse();
    FailedSuccessResponses.prototype.init.apply(this, arguments);
};

FailedSuccessUserInfoResponse.prototype._name = function(){
    return "FailedSuccessUserInfoResponse";
};

FailedSuccessUserInfoResponse.prototype.initFromData = function (userInfo, isPrivate) {
    if (!userInfo) {
        return;
    }
    this.userInfo.initFromData(userInfo, isPrivate);
    this.success.setValue(true);
};

/**
 * @Response("FailedSuccessUserInfoResponse")
 * @Component()
 */
module.exports = FailedSuccessUserInfoResponse;