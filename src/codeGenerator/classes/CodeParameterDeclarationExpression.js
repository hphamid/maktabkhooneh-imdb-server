/**
 * Created by Darya Computer on 8/1/2016.
 */

var CodeParameterDeclarationExpression = function () {
    this.Name = '';
    this.Type = '';
}

CodeParameterDeclarationExpression.prototype = Object.create(CodeExpression);

CodeParameterDeclarationExpression.init = _$over({
    'CodeTypeReference, String' : function(type, name) {
        this.Type = type.BaseType;
        this.Name = name;
    },
    'String, String' : function(type, name) {
        this.Type = type;
        this.Name = name;
    }

});



CodeParameterDeclarationExpression.getName = function () {
    return this.Name;
};

CodeParameterDeclarationExpression.setName = function (name) {
    this.Name = name;
};

CodeParameterDeclarationExpression.getType = function () {
    return this.Type;
};

CodeParameterDeclarationExpression.setType = function (type) {
    this.Type = type;
}
