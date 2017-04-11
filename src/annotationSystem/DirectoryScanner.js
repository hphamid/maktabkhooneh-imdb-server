/**
 * Created by hamid on 7/27/16.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const FileInfo = require('./data/FileInfo.js');

function scanFolder (folderAddress, extension) {
    var fullAddress = path.resolve(folderAddress);
    var files = fs.readdirSync(fullAddress);
    var toReturn = [];
    files.forEach(function (file) {
        var fileAddr = path.resolve(fullAddress, file);
        var fileStat = fs.statSync(fileAddr);
        if(fileStat.isDirectory()){
            toReturn = toReturn.concat(scanFolder(fileAddr, extension));
        }else if(fileStat.isFile()){
            var ext = path.extname(fileAddr);
            if(ext == extension || !extension){
                var fileItem = new FileInfo();
                fileItem.setFullPath(fileAddr);
                toReturn.push(fileItem);
            }
        }
    });
    return toReturn;
}

module.exports.scanFolder = scanFolder;

module.exports.scanFolders = function (folderAddresses, extension){
    var toReturn = [];
    folderAddresses.forEach(function(address){
        var result = scanFolder(address, extension);
        if(result){
            toReturn = toReturn.concat(result);
        }
    });
    return toReturn;
};
