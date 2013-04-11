/*Classes needed for actual game go here*/

Ember.PokerCard = Ember.View.extend({
    click: function () {
        var points = this.$().children(':first').attr("points");
        this.get("controller.model").set("selectedCard", points);
    }
});

Ember.PokerCardBoard = Ember.View.extend({
    _clearSelection: function () {
        this.$().parent().find('.poker-card-selected').removeClass('poker-card-selected');
        var points = this.get("controller.model.selectedCard");
        this.$().parent().find('.poker-card[points="' + points + '"]').addClass("poker-card-selected");
    }.observes("controller.model.selectedCard")
});

TPPoker.Application.SaveDurationChangeButton = Ember.View.extend({
	tagName:"button",
    click: function () {
        var duration = $("#durationValue").val();
        if (duration) {
            this.get("controller").setDuration(duration);
        }
        $("#timerModal").modal('hide');
    }
});
