/**
 * Created by hamid on 8/10/16.
 */
'use strict';

function GenericField(isRequired=false, isNull=false, defaultValue = undefined){
    this.init(desc, isRequired, isNull, defaultValue);
}

GenericField.prototype.init = function(isRequired=false, isNull=false, defaultValue=undefined){
    this._isRequired = isRequired;
    this._value = undefined;
    this._defaultValue = defaultValue;
    this._isNull = isNull;
};


GenericField.prototype.isSet = function(){
    return this.value(false) !== undefined && this.value(false) !== null;
};

GenericField.prototype.isRequired = function(){
    return this._isRequired;
};

GenericField.prototype.setRequired = function(required){
    this._isRequired = required;
    return this._isRequired;
};

GenericField.prototype.value = function(getDefault=true){
    if(getDefault && !this.isSet()){
        return this._defaultValue;
    }
    return this._value;
};

GenericField.prototype.getDefault = function(){
    return this._defaultValue;
};

GenericField.prototype.setValue = function(value){
    var toSet = value;
    if(toSet instanceof GenericField){
        toSet = toSet.value();
    }
    var newValue = this.filter(toSet);
    if(newValue !== undefined){
        this._value = newValue;
    }
    return this._value;
};

//you can filter passed value before setting to value!
GenericField.prototype.filter = function(newValue){
    return newValue;
};

GenericField.prototype.validate = function(){
    if(this.isRequired()){
        return this.value() !== undefined && (this._isNull || this.value() !== null);
    }
    return true;
};

GenericField.prototype.getTypeName = function(){
    return "generic";
};

GenericField.prototype.valueOf = function(){
    return this.value();
};

GenericField.prototype.toString = function(){
    if(this.value()){
        return this.value().toString();
    }
    return "";
};

GenericField.prototype.toJSON = function(){
    return this.value();
};

module.exports = GenericField;