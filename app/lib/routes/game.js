TPPoker.Application.GameRoute = Ember.Route.extend({
	setupController: function (controller, model) {
		controller.set('content', model);
	},
	model          : function () {
		//		return TPPoker.Application.Game.create({});
		return TPPoker.Application.Game.createRecord({time_counter: 60, duration: 60, isModerator: true});
	}
});
