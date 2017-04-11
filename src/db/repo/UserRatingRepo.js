/**
 * Created by Mine on 6/13/2016.
 */
'use strict';
var UserRating = require("../data/UserRating");
var Promisify = require("../../util/Promisify");
var Backtory = require("../../provider/LibsProvider").backtory();
/**
 * @Repository()
 */
module.exports = {};

/**
 *
 * @AutoWired()
 */
module.exports.addRating = function(userId, movieId, rate, text, MovieRepo){
    let query = new Backtory.Query(UserRating);
    query.equalTo(UserRating.Col.UserId, userId);
    query.equalTo(UserRating.Col.MovieId, movieId);
    let movieObj = null;
    let countInc = 0;
    let rateInc = 0;
    return MovieRepo.getMovieById(movieId).then(function(movie){
        movieObj = movie;
        return Promisify.wrapWithThis(query.find, query);
    }).then(function(results){
        let toSave = null;
        if(results && results.length > 0){
            toSave = results[0];
            rateInc = rate - toSave.getRate();
        }else{
            toSave = new UserRating();
            toSave.setUserId(userId);
            toSave.setMovieId(movieId);
            rateInc = rate;
            countInc = 1;
        }
        toSave.setRate(rate);
        toSave.setText(text);
        return Promisify.wrapWithThis(toSave.save, toSave)
    }).then(function(result){
        return MovieRepo.updateMovieRating(movieObj, rateInc, countInc);
    });
};

module.exports.getMovieRating = function (movieId, skip, limit) {
    let query = new Backtory.Query(UserRating);
    query.equalTo(UserRating.Col.MovieId, movieId);
    query.descending(UserRating.Col.CreationDate);
    query.skip(skip);
    query.limit(limit);
    return Promisify.wrapWithThis(query.find, query);
};

module.exports.createTestField = function(movie){
    let toSave = new UserRating();
    toSave.setMovieId(movie.getId());
    toSave.setUserId("test");
    toSave.setRate(10);
    toSave.setText("text for test");
    return Promisify.wrapWithThis(toSave.save, toSave);
};
