require('ember-tppoker/models/iteration');

TPPoker.Application.Release = DS.Model.extend({
	name: DS.attr('string'),
	project: DS.belongsTo('TPPoker.Application.Project'),
	iterations: Ember.computed(function() {
		return TPPoker.Application.Iteration.find({'Release.Id': [Ember.get(this, 'id')]})
	})
});
TPPoker.TargetProcessJSONPAdapter.map('TPPoker.Application.Release', {
	name: { key: 'Name' },
	project: { key: 'Project' }
});