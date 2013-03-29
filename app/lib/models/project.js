require('ember-tppoker/models/iteration');
require('ember-tppoker/models/release');

TPPoker.Application.Project = DS.Model.extend({
	name: DS.attr('string'),
	/*iterations: DS.hasMany('TPPoker.Application.Iteration'),*/
	iterations: Ember.computed(function() {
		return TPPoker.Application.Iteration.find({'Project.Id': [Ember.get(this, 'id')]})
	}),
	releases: Ember.computed(function() {
		return TPPoker.Application.Release.find({'Project.Id': [Ember.get(this, 'id')]})
	})
});
TPPoker.TargetProcessJSONPAdapter.map('TPPoker.Application.Project', {
	name: { key: 'Name' }
});