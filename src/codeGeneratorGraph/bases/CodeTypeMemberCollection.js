/**
 * Created by Darya Computer on 8/1/2016.
 */
'use strict';
const  CollectionBase = require('./CollectionBase.js');
const CodeObjects = require('./../Enumerations/CodeObjects.js');

var CodeTypeMemberCollection = function () {
    this.InnerList = [];
};

CodeTypeMemberCollection.prototype = Object.create(CollectionBase);

CodeTypeMemberCollection.prototype.toString = function (languageHelper) {
    var membersStringArray = [];
        for (var i = 0; i < this.InnerList.length; i++){
        membersStringArray.push(this.InnerList[i].toString(languageHelper));
    }
    return languageHelper.toString(CodeObjects.CodeTypeMemberCollection, this, membersStringArray);
};

module.exports = CodeTypeMemberCollection;