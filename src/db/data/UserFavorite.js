/**
 * Created by Mine on 6/9/2016.
 */
'use strict';
const Backtory = require("../../provider/LibsProvider").backtory();
const Promisify = require("../../util/Promisify");
const ErrorCodes = require("../../util/ErrorCodes");
const  TimeHelper = require('../../util/TimeHelper');
var UserFavorite = Backtory.Object.extend('UserFavorite',{
    getId(){return this.get(UserFavorite.Col.ID)},
    getUserId(){return this.get(UserFavorite.Col.UserId)},
    getMovieId(){return this.get(UserFavorite.Col.MovieId)},
    getCreationDate(){return this.get(UserFavorite.Col.CreationDate)},

    setId(value){this.set(UserFavorite.Col.ID, value)},
    setUserId(value){this.set(UserFavorite.Col.UserId, value)},
    setMovieId(value){this.set(UserFavorite.Col.MovieId, value)},
},{
    get Name(){return 'UserFavorite'},
});
UserFavorite.Col = {
    get Id(){return '_id'},
    get UserId(){return 'userId'},
    get MovieId(){return 'movieId'},
    get CreationDate(){return 'createdAt'},

};

Backtory.Object.registerSubclass(UserFavorite.Name, UserFavorite);
module.exports = UserFavorite;