/**
 * Created by hamid on 8/12/16.
 */
'use strict';
const Path = require("path");
const fs = require("fs");
const infoFileAddr = "../info.json";
var infoFile = Path.resolve(__dirname, infoFileAddr);
var infoString = fs.readFileSync(infoFile);
var info = JSON.parse(infoString);
/**
 * @DependencyProvider("AppInfo")
 */
module.exports.backtory = function(){
    return info;
};