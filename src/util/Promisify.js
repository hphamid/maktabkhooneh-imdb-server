/**
 * Created by hamid on 8/10/16.
 */
'use strict';

/**
 *
 * @Component()
 */
module.exports = {}

//first parameter is function
module.exports.wrap = function () {
    var func = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    return new Promise(function (resolve, reject) {
        args.push({
            success: function (results) {
                resolve(results);
            },
            error: function (error) {
                reject(error)
            }
        });
        func.apply(null, args);
    })
};

//first parameter is function second one is this parameter
module.exports.wrapWithThis = function () {
    var func = arguments[0];
    var thisParam = arguments[1];
    var args = Array.prototype.slice.call(arguments, 2);
    return new Promise(function (resolve, reject) {
        args.push({
            success: function (results) {
                resolve(results);
            },
            error: function (error) {
                reject(error)
            }
        });
        func.apply(thisParam, args);
    });
};