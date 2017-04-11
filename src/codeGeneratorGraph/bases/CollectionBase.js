/**
 * Created by Darya Computer on 8/1/2016.
 */

var CollectionBase = function () {
    this.InnerList = [];
};

CollectionBase.size = function () {
    return this.InnerList.length;
};

CollectionBase.removeAt = function (index) {
    this.InnerList.splice(index, 1);
};

CollectionBase.add = function (item) {
    if(Array.isArray(item)){
        for (var i = this.InnerList.length, j = 0; j < item.length; i++, j++){
            this.InnerList.push(item[j]);
        }
    }
    else
        this.InnerList.push(item);

};


CollectionBase.contains = function (item) {
    return this.InnerList.contains(item);
};

CollectionBase.remove = function (item) {
    var index = this.InnerList.indexOf(item);
    if(index > -1) {
        this.InnerList.splice(index, 1);
    }
};

CollectionBase.getItem = function (index) {
    if(index < this.InnerList.length && index > -1)
        return this.InnerList[index];
    return null;
};

CollectionBase.setItem = function (index, item) {
    if(index < this.InnerList.length && index > -1)
        this.InnerList[index] = item;
};

module.exports = CollectionBase;