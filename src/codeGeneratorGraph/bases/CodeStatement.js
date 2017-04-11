/**
 * Created by Darya Computer on 8/2/2016.
 */

const  CodeObject = require('./CodeObject.js');

var CodeStatement = function () {
  var LinePragma = 0;   //line that statement occurs
};

CodeStatement.prototype = Object.create(CodeObject);
