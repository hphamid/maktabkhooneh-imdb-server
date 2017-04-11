/**
 * Created by Darya Computer on 8/2/2016.
 */


const  CodeExpression = require('./../../bases/CodeExpression.js');
const CodeParameterDeclarationExpressionCollection = require('./../../classes/CodeParameterDeclarationExpressionCollection.js');
const CodeMethodReferenceExpression = require('./CodeMethodReferenceExpression.js');
const CodeObjects = require('./../../Enumerations/CodeObjects.js');

const  leFunc = require('leFunc');

var CodeMethodInvokeExpression = function () {
    this.Method = new CodeMethodReferenceExpression();
    this.Parameters = new CodeParameterDeclarationExpressionCollection();
};

CodeMethodInvokeExpression.prototype = Object.create(CodeExpression);

CodeMethodInvokeExpression.prototype.init = function (method, parameters) {
    this.setMethod(method);
    this.setParameters(parameters);
};
CodeMethodInvokeExpression.prototype.getMethod = function () {
    return this.Method;
};


CodeMethodInvokeExpression.prototype.setMethod = function(method){
    this.Method = method;

};

CodeMethodInvokeExpression.prototype.getParameters = function () {
    return this.Parameters;
};

CodeMethodInvokeExpression.prototype.setParameters = function (parameters) {
    if(Array.isArray(parameters))
        this.Parameters.add(parameters);
    else
        this.Parameters = parameters;
};

CodeMethodInvokeExpression.prototype.toString = function (languageHelper) {
    return languageHelper.toString(CodeObjects.CodeMethodInvokeExpression, this,
        [this.getMethod().toString(languageHelper), this.getParameters().toString(languageHelper)]);
};

module.exports = CodeMethodInvokeExpression;
