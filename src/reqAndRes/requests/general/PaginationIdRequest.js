/**
 * Created by hamid on 8/13/16.
 */
'use strict';

const StringField = require("../../../requestDataHandler/dataTypes/StringField");
const PaginationRequest = require("./PaginationRequest");

function PaginationIdRequest(){
    this.init.apply(this, arguments);
}

PaginationIdRequest.prototype = Object.create(PaginationRequest.prototype);

PaginationIdRequest.prototype.init = function(){
    this.id = new StringField(true);
    PaginationRequest.prototype.init.apply(this, arguments);
};

PaginationIdRequest.prototype._name = function(){
    return "PaginationIdRequest";
};

/**
 * @Request("PaginationIdRequest")
 */
module.exports = PaginationIdRequest;