/**
 * Created by Darya Computer on 8/6/2016.
 */

const CodeExpression = require('./../bases/CodeExpression.js');
const CodeObjects = require('./../Enumerations/CodeObjects.js');

var CodeRequire = function (address) {
    this.Address = address;
};

CodeRequire.prototype = Object.create(CodeExpression);

CodeRequire.prototype.setAddress = function (address) {
    this.Address = address;
};

CodeRequire.prototype.getAddress = function () {
    return this.Address;
};

CodeRequire.prototype.toString = function (languageHelper) {
    
    return languageHelper.toString(CodeObjects.CodeRequireExpression, this, null);
};

module.exports = CodeRequire;