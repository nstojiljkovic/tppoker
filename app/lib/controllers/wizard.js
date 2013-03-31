require('ember-tppoker/core');

TPPoker.Application.WizardController = Ember.ObjectController.extend({
});

TPPoker.Application.WizardProjectController = TPPoker.Application.AppController.extend({
	select: function() {
		var selectedProject = TPPoker.Application.state.project;
		if (typeof selectedProject === 'object') {
			TPPoker.Application.Router.router.transitionTo('wizard.release');
		} else {
			// @todo: transition to query window
			console.log('@todo: transition to query window');
			TPPoker.Application.Router.router.transitionTo('wizard.query');
		}
	}
});

TPPoker.Application.WizardReleaseController = TPPoker.Application.AppController.extend({
	select: function() {
		var selectedRelease = TPPoker.Application.state.release;
		if (typeof selectedRelease === 'object') {
			TPPoker.Application.Router.router.transitionTo('wizard.iteration');
		} else {
			// @todo: transition to query window
			console.log('@todo: transition to query window');
			TPPoker.Application.Router.router.transitionTo('wizard.query');
		}
	}
});

TPPoker.Application.WizardIterationController = TPPoker.Application.AppController.extend({
	select: function() {
		TPPoker.Application.Router.router.transitionTo('wizard.query');
	}
});