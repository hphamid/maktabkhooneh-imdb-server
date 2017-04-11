/**
 * Created by Darya Computer on 8/2/2016.
 */


const  CodeExpression = require('./../../bases/CodeExpression.js');
const  CodeExpressionCollection = require('./../../bases/CodeExpressionCollection.js');

var CodeArrayIndexerExpression = function () {
    this.TargetObject = new CodeExpression();
    this.Indices = new CodeExpressionCollection();
};

CodeArrayIndexerExpression.prototype = Object.create(CodeExpression);

CodeArrayIndexerExpression.prototype.init = function (target, indices) {
    this.setTargetObject(target);
    this.setIndices(indices);
};

CodeArrayIndexerExpression.prototype.getTargetObject = function () {
    return this.TargetObject;
};

CodeArrayIndexerExpression.prototype.setTargetObject = function (object) {
    if(object instanceof CodeExpression)
        this.TargetObject = object;
};

CodeArrayIndexerExpression.prototype.getIndices = function () {
    return this.Indices;
};

CodeArrayIndexerExpression.prototype.setIndices = function (args) {
    for (var i = 0; i < args.length; i++)
        this.Indices.add(args[i]);
};

module.exports = CodeArrayIndexerExpression;