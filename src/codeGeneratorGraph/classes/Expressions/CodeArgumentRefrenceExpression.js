/**
 * Created by Darya Computer on 8/1/2016.
 */
//is used for arguments in the method
const  CodeExpression = require('./../../bases/CodeExpression.js');

var CodeArgumentExpression = function (name) {
    this.ParameterName = name;
};

CodeArgumentExpression.prototype = Object.create(CodeExpression);

CodeArgumentExpression.prototype.init = function (name) {
    this.ParameterName = name;
};

CodeArgumentExpression.prototype.getParameterName = function () {
    return this.ParameterName
};

CodeArgumentExpression.prototype.setParameterName = function (name) {
    this.ParameterName = name;
};

module.exports = CodeArgumentExpression;