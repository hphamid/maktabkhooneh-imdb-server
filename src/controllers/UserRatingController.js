/**
 * Created by Mine on 6/13/2016.
 */
'use strict';

var UserRating = require('../db/data/UserRating');

/**
 * @Post("addRating");
 * @Controller()
 * @LoginRequired()
 * @ActiveUser()
 * @AutoWired()
 * @RequestType("AddRatingRequest")
 * @ResponseType("FailedSuccessResponse")
 */

exports.addReview = function (requestData, activeUser, MovieRepo, UserRatingRepo) {
    const userId = activeUser.userId;
    const movieId = requestData.movieId.value();
    const rate = requestData.rate.value();
    const text = requestData.text.value();

    return MovieRepo.getMovieById(movieId).then(function(movie){
        return UserRatingRepo.addRating(userId, movieId, rate, text);
    }).then(function(data){
       return {success: true};
    });

};

/**
 * @AutoWired()
 * @Controller()
 * @Post("getMovieRatings")
 * @RequestType("PaginationIdRequest")
 * @ResponseType("UserRatingListResponse")
 * @LoginRequired()
 * @Pagination()
 */
module.exports.getRates = function (requestData, userSkip, userLimit, UserInfoRepo, UserRatingRepo, UserRatingResponse) {
    const movieId = requestData.id.value();
    return UserRatingRepo.getMovieRating(movieId, userSkip, userLimit).then(function(rating){
        return makeUserRatingListResponse(rating, UserInfoRepo, UserRatingResponse);
    });
};

function makeUserRatingListResponse(ratingList, UserInfoRepo, UserRatingResponse){
    if(!ratingList || ratingList.length <= 0){
        return Promise.resolve({});
    }
    let userIds = new Set();
    ratingList.forEach(function(rate){
        userIds.add(rate.getUserId());
    });
    let userIdArray = Array.from(userIds);
    let userMap = {};
    return UserInfoRepo.getAllInfos(userIdArray).then(function(userInfoList){
        if(!userInfoList || userInfoList.length <= 0){
            return userMap;
        }
        userInfoList.forEach(function(userInfo){
            userMap[userInfo.getUserId()] = userInfo;
        });
        return userMap;
    }).then(function(){
        let response = [];
        ratingList.forEach(function(rating){
            let toAdd = new UserRatingResponse();
            toAdd.initFromData(rating, userMap[rating.getUserId()]);
            response.push(toAdd);
        });
        return {rates:response};
    });

}


