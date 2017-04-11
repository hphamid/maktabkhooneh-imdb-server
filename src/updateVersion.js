/**
 * Created by hamid on 8/12/16.
 */
'use strict';

const execSync = require('child_process').execSync;
const fs = require("fs");
const path = require("path");
const infoFileName = "info.json";



module.exports.update = function(){
    if(process.platform == "win32"){
        return;
    }
    var infoFile = path.resolve(__dirname, infoFileName);
    var infoString = fs.readFileSync(infoFile);
    var info = JSON.parse(infoString);
    var stdout = execSync('./src/version.sh').toString();
    console.log(stdout);
    info.version = stdout.replace("\n", "");
    console.log(info);
    fs.writeFileSync(infoFile, JSON.stringify(info, null, 4));
};
