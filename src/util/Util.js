/**
 * Created by Mine on 6/11/2016.
 */
"use strict";

/**
 *
 * @Component()
 */
module.exports = {
    get MAX_QUERY_LIMIT(){return 1000},
    getDicValuesAsList: function(list) {
        if(!list){
            return [];
        }
        var toReturn = [];
        Object.keys(list).slice().forEach(function(key){
            toReturn.push(list[key]);
        });
        return toReturn;
    }
};