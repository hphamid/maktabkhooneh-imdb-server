/**
 * Created by Darya Computer on 8/1/2016.
 */
const  CollectionBase = require('./CollectionBase.js');

var CodeExpressionCollection = function () {
    this.InnerList = [];
};

CodeExpressionCollection.prototype = Object.create(CollectionBase);

module.exports = CodeExpressionCollection;