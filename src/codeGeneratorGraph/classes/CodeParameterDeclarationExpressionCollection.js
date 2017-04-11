/**
 * Created by Darya Computer on 8/1/2016.
 */

'use strict';
const  CollectionBase = require('./../bases/CollectionBase.js');
const CodeObjects = require('./../Enumerations/CodeObjects.js');

var CodeParameterDeclarationExpressionCollection = function () {
    this.InnerList = [];
};

CodeParameterDeclarationExpressionCollection.prototype = Object.create(CollectionBase);

CodeParameterDeclarationExpressionCollection.prototype.toString = function (languageHelper) {
    var parametersStringArray = [];
    for(let i = 0; i < this.InnerList.length; i++){
        parametersStringArray.push(this.InnerList[i].toString(languageHelper));
    }
    return languageHelper.toString(
        CodeObjects.CodeParameterDeclarationExpressionCollection, this, parametersStringArray);
};

module.exports = CodeParameterDeclarationExpressionCollection;