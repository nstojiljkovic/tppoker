require('ember-tppoker/core');

TPPoker.Application.GameController = Ember.ObjectController.extend({
	reEstimate: function () {
		//@todo clear point selection for all users
		this.get("model").clearSelectedCards();
	},
	agree     : function () {
		//		var story = this.get('content.stories').shift();
		//		var points = this.get('content.calculated_points');
		//		this.get('content.history').push(story);
		//		this.get('content.selectedCards').clearCards();

		var story = this.get('content.stories.list').popObject();
		var points = this.get('content.calculated_points');
		story.points = points;
		this.get('content.history.list').pushObject(story);

	},
	skip      : function () {
		//		var story = this.get('content.stories').shift();
		//		this.get('content.skipped').push(story);
		//		this.get('content.selectedCards').clearCards();

		var story = this.get('content.stories.list').popObject();
		this.get('content.skipped.list').pushObject(story);
	},

	setDuration: function (duration) {
		this.set("content.duration", duration);
		this.set("content.time_counter", duration);

	},


	test: function () {
		//        var card = Ember.Object.create({points: 3, name: "djoka"});
		//        this.get("content.selectedCards").pushStory(card);

		this.get("model.selectedCards.list").pushObjects(TPPoker.Application.Card.find().toArray())
	}

});
