/**
 * Created by hamid on 1/27/17.
 */
'use strict';
const StringField = require("../../requestDataHandler/dataTypes/StringField");
const BooleanField = require("../../requestDataHandler/dataTypes/BooleanField");
const IdField = require("../../requestDataHandler/dataTypes/IdField");
const ArrayField = require("../../requestDataHandler/dataTypes/ArrayField");
const IntegerField = require("../../requestDataHandler/dataTypes/IntegerField");
const ValidatableObject = require("../../requestDataHandler/ValidatableObject");
const MovieListItemResponse = require("./MovieListItemResponse");

const FailedSuccessResponses = require("./general/FailedSuccessResponse");

function MovieListItemResponseList(){
    this.init.apply(this, arguments);
}

MovieListItemResponseList.prototype = Object.create(FailedSuccessResponses.prototype);

MovieListItemResponseList.prototype.init = function(){
    this.movies = new ArrayField(MovieListItemResponse);
    FailedSuccessResponses.prototype.init.apply(this, arguments);
};


MovieListItemResponseList.prototype._name = function(){
    return "MovieListItemResponseList";
};

/**
 * @Response("MovieListItemResponseList")
 * @Component()
 */
module.exports = MovieListItemResponseList;