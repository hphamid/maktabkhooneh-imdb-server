/**
 * Created by Mine on 6/9/2016.
 */
'use strict';
const Backtory = require("../../provider/LibsProvider").backtory();
const Promisify = require("../../util/Promisify");
const ErrorCodes = require("../../util/ErrorCodes");
const  TimeHelper = require('../../util/TimeHelper');
var UserRating = Backtory.Object.extend('UserRating',{
    getId(){return this.get(UserRating.Col.ID)},
    getUserId(){return this.get(UserRating.Col.UserId)},
    getMovieId(){return this.get(UserRating.Col.MovieId)},
    getRate(){return this.get(UserRating.Col.Rate)},
    getText(){return this.get(UserRating.Col.Text)},
    getCreationDate(){return this.get(UserRating.Col.CreationDate)},

    setId(value){this.set(UserRating.Col.ID, value)},
    setUserId(value){this.set(UserRating.Col.UserId, value)},
    setMovieId(value){this.set(UserRating.Col.MovieId, value)},
    setRate(value){this.set(UserRating.Col.Rate, value)},
    setText(value){this.set(UserRating.Col.Text, value)},
},{
    get Name(){return 'UserRating'},
});
UserRating.Col = {
    get Id(){return '_id'},
    get UserId(){return 'userId'},
    get MovieId(){return 'movieId'},
    get Rate(){return 'rate'},
    get Text(){return 'text'},
    get CreationDate(){return 'createdAt'},

};

Backtory.Object.registerSubclass(UserRating.Name, UserRating);
module.exports = UserRating;