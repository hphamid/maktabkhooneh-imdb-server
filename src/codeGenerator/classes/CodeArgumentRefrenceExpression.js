/**
 * Created by Darya Computer on 8/1/2016.
 */

var CodeArgumentExpression = function () {
    this.ParameterName = '';
}

CodeArgumentExpression.init = function (name) {
    this.ParameterName = name;
}

CodeArgumentExpression.getParameterName = function () {
    return this.ParameterName
};

CodeArgumentExpression.setParameterName = function (name) {
    this.ParameterName = name;
};

module.exports = CodeArgumentExpression;