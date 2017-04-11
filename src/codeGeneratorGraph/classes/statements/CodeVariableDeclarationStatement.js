/**
 * Created by Darya Computer on 8/2/2016.
 */

const  CodeStatement = require('./../../bases/CodeStatement.js');
const  CodeTypeReference = require('./../CodeTypeReference.js');
const  CodeExpression = require('./../../bases/CodeExpression.js');
const CodeObjects = require('./../../Enumerations/CodeObjects.js');

var CodeVariableDeclarationStatement = function () {
    this.Type = new CodeTypeReference();
    this.Name = '';
    this.InitExpression = new CodeExpression();
};

CodeVariableDeclarationStatement.prototype = Object.create(CodeStatement);

CodeVariableDeclarationStatement.prototype.init = function (type, name, initExp) {

    this.setInitExpression(initExp);
    this.setName(name);
    this.setType(type);
};

CodeVariableDeclarationStatement.prototype.getType = function () {
    return this.Type;
};

CodeVariableDeclarationStatement.prototype.setType = function (type) {
    if(type instanceof CodeTypeReference)
        this.Type = type;
    else {
        var codeType = new CodeTypeReference();
        codeType.init(type);
        this.Type = codeType;
    }
};

CodeVariableDeclarationStatement.prototype.getName = function () {
    return this.Name;
};

CodeVariableDeclarationStatement.prototype.setName = function (name) {
    this.Name = name;
};

CodeVariableDeclarationStatement.prototype.getInitExpression = function () {
    return this.InitExpression;
};

CodeVariableDeclarationStatement.prototype.setInitExpression = function (expression) {
    this.InitExpression = expression;
};

CodeVariableDeclarationStatement.prototype.toString = function (languageHelper) {
    return languageHelper.toString(CodeObjects.CodeVariableDeclarationStatement, this,
        [this.getType().toString(languageHelper), this.getInitExpression().toString(languageHelper)]);
};

module.exports = CodeVariableDeclarationStatement;