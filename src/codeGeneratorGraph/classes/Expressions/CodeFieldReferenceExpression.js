/**
 * Created by Darya Computer on 8/2/2016.
 */

const  CodeExpression = require('./../../bases/CodeExpression.js');
const CodeObjects = require('./../../Enumerations/CodeObjects.js');

var CodeFieldReferenceExpression = function (target, name) {
    this.setTargetObject(target);
    this.setFieldName(name);
};

CodeFieldReferenceExpression.prototype = Object.create(CodeExpression);

CodeFieldReferenceExpression.prototype.init = function (target, name) {
    this.setTargetObject(target);
    this.setFieldName(name);
};

CodeFieldReferenceExpression.prototype.getTargetObject = function () {
    return this.TargetObject;
};

CodeFieldReferenceExpression.prototype.setTargetObject = function (object) {
    this.TargetObject = object;
};

CodeFieldReferenceExpression.prototype.getFieldName = function () {
    return this.FieldName;
};

CodeFieldReferenceExpression.prototype.setFieldName = function (name) {
    this.FieldName = name;
};


CodeFieldReferenceExpression.prototype.toString = function (languageHelper) {
    return languageHelper.toString(CodeObjects.CodeFieldReferenceExpression, this,
        [this.TargetObject.toString(languageHelper)]);
};

module.exports = CodeFieldReferenceExpression;