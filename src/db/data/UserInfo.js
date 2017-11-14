/**
 * Created by Mine on 6/9/2016.
 */
'use strict';
const Backtory = require("../../provider/LibsProvider").backtory();
const Promisify = require("../../util/Promisify");
const ErrorCodes = require("../../util/ErrorCodes");
const  TimeHelper = require('../../util/TimeHelper');
var UserInfo = Backtory.Object.extend('UserInfo',{
    getId(){return this.get(UserInfo.Col.ID)},
    getUserId(){return this.get(UserInfo.Col.USER_ID)},
    getFullName(){return this.get(UserInfo.Col.FULL_NAME)},
    getDescription(){return this.get(UserInfo.Col.DESCRIPTION)},
    getProfilePic(){return this.get(UserInfo.Col.PROFILE_PIC)},
    getEmail(){return this.get(UserInfo.Col.EMAIL)},
    getCreationDate(){return this.get(UserInfo.Col.CreationDate)},

    setId(value){this.set(UserInfo.Col.ID, value)},
    setUserId(value){this.set(UserInfo.Col.USER_ID, value)},
    setFullName(value){this.set(UserInfo.Col.FULL_NAME, value)},
    setDescription(value){this.set(UserInfo.Col.DESCRIPTION, value)},
    setProfilePic(value){this.set(UserInfo.Col.PROFILE_PIC, value)},
    setEmail(value){this.set(UserInfo.Col.EMAIL, value)},
},{
    get Name(){return 'UserInfo'},
});
UserInfo.Col = {
    get ID(){return '_id'},
    get USER_ID(){return 'userId'},
    get FULL_NAME(){return 'fullName'},
    get DESCRIPTION(){return 'description'},
    get PROFILE_PIC(){return 'profilePic'},
    get EMAIL(){return 'email'},
    get CreationDate(){return 'createdAt'},
};

Backtory.Object.registerSubclass(UserInfo.Name, UserInfo);
module.exports = UserInfo;