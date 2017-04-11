/**
 * Created by Mine on 6/13/2016.
 */
'use strict';
const UserInfo = require('../../db/data/UserInfo');
const ErrorCodes = require("../../util/ErrorCodes");
const TimeHelper = require('../../util/TimeHelper');
const Promisify = require("../../util/Promisify");
const Backtory = require("../../provider/LibsProvider").backtory();
/**
 * @Repository()
 */
module.exports = {};

module.exports.updateInfo = function (userId, fullName, imageAddress, description) {
    const query = new Backtory.Query(UserInfo);
    query.equalTo(UserInfo.Col.USER_ID, userId);
    return Promisify.wrapWithThis(query.find, query).then(function (results) {
        if (results.length <= 0) {
            return Promise.reject(ErrorCodes.make(ErrorCodes.NOT_FOUND, 'userInfo not found'));
        }
        const userInfo = results[0];
        if (fullName)userInfo.setFullName(fullName);
        if (imageAddress)userInfo.setProfilePic(imageAddress);
        if (description)userInfo.setDescription(description);
        return Promisify.wrapWithThis(userInfo.save, userInfo);
    });
};

module.exports.getInfo = function (userId) {
    let query = new Backtory.Query(UserInfo);
    query.equalTo(UserInfo.Col.USER_ID, userId);
    return Promisify.wrapWithThis(query.find, query).then(function(results){
        if(results.length<=0){
            return Promise.reject(ErrorCodes.make(ErrorCodes.NOT_FOUND, 'userInfo not found'));
        }
        return results[0];
    });
};
module.exports.getAllInfos = function (userIds) {
    let query = new Backtory.Query(UserInfo);
    query.containedIn(UserInfo.Col.USER_ID, userIds);
    return Promisify.wrapWithThis(query.find, query);
};


