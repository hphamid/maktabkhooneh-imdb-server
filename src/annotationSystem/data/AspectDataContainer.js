/**
 * Created by hamid on 8/3/16.
 */
'use strict';

const AspectData = require('./AspectData.js');

function AspectDataContainer() {
    this.all = [];
}

AspectDataContainer.prototype.addNew = function (aspectData) {
    this.all.push(aspectData);
};

module.exports = AspectDataContainer;