/**
 * Created with JetBrains RubyMine.
 * User: milos
 * Date: 4/5/13
 * Time: 3:46 PM
 * To change this template use File | Settings | File Templates.
 */

Ember.PieChart = Ember.View.extend({

    initial: 0,
    timerModel: "", // this is the same as "controller.model.time_counter" and it is entered in template

    didInsertElement: function () {
        //timerModel == "controller.model.time_counter"
        var timerModel = this.get("timerModel");

        var time = this.get(timerModel);
        this.set("initial", time);
        this._startPieCounter(this.$());
    },
    _startPieCounter: function (elem) {
        if (!elem.hasClass("easyPieChart")) {
            elem.easyPieChart({
                animate: 1000
            });
            elem.data("easyPieChart").update(time * 100 / parseInt(this.get("initial")));
        } else {
            var time = this.get("controller.model.time_counter");
            if (parseInt(time) == 0) {
                time = parseInt(this.get("initial"));
            } else {
                time--;
            }
            this.set("controller.model.time_counter", time)
        }

        var that = this;
//        setTimeout(function () {
//            that._startPieCounter(that.$());
//        }, 1000);
    },

    _timeChanged: function () {
        var time = this.get("controller.model.time_counter");
        this.$().data("easyPieChart").update(time * 100 / parseInt(this.get("initial")));
        // @todo make it dynamic if possible
    }.observes("controller.model.time_counter"),

    _updateInitialTime: function () {
        var timerModel = this.get("timerModel");

        var time = this.get(timerModel);
        this.set("initial", time);
    }.observes("controller.model.duration")
});
