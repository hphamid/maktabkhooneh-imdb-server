/**
 * Created by Mine on 6/11/2016.
 */


var ErrorCodes = {
    make:function (errorCode, message) {
        return {code:errorCode, message: message};
    },
    makeUnknownError:function (message) {
        return {code:ErrorCodes.UNKNOWN, message: (message != null ? message : "unknown error!")};
    },

    UNKNOWN:0,
    UnAuthorized: 401,

    Forbidden: 403,
    NOT_FOUND:404,

};

/**
 * @Component("ErrorCodes")
 */
module.exports = ErrorCodes;
