require('ember-tppoker/models/user_story');

TPPoker.Application.Iteration = DS.Model.extend({
	name: DS.attr('string'),
	project: DS.belongsTo('TPPoker.Application.Project'),
	userStories: Ember.computed(function() {
		return TPPoker.Application.UserStory.find({'Iteration.Id': [Ember.get(this, 'id')]})
	})
});
TPPoker.TargetProcessJSONPAdapter.map('TPPoker.Application.Iteration', {
	name: { key: 'Name' },
	project: { key: 'Project' }
});