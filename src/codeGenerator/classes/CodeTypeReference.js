/**
 * Created by Darya Computer on 8/1/2016.
 */

var CodeTypeReference = function () {
    this.BaseType = '';
    this.TypeArguments = null; //FIXME CodeReferenceCollection hastasn
}

CodeTypeReference.init = _$over({
    'String' : function(baseType) {
        this.BaseType = baseType;
    }
});
