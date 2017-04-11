/**
 * Created by Mine on 6/13/2016.
 */
'use strict';
const UserFavorite = require("../data/UserFavorite");
const Movie = require("../data/Movie");
const Promisify = require("../../util/Promisify");
const ErrorCodes = require("../../util/ErrorCodes");
const Backtory = require("../../provider/LibsProvider").backtory();
/**
 * @Repository()
 */
module.exports = {};

module.exports.addToFavorite = function(userId, movieId){
    getUserFavoriteItem(userId, movieId).then(function(item){
        if(item){
            return item;
        }
        let favorite = new UserFavorite();
        favorite.setMovieId(movieId);
        favorite.setUserId(userId);
        return Promisify.wrapWithThis(favorite.save, favorite);
    });
};

module.exports.removeFromFavorite = function(userId, movieId){
    return getUserFavoriteItem(userId, movieId).then(function(item){
        if(!item){
            throw ErrorCodes.make(ErrorCodes.NOT_FOUND, "not found!");
        }
        return Promisify.wrapWithThis(item.destroy, item);
    });
};

module.exports.getUserFavoriteItem = getUserFavoriteItem;
function getUserFavoriteItem(userId, movieId){
    let query = new Backtory.Query(UserFavorite);
    query.equalTo(UserFavorite.Col.UserId, userId);
    query.equalTo(UserFavorite.Col.MovieId, movieId);
    query.limit(1);
    return Promisify.wrapWithThis(query.find, query).then(function(data){
        if(!data || data.length <= 0){
            return undefined;
        }
        return data[0];
    });
}

module.exports.getUserFavoriteItemListById = function(userId, movieIdList){
    let query = new Backtory.Query(UserFavorite);
    query.equalTo(UserFavorite.Col.UserId, userId);
    query.containedIn(UserFavorite.Col.MovieId, movieIdList);
    return Promisify.wrapWithThis(query.find, query);
};

module.exports.getUserFavoriteItemList = function(userId, skip, limit){
    let query = new Backtory.Query(UserFavorite);
    query.equalTo(UserFavorite.Col.UserId, userId);
    query.skip(skip);
    query.limit(limit);
    return Promisify.wrapWithThis(query.find, query);
};

module.exports.createTestField = function(movie){
    let toSave = new UserFavorite();
    toSave.setMovieId(movie.getId());
    toSave.setUserId("test");
    return Promisify.wrapWithThis(toSave.save, toSave);
};
