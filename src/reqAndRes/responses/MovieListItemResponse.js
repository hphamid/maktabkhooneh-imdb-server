/**
 * Created by hamid on 1/27/17.
 */
'use strict';

const StringField = require("../../requestDataHandler/dataTypes/StringField");
const BooleanField = require("../../requestDataHandler/dataTypes/BooleanField");
const NumberField = require("../../requestDataHandler/dataTypes/NumberField");
const IntegerField = require("../../requestDataHandler/dataTypes/IntegerField");
const UserInfoResponse = require("./user/UserInfoResponse");

const BaseObject = require("../../requestDataHandler/BaseObject");

function MovieListItemResponse(){
    this.init.apply(this, arguments);
}

MovieListItemResponse.prototype = Object.create(BaseObject.prototype);

MovieListItemResponse.prototype.init = function(){
    this.id = new StringField();
    this.name = new StringField();
    this.releaseDate = new StringField();
    this.posterUrl = new StringField();
    this.director = new StringField();
    this.rateCount = new NumberField();
    this.totalStars = new NumberField();
    this.isInFavorite = new BooleanField();
    BaseObject.prototype.init.apply(this, arguments);
};

MovieListItemResponse.prototype.initFromData = function(movie, userFavorite){
    if(!movie){
        return;
    }
    let data = {
        id: movie.getId(),
        name: movie.getName(),
        releaseDate: movie.getReleaseDate(),
        posterUrl: movie.getPoster(),
        director: movie.getDirector(),
        rateCount: movie.getTotalRateCount(),
        totalStars: movie.getTotalStars(),
        isInFavorite: !!userFavorite
    };
    this.init(data);
};

MovieListItemResponse.prototype._name = function(){
    return "MovieListItemResponse";
};

/**
 * @Response("MovieListItemResponse")
 * @Component()
 */
module.exports = MovieListItemResponse;