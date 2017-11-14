/**
 * Created by hamid on 8/13/16.
 */
'use strict';

/**
 * Created by hamid on 8/12/16.
 */
'use strict';

const StringField = require("../../../requestDataHandler/dataTypes/StringField");
const DateField = require("../../../requestDataHandler/dataTypes/DateField");
const BooleanField = require("../../../requestDataHandler/dataTypes/BooleanField");
const IdField = require("../../../requestDataHandler/dataTypes/IdField");
const IntegerField = require("../../../requestDataHandler/dataTypes/IntegerField");

const BaseObject = require("../../../requestDataHandler/BaseObject");


function UserInfoResponse() {
    this.init.apply(this, arguments);
}

UserInfoResponse.prototype = Object.create(BaseObject.prototype);

UserInfoResponse.prototype.init = function () {
    this.userId = new IdField();
    this.fullName = new StringField();
    this.email = new StringField();
    this.imageUri = new StringField();
    this.description = new StringField();
    this.creationDate = new StringField();
    BaseObject.prototype.init.apply(this, arguments);
};

UserInfoResponse.prototype.initFromData = function (userInfo, isPrivate) {
    if (!userInfo) {
        return;
    }
    var data = undefined;
    if (!isPrivate) {
        data = {
            userId: userInfo.getUserId(),
            fullName: userInfo.getFullName(),
            imageUri: userInfo.getProfilePic(),
            description: userInfo.getDescription(),
            creationDate: userInfo.getCreationDate()
        }
    } else {
        data = {
            userId: userInfo.getUserId(),
            fullName: userInfo.getFullName(),
            email: userInfo.getEmail(),
            imageUri: userInfo.getProfilePic(),
            description: userInfo.getDescription(),
            creationDate: userInfo.getCreationDate()
        }
    }
    this.init(data);
    return this;
};

UserInfoResponse.prototype._name = function () {
    return "UserInfoResponse";
};

/**
 * @Response("UserInfoResponse")
 * @Component()
 */
module.exports = UserInfoResponse;

