/**
 * Created by Darya Computer on 8/2/2016.
 */


const  CodeExpression = require('./../../bases/CodeExpression.js');
const CodeObjects = require('./../../Enumerations/CodeObjects.js');

var CodeMethodReferenceExpression = function () {
    this.TargetObject = new CodeExpression();
    this.MethodName = '';
    //for generics
    // this.TypeArguments = new CodeTypeReferenceCollection(); //FIXME
};
CodeMethodReferenceExpression.prototype = Object.create(CodeExpression);

CodeMethodReferenceExpression.prototype.init = function (obj, name, args) {
    this.setMethodName(name);
    this.setTargetObject(obj);
    this.setTypeArguments(args);
};

CodeMethodReferenceExpression.prototype.getTargetObject = function () {
    return this.TargetObject;
};

CodeMethodReferenceExpression.prototype.setTargetObject = function (object) {
    this.TargetObject = object;
};

CodeMethodReferenceExpression.prototype.getMethodName = function () {
    return this.MethodName;
};

CodeMethodReferenceExpression.prototype.setMethodName = function (name) {
    this.MethodName = name;
};

CodeMethodReferenceExpression.prototype.getTypeArguments = function () {
    return this.TypeArguments;
};

CodeMethodReferenceExpression.prototype.setTypeArguments = function (args) {
    if(Array.isArray(args)){
        var arguments = new CodeTypeReferenceCollection();
        arguments.add(args);
        this.TypeArguments = arguments;
    }
    else
        this.TypeArguments = args;
};

CodeMethodReferenceExpression.prototype.toString = function (languageHelper) {
    return languageHelper.toString(CodeObjects.CodeMethodReferenceExpression, this,
    [this.TargetObject.toString(languageHelper)]);
};

module.exports = CodeMethodReferenceExpression;
