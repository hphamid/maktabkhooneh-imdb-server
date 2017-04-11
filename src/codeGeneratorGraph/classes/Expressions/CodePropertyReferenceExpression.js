/**
 * Created by Darya Computer on 8/4/2016.
 */

const  CodeExpression = require('./../../bases/CodeExpression.js');


var CodePropertyReference = function () {
    this.TargetObject = new CodeExpression();
    this.PropertyName = '';
};

CodePropertyReference.prototype = Object.create(CodeExpression);

CodePropertyReference.prototype.init = function (obj, name) {
    this.setTargetObject(obj);
    this.setPropertyName(name);
};

CodePropertyReference.prototype.getTargetObject = function () {
    return this.TargetObject;
};

CodePropertyReference.prototype.setTargetObject = function (obj) {
    this.TargetObject = obj;
};

CodePropertyReference.prototype.getPropertyName = function () {
    return this.PropertyName;
};

CodePropertyReference.prototype.setPropertyName = function (name) {
    this.PropertyName = name;
};

module.exports = CodePropertyReference;