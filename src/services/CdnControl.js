/**
 * Created by Mine on 7/5/2016.
 */
'use strict';
var path = require('path');
var config = require('../config');
var unirest = require('unirest');
var Backtory = require('../provider/LibsProvider').backtory();
var loginUrl = 'https://api.backtory.com/auth/login';
var cdnUrl = 'https://cdn.backtory.com';
var cdnHeaders = {'X-Backtory-Cdn-Id': config.cdnInstanceId};


/**
 * @Component()
 */
module.exports = {};

module.exports.move = function (file, destinationDir) {
    return loginMaster().then(function (token) {
        cdnHeaders['Authorization'] = 'bearer ' + token;
        cdnHeaders['Content-Type'] = 'application/json';
        var body = {
            "sourceUrls": [file],
            "forces": [false],
            "destinationUrl": destinationDir
        };
        return new Promise(function (resolve, reject) {
            unirest.post(cdnUrl + '/files/move').headers(cdnHeaders).send(body).end(function (response) {
                if (response.status == 200) {
                    resolve(true);
                } else {
                    reject({code: response.status, message:JSON.stringify(response.body)});
                }
            });
        });
    });
};

module.exports.delete = function (file) {
    return loginMaster().then(function (token) {
        cdnHeaders['Authorization'] = 'bearer ' + token;
        cdnHeaders['Content-Type'] = 'application/json';
        var body = {
            "urls": [file],
            "forced": [false]
        };
        return new Promise(function (resolve, reject) {
            unirest.delete(cdnUrl + '/files').headers(cdnHeaders).send(body).end(function (response) {
                if (response.status == 200) {
                    resolve(true);
                } else {
                    reject({code: response.status, message:JSON.stringify(response.body)});
                }
            });
        })
    });
};

module.exports.rename = function (file, newName) {
    return loginMaster().then(function (token) {
        cdnHeaders['Authorization'] = 'bearer ' + token;
        cdnHeaders['Content-Type'] = 'application/json';
        var body = {"items": [{"pathToRename": file, "newFileName": newName}]};
        return new Promise(function (resolve, reject) {
            unirest.post(cdnUrl + '/files/rename').headers(cdnHeaders).send(body).end(function (response) {
                if (response.status == 200) {
                    resolve(true);
                } else {
                    reject({code: response.status, message:JSON.stringify(response.body)});
                }
            });
        })
    });
};
module.exports.makeDir = function (path) {
    return loginMaster().then(function (token) {
        cdnHeaders['Authorization'] = 'bearer ' + token;
        cdnHeaders['Content-Type'] = 'application/json';
        var body = {"path": path};
        return new Promise(function (resolve, reject) {
            unirest.post(cdnUrl + '/directories').headers(cdnHeaders).send(body).end(function (response) {
                if (response.status < 300 && response.status >= 200) {
                    resolve(response.status);
                } else {
                    reject({code: response.status, message:JSON.stringify(response.body)});
                }
            });
        });
    });
};

module.exports.getDirInfo = function (file, pageNumber, pageSize, sortingType) {
    return loginMaster().then(function (token) {
        cdnHeaders['Authorization'] = 'bearer ' + token;
        cdnHeaders['Content-Type'] = 'application/json';
        var body = {
            "url": file,
            "pageNumber": pageNumber,
            "pageSize": pageSize,
            "sortingType": sortingType
        };
        return new Promise(function (resolve, reject) {
            unirest.post(cdnUrl + '/files/directoryInfo').headers(cdnHeaders).send(body).end(function (response) {
                if (response.status == 200) {
                    resolve(response.body);
                } else {
                    reject({code: response.status, message:JSON.stringify(response.body)});
                }
            });
        });
    });
};

module.exports.getFileInfo = function (file) {
    return loginMaster().then(function (token) {
        cdnHeaders['Authorization'] = 'bearer ' + token;
        cdnHeaders['Content-Type'] = 'application/json';
        var body = {
            "url": file,
        };
        return new Promise(function (resolve, reject) {
            unirest.post(cdnUrl + '/files/fileInfo').headers(cdnHeaders).send(body).end(function (response) {
                if (response.status == 200) {
                    resolve(response.body);
                } else {
                    reject({code: response.status, message:JSON.stringify(response.body)});
                }
            });
        });
    });
};


module.exports.loginMaster = loginMaster;
function loginMaster() {
    var header = JSON.parse(JSON.stringify(config.lambdaHeaders));
    header["X-Backtory-Authentication-Key"] = config.integratedMasterKey;
    return new Promise(function (resolve, reject) {
        unirest.post(loginUrl).headers(header).end(function (response) {
            if (response && response.body && response.body && response.body['access_token']) {
                resolve(response.body['access_token']);
            } else {
                reject({status: response.status, message: 'cdn login problem'})
            }
        });
    });
};