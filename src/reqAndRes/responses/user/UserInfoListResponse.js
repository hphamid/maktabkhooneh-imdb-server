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
const UserInfoResponse = require("./UserInfoResponse");
const ArrayField = require("../../../requestDataHandler/dataTypes/ArrayField");


const BaseObject = require("../../../requestDataHandler/BaseObject");


function UserInfoListResponse() {
    this.init.apply(this, arguments);
}

UserInfoListResponse.prototype = Object.create(BaseObject.prototype);

UserInfoListResponse.prototype.init = function () {
    this.users = new ArrayField(UserInfoResponse);
    BaseObject.prototype.init.apply(this, arguments);
};

UserInfoListResponse.prototype.initFromData = function (users) {
    var list = [];
    users.forEach(function (element) {
        let item = new UserInfoResponse();
        item.initFromData(element, true);
        list.push(item);
    });
    var data = {
        users : list
    };

    this.init(data);
    return this;
};

UserInfoListResponse.prototype._name = function () {
    return "UserInfoListResponse";
};

/**
 * @Response("UserInfoListResponse")
 * @Component()
 */
module.exports = UserInfoListResponse;

