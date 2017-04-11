/**
 * Created by hamid on 8/13/16.
 */
'use strict';

const StringField = require("../../../requestDataHandler/dataTypes/StringField");
const ValidatableObject = require("../../../requestDataHandler/ValidatableObject");

function IdRequest(){
    this.init.apply(this, arguments);
}

IdRequest.prototype = Object.create(ValidatableObject.prototype);

IdRequest.prototype.init = function(){
    this.id = new StringField(true);
    ValidatableObject.prototype.init.apply(this, arguments);
};

IdRequest.prototype._name = function(){
    return "IdRequest";
};

/**
 * @Request("IdRequest")
 */
module.exports = IdRequest;