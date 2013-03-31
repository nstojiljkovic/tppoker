require('ember-tppoker/core');

TPPoker.Application.WizardView = Ember.View.extend({
	templateName: 'ember-tppoker/~templates/wizard'
});

TPPoker.Application.WizardProjectView = Ember.View.extend({
	templateName: 'ember-tppoker/~templates/wizard/project'
});

TPPoker.Application.WizardReleaseView = Ember.View.extend({
	templateName: 'ember-tppoker/~templates/wizard/release'
});

TPPoker.Application.WizardIterationView = Ember.View.extend({
	templateName: 'ember-tppoker/~templates/wizard/iteration'
});

TPPoker.Application.WizardQueryView = Ember.View.extend({
	templateName: 'ember-tppoker/~templates/wizard/query'
});
