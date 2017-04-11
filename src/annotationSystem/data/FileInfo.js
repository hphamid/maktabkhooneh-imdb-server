/**
 * Created by hamid on 8/1/16.
 */
'use strict';
const path = require('path');

function FileInfo(){
    this.init();
}

FileInfo.prototype.init = function(){
    this.path = ''; //full path including file name
    this.folder = ''; //base folder full path
    this.fullFileName = ''; //file name including extension
    this.fileName=''; //file name not including extension
    this.ext = ''; //extension not including first dot!
};

FileInfo.prototype.setFullPath = function(fullPath){
    if(!path.isAbsolute(fullPath)){
        throw fullPath + "is not full path!";
    }
    this.path = fullPath;
    this.folder = path.dirname(fullPath);
    this.fullFileName = path.basename(fullPath);
    this.ext = path.extname(fullPath);
    this.fileName = path.basename(fullPath, this.ext);
    if(this.ext){ //removing . from extension
        this.ext = this.ext.replace('.', '');
    }
};

module.exports = FileInfo;