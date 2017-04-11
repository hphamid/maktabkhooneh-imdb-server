/**
 * Created by hamid on 8/10/16.
 */
'use strict';

const GenericField = require("./GenericField");

function DateField(isRequired = false, autoNow=false, isNull=false, defaultValue = undefined) {
    this.init(isRequired, autoNow, isNull, defaultValue);
}

DateField.prototype = Object.create(GenericField.prototype);

DateField.prototype.init = function(isRequired = false, autoNow=false, isNull=false,
                                    defaultValue = undefined){
    this._autoNow = autoNow;
    GenericField.prototype.init.call(this, isRequired, isNull, defaultValue);
};

DateField.prototype.validate = function(){
    if(!this.value() && this._autoNow){
        this.setValue(new Date());
    }
    return GenericField.prototype.validate.call(this);
};

DateField.prototype.getTypeName = function () {
    return "date";
};

DateField.prototype.filter = function (newValue) {
    if(!newValue){
        return undefined;
    }
    if(newValue instanceof Date){
        return newValue;
    }
    try{
        let date = new Date(newValue);
        if(!isNaN(date.getTime())) {
            return date;
        }
    }catch(error){
    }

    //lets try backtory date format
    var dateString = newValue + '';
    try{
        let date = new Date(dateString.replace("UTC", "Z"));
        if(!isNaN(date.getTime())) {
            return date;
        }
    }catch(error){
    }
    return undefined;
};


DateField.prototype.toJSON = function(){
    if(this.value()){
        return this.value().getTime();
    }else{
        return undefined;
    }
};

module.exports = DateField;