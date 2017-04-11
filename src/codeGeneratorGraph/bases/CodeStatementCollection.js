/**
 * Created by Darya Computer on 8/2/2016.
 */
'use strict';

const  CollectionBase = require('./CollectionBase.js');
const CodeObjects = require('./../Enumerations/CodeObjects.js');

var CodeStatementCollection = function () {
    this.InnerList = [];
};

CodeStatementCollection.prototype = Object.create(CollectionBase);

CodeStatementCollection.prototype.toString = function (languageHelper) {
    var statementStringArray = [];
    for(let i = 0; i < this.InnerList.length; i++){
        statementStringArray.push(this.InnerList[i].toString(languageHelper));
    }
    return languageHelper.toString(CodeObjects.CodeStatementCollection, this, statementStringArray);
};

module.exports = CodeStatementCollection;