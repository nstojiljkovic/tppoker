TPPoker.Application.UserStory = DS.Model.extend({
	name: DS.attr('string'),
	project: DS.belongsTo('TPPoker.Application.Project')
});
TPPoker.TargetProcessJSONPAdapter.map('TPPoker.Application.UserStory', {
	name: { key: 'Name' },
	project: { key: 'Project' }
});

TPPoker.TargetProcessJSONPAdapter.configure("plurals", {
	user_story: "userstories"
});