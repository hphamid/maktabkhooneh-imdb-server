/**
 * Created by Darya Computer on 8/1/2016.
 */

var CollectionBase = function () {
    this.InnerList = [];
};

CollectionBase.size = function () {
    return this.InnerList.length;
};

CollectionBase.RemoveAt = function (index) {
    this.InnerList.splice(index, 1);
};

CollectionBase.Add = function (item) {
    this.InnerList.push(item);
};


CollectionBase.Contains = function (item) {
    return this.InnerList.contains(item);
};

CollectionBase.Remove = function (item) {
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