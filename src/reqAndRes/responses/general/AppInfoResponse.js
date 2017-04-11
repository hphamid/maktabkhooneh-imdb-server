/**
 * Created by hamid on 8/12/16.
 */
'use strict';

const StringField = require("../../../requestDataHandler/dataTypes/StringField");
const BaseObject = require("../../../requestDataHandler/BaseObject");

function AppInfoResponse(){
    this.init.apply(this, arguments);
}

AppInfoResponse.prototype = Object.create(BaseObject.prototype);

AppInfoResponse.prototype.init = function(){
    this.name = new StringField();
    this.version = new StringField();
    BaseObject.prototype.init.apply(this, arguments);
};

AppInfoResponse.prototype._name = function(){
    return "AppInfoResponse";
};

/**
 * @Response("AppInfoResponse")
 * @Component()
 */
module.exports = AppInfoResponse;