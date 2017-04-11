/**
 * Created by Mine on 7/11/2016.
 */

/**
 *
 * @Component()
 */
module.exports = {
    getDailyDate: function (date) {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    },
    getCurrentDate: function () {
        return new Date();
    },
    getDateWithDiffDays: function (date, amount) {
        var toReturn = new date(date.getTime());
        toReturn.setDate(date.getDate() + amount);
        return toReturn;
    }
};
