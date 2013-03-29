TPPoker.Application.Iteration = DS.Model.extend({
	name: DS.attr('string'),
	project: DS.belongsTo('TPPoker.Application.Project')
});
TPPoker.TargetProcessJSONPAdapter.map('TPPoker.Application.Iteration', {
	name: { key: 'Name' },
	project: { key: 'Project' }
});