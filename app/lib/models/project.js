require('ember-tppoker/models/iteration');

TPPoker.Application.Project = DS.Model.extend({
	name: DS.attr('string'),
	/*iterations: DS.hasMany('TPPoker.Application.Iteration'),*/
	iterations: Ember.computed(function() {
		return TPPoker.Application.Iteration.find({'Project.Id': [Ember.get(this, 'id')]})
	})
});
TPPoker.TargetProcessJSONPAdapter.map('TPPoker.Application.Project', {
	name: { key: 'Name' }
});