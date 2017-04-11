/**
 * Created by Darya Computer on 8/1/2016.
 */
const  CodeExpression = require('./../../bases/CodeExpression.js');
const  CodeTypeReference = require('./../CodeTypeReference.js');
const CodeObjects = require('./../../Enumerations/CodeObjects.js');

var CodeParameterDeclarationExpression = function () {
    this.Name = '';
    this.Type = new CodeTypeReference();
};

CodeParameterDeclarationExpression.prototype = Object.create(CodeExpression);

CodeParameterDeclarationExpression.prototype.init = function (type, name) {
    this.setType(type);
    this.setName(name);
};


CodeParameterDeclarationExpression.prototype.getName = function () {
    return this.Name;
};

CodeParameterDeclarationExpression.prototype.setName = function (name) {
    this.Name = name;
};

CodeParameterDeclarationExpression.prototype.getType = function () {
    return this.Type;
};

CodeParameterDeclarationExpression.prototype.setType = function (type) {
    if(type instanceof CodeTypeReference)
        this.Type = type;
    else{
        var typeArg = new CodeTypeReference();
        typeArg.init(type);
        this.Type = typeArg;
    }

};

CodeParameterDeclarationExpression.prototype.toString = function (languageHelper) {
    return languageHelper.toString(CodeObjects.CodeParameterDeclarationExpression, this,
        [this.getType().toString(languageHelper)]);
};

module.exports = CodeParameterDeclarationExpression;