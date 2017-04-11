/**
 * Created by hamid on 1/27/17.
 */
'use strict';
const ArrayField = require("../../../requestDataHandler/dataTypes/ArrayField");
const UserRatingResponse = require("./UserRatingResponse");

const FailedSuccessResponses = require("./../general/FailedSuccessResponse");

function UserRatingListResponse(){
    this.init.apply(this, arguments);
}

UserRatingListResponse.prototype = Object.create(FailedSuccessResponses.prototype);

UserRatingListResponse.prototype.init = function(){
    this.rates = new ArrayField(UserRatingResponse);
    FailedSuccessResponses.prototype.init.apply(this, arguments);
};


UserRatingListResponse.prototype._name = function(){
    return "UserRatingListResponse";
};

/**
 * @Response("UserRatingListResponse")
 * @Component()
 */
module.exports = UserRatingListResponse;