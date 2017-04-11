/**
 * Created by hamid on 1/27/17.
 */
'use strict';

const StringField = require("../../requestDataHandler/dataTypes/StringField");
const BooleanField = require("../../requestDataHandler/dataTypes/BooleanField");
const NumberField = require("../../requestDataHandler/dataTypes/NumberField");
const ArrayField = require("../../requestDataHandler/dataTypes/ArrayField");
const IntegerField = require("../../requestDataHandler/dataTypes/IntegerField");
const UserInfoResponse = require("./user/UserInfoResponse");

const BaseObject = require("../../requestDataHandler/BaseObject");

function MovieFullResponse(){
    this.init.apply(this, arguments);
}

MovieFullResponse.prototype = Object.create(BaseObject.prototype);

MovieFullResponse.prototype.init = function(){
    this.id = new StringField();
    this.name = new StringField();
    this.releaseDate = new StringField();
    this.posterUrl = new StringField();
    this.director = new StringField();
    this.production = new StringField();
    this.writer = new StringField();
    this.actors = new ArrayField(StringField);
    this.rateCount = new NumberField();
    this.totalStars = new NumberField();
    this.plot = new StringField();
    this.country = new StringField();
    this.boxOffice = new StringField();
    this.runTime = new StringField();
    this.genre = new StringField();
    this.isInFavorite = new BooleanField();
    BaseObject.prototype.init.apply(this, arguments);
};

MovieFullResponse.prototype.initFromData = function(movie, userFavorite){
    if(!movie){
        return;
    }
    let data = {
        id: movie.getId(),
        name: movie.getName(),
        releaseDate: movie.getReleaseDate(),
        posterUrl: movie.getPoster(),
        director: movie.getDirector(),
        production:movie.getProduction(),
        writer:movie.getWriter(),
        actors:movie.getActors(),
        rateCount: movie.getTotalRateCount(),
        totalStars: movie.getTotalStars(),
        plot:movie.getPlot(),
        country:movie.getCountry(),
        boxOffice:movie.getBoxOffice(),
        runTime:movie.getRunTime(),
        genre:movie.getGenre(),
        isInFavorite: !!userFavorite,
    };
    this.init(data);
};

MovieFullResponse.prototype._name = function(){
    return "MovieFullResponse";
};

/**
 * @Response("MovieFullResponse")
 * @Component()
 */
module.exports = MovieFullResponse;