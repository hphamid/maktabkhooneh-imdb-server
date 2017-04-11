/**
 * Created by mohammadjavad on 5/28/2016.
 */
'use strict';
const fs = require('fs');

/**
 * @Controller()
 * @Post("hello")
 * @Description("just returns hello if user is logged In :)")
 * @ResponseType("FailedSuccessResponse")
 * @LoginRequired()
 * @ActiveUser()
 */
exports.hello = function (activeUser) {
    return {success: true, message: "hello " + activeUser.username};
};


/**
 * @AutoWired()
 * @Controller()
 * @Post("info")
 * @Description("returns app information")
 * @ResponseType("AppInfoResponse")
 */
exports.info = function (AppInfo) {
    return AppInfo;
};



