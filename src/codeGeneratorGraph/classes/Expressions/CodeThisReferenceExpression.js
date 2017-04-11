/**
 * Created by Darya Computer on 8/4/2016.
 */

const  CodeExpression = require('./../../bases/CodeExpression.js');
const CodeObjects = require('./../../Enumerations/CodeObjects.js');

var CodeThisReferenceExpression = function () {

};

CodeThisReferenceExpression.prototype = Object.create(CodeExpression);

CodeThisReferenceExpression.prototype.toString = function (languageHelper) {
    return languageHelper.toString(CodeObjects.CodeThisReferenceExpression, this);
};
module.exports = CodeThisReferenceExpression;