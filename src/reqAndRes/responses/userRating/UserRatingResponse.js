/**
 * Created by hamid on 1/27/17.
 */
'use strict';

const StringField = require("../../../requestDataHandler/dataTypes/StringField");
const NumberField = require("../../../requestDataHandler/dataTypes/NumberField");
const IntegerField = require("../../../requestDataHandler/dataTypes/IntegerField");
const UserInfoResponse = require("./../user/UserInfoResponse");

const BaseObject = require("../../../requestDataHandler/BaseObject");

function UserRatingResponse(){
    this.init.apply(this, arguments);
}

UserRatingResponse.prototype = Object.create(BaseObject.prototype);

UserRatingResponse.prototype.init = function(){
    this.user = new UserInfoResponse();
    this.rate = new NumberField();
    this.text = new StringField();
    BaseObject.prototype.init.apply(this, arguments);
};

UserRatingResponse.prototype.initFromData = function(userRating, userInfo){
    if(!userRating){
        return;
    }
    this.rate.setValue(userRating.getRate());
    this.text.setValue(userRating.getText());
    this.user.initFromData(userInfo, false);
    return this;
};

UserRatingResponse.prototype._name = function(){
    return "UserRatingResponse";
};

/**
 * @Response("UserRatingResponse")
 * @Component()
 */
module.exports = UserRatingResponse;