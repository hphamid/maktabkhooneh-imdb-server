/**
 * Created by hamid on 8/13/16.
 */
'use strict';

const StringField = require("../../requestDataHandler/dataTypes/StringField");
const NumberField = require("../../requestDataHandler/dataTypes/NumberField");
const ValidatableObject = require("../../requestDataHandler/ValidatableObject");

function AddRatingRequest(){
    this.init.apply(this, arguments);
}

AddRatingRequest.prototype = Object.create(ValidatableObject.prototype);

AddRatingRequest.prototype.init = function(){
    this.movieId = new StringField(true);
    this.text = new StringField(true);
    this.rate = new NumberField(true, false, 0, 0, 10);
    ValidatableObject.prototype.init.apply(this, arguments);
};

AddRatingRequest.prototype._name = function(){
    return "AddRatingRequest";
};

/**
 * @Request("AddRatingRequest")
 */
module.exports = AddRatingRequest;