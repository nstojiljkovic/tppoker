TPPoker.Application.UserStory = DS.Model.extend({
    name: DS.attr('string'),
    project: DS.belongsTo('TPPoker.Application.Project'),
    description: DS.attr('string'),
    safe_description: Ember.computed(function () {
        if (this.get("description")) {
            var temp = this.get("description");
            if (temp.match(/src="([^">]+)/)){
                temp = temp.replace(temp.match(/src="([^">]+)/)[1],'https://extranet.aoemedia.de'+temp.match(/src="([^">]+)/)[1]);
            }
            return temp.htmlSafe();
        }
        return null;
    })
});
TPPoker.TargetProcessJSONPAdapter.map('TPPoker.Application.UserStory', {
    name: { key: 'Name' },
    project: { key: 'Project' },
    description: { key: 'Description' }
});

TPPoker.TargetProcessJSONPAdapter.configure("plurals", {
    user_story: "userstories"
});