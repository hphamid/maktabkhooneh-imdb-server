/**
 * Created by hamid on 8/13/16.
 */
'use strict';

const StringField = require("../../../requestDataHandler/dataTypes/StringField");
const IntegerField = require("../../../requestDataHandler/dataTypes/IntegerField");
const ValidatableObject = require("../../../requestDataHandler/ValidatableObject");

function PaginationRequest(){
    this.init.apply(this, arguments);
}

PaginationRequest.prototype = Object.create(ValidatableObject.prototype);

PaginationRequest.prototype.init = function(){
    this.skip = new IntegerField();
    this.limit = new IntegerField();
    ValidatableObject.prototype.init.apply(this, arguments);
};

PaginationRequest.prototype._name = function(){
    return "PaginationRequest";
};

/**
 * @Request("PaginationRequest")
 */
module.exports = PaginationRequest;