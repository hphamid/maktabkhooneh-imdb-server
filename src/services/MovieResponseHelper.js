/**
 * Created by hamid on 8/23/16.
 */
'use strict';
const Path = require("path");
const uuid = require("node-uuid");
const Promisify = require("../util/Promisify.js");
const baseFolder = "/users";
const baseHttpAddress = require("../config").baseUrl;

/**
 * @Component()
 */
module.exports = {};


/**
 * @AutoWired()
 */
module.exports.makeMovieResponseList = makeMovieResponseList;
function makeMovieResponseList(movieList, userId, UserFavoriteRepo, MovieListItemResponse){
    let toReturn = [];
    if(!movieList){
        return Promise.resolve({movies: toReturn});
    }
    let movieIdSet = new Set();
    movieList.forEach(function(item){
       movieIdSet.add(item.getId());
    });
    let movieIdList = Array.from(movieIdSet);
    let favoriteMap = {};
    return UserFavoriteRepo.getUserFavoriteItemListById(userId, movieIdList).then(function(favoriteList){
        if(!favoriteList || favoriteList.length <=0 ){
            return;
        }
        favoriteList.forEach(function (favorite) {
            favoriteMap[favorite.getMovieId()] = favorite;
        });
    }).then(function(){
        movieList.forEach(function(movie){
            let toAdd = new MovieListItemResponse();
            toAdd.initFromData(movie, favoriteMap[movie.getId()]);
            toReturn.push(toAdd);
        });
        return {movies: toReturn};
    });
}

/**
 * @AutoWired()
 */
module.exports.makeFullMovieResponse = function(movie, userId, UserFavoriteRepo, MovieFullResponse){

    if(!movie){

        return Promise.resolve(undefined);
    }
    return UserFavoriteRepo.getUserFavoriteItem(userId, movie.getId()).then(function(userFavorite){
        let toAdd = new MovieFullResponse();
        toAdd.initFromData(movie, userFavorite);
        return toAdd
    });

};

/**
 * @AutoWired()
 */
module.exports.makeUserFavoriteMovieListResponse = function(userFavoriteList, MovieRepo,UserFavoriteRepo, MovieListItemResponse){
    let toReturn = [];
    if(!userFavoriteList || userFavoriteList.length <= 0){
        return Promise.resolve({movies: toReturn});
    }
    let movieIds = [];
    userFavoriteList.forEach(function(item){
        movieIds.push(item.getMovieId());
    });
    return MovieRepo.getMoviesByListOfId(movieIds).then(function(movieList){
        return makeMovieResponseList(movieList, userFavoriteList[0].getUserId(), UserFavoriteRepo, MovieListItemResponse);
    });
};

