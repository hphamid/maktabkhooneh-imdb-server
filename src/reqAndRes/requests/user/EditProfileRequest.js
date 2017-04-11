/**
 * Created by hamid on 8/12/16.
 */
'use strict';

const StringField = require("../../../requestDataHandler/dataTypes/StringField");
const ValidatableObject = require("../../../requestDataHandler/ValidatableObject");

function EditProfileRequest(){
    this.init.apply(this, arguments);
}

EditProfileRequest.prototype = Object.create(ValidatableObject.prototype);

EditProfileRequest.prototype.init = function(){
    this.fullName = new StringField(false);
    this.description = new StringField(false);
    this.profilePic = new StringField(false);
    ValidatableObject.prototype.init.apply(this, arguments);
};

EditProfileRequest.prototype._name = function(){
    return "EditProfileRequest";
};

/**
 * @Request("EditProfileRequest")
 */
module.exports = EditProfileRequest;