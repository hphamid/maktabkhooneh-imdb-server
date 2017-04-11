/**
 * Created by hamid on 8/23/16.
 */
'use strict';
const Path = require("path");
const uuid = require("node-uuid");
const Promisify = require("../util/Promisify.js");
const baseFolder = "/users";
const baseHttpAddress = require("../config").baseUrl;

/**
 * @Component()
 */
module.exports = {};


/**
 * @AutoWired()
 */
module.exports.addImageFile = function (userId, imagePath, CdnControl) {
    return moveFile(imagePath, getImagePath(userId), CdnControl);
};

/**
 * @AutoWired()
 */
module.exports.removeImageFile = function (userId, imagePath, CdnControl) {
    return removeFile(imagePath, CdnControl)
};

module.exports.getImagePath = getImagePath;
function getImagePath(userId) {
    return Path.join(baseFolder, userId, "images", uuid.v1());
}

module.exports.isLink = isLink;
function isLink(address) {
    return address.indexOf(baseHttpAddress) >= 0;
}

module.exports.convertToLink = convertToLink;
function convertToLink(address) {
    if(!address){
        return address;
    }
    if (isLink(address)) {
        return address;
    }
    return baseHttpAddress + address;
}

module.exports.convertToFileAddress = function (address) {
    if(!address){
        return address;
    }
    if (!isLink(address)) {
        return address;
    }
    return address.replace(baseHttpAddress, '');
};



function getFileSize(toCheckPath, CdnControl){
    return getFileInfo(toCheckPath, CdnControl).then(function(data){
       if(data){
           return data.fileSizeInBytes;
       }
       return 0;
    });
}


function getFileInfo(toCheckPath, CdnControl) {
    if(!toCheckPath){
        return Promise.resolve();
    }
    return CdnControl.getFileInfo(toCheckPath);
}


function moveFile(fromPath, toPath, CdnControl) {
    var secondFileName = Path.basename(toPath);
    var secondFolderAddress = Path.dirname(toPath);
    var firtFileName = Path.basename(fromPath);
    var firstFolderAddress = Path.dirname(fromPath);
    return CdnControl.rename(fromPath, secondFileName).then(function () {
        return CdnControl.makeDir(secondFolderAddress + "/");
    }).then(function () {
        return CdnControl.move(Path.join(firstFolderAddress, secondFileName), secondFolderAddress + "/");
    }).then(function () {
        return toPath;
    });
}

function removeFile(toRemovePath, CdnControl) {
    if(!toRemovePath){
        return Promise.resolve();
    }
    return CdnControl.rename(toRemovePath, uuid.v1() + "-deleted");
}

function realyremoveFile(toRemovePath, CdnControl) {
    return CdnControl.delete(toRemovePath);
}