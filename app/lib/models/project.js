TPPoker.Application.Project = DS.Model.extend({
	name: DS.attr('string')
	//,process: null
});
TPPoker.TargetProcessJSONPAdapter.map('TPPoker.Application.Project', {
	name: { key: 'Name' }
});