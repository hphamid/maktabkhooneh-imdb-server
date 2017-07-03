/**
 * Created by Mine on 6/13/2016.
 */
'use strict';

const UserFavorite = require('../db/data/UserFavorite');

/**
 * @Post("addToFavorite");
 * @Controller()
 * @LoginRequired()
 * @ActiveUser()
 * @AutoWired()
 * @RequestType("IdRequest")
 * @ResponseType("FailedSuccessResponse")
 */

module.exports.addToFavorite = function (requestData, activeUser, MovieRepo, UserFavoriteRepo) {
    const userId = activeUser.userId;
    const movieId = requestData.id.value();

    return MovieRepo.getMovieById(movieId).then(function(movie){
        return UserFavoriteRepo.addToFavorite(userId, movieId);
    }).then(function(data){
       return {success: true};
    });

};

/**
 * @Post("removeFromFavorite");
 * @Controller()
 * @LoginRequired()
 * @ActiveUser()
 * @AutoWired()
 * @RequestType("IdRequest")
 * @ResponseType("FailedSuccessResponse")
 */

module.exports.removeFromFavorite = function (requestData, activeUser, MovieRepo, UserFavoriteRepo) {
    const userId = activeUser.userId;
    const movieId = requestData.id.value();

    return MovieRepo.getMovieById(movieId).then(function(movie){
        return UserFavoriteRepo.removeFromFavorite(userId, movieId);
    }).then(function(data){
        return {success: true};
    });
};


/**
 * @AutoWired()
 * @Controller()
 * @Post("getUserFavoriteMovies")
 * @RequestType("PaginationRequest")
 * @ResponseType("MovieListItemResponseList")
 * @LoginRequired()
 * @Pagination()
 * @ActiveUser()
 */
module.exports.getFavorites = function (activeUser, userSkip, userLimit, UserFavoriteRepo, MovieResponseHelper) {
    let userId = activeUser.userId;
    return UserFavoriteRepo.getUserFavoriteItemList(userId, userSkip, userLimit).then(function(rating){
        return MovieResponseHelper.makeUserFavoriteMovieListResponse(rating);
    });
};


/**
 * @AutoWired()
 * @Controller()
 * @Post("getUserFavoriteMoviesById")
 * @RequestType("PaginationIdRequest")
 * @ResponseType("MovieListItemResponseList")
 * @LoginRequired()
 * @Pagination()
 * @ActiveUser()
 */
module.exports.getUserFavorites = function (requestData, activeUser, userSkip, userLimit, UserFavoriteRepo,
                                            MovieResponseHelper) {
    let userId = requestData.id.value();
    return UserFavoriteRepo.getUserFavoriteItemList(userId, userSkip, userLimit).then(function(rating){
        return MovieResponseHelper.makeUserFavoriteMovieListResponse(rating);
    });
};



