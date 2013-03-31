require('ember-tppoker/core');

TPPoker.Application.AppController = Ember.ObjectController.extend({
});

TPPoker.Application.AppNewController = TPPoker.Application.AppController.extend({
	error: '',
	/*
	error: function(key, value) {
		if (arguments.length === 1) {
			// getter
			return this.get('content.lastLoadingError');
		} else {
			// setter
			this.set('content.lastLoadingError', value);
			return value;
		}
	}.property('content.lastLoadingError'),
	*/
	create: function() {
		var app = this.get('content');
		this.set('error', '');
		app.set('lastLoadingError', '');
		if (app.get('isModerator')) {
			app.load(false, 1, 'wizard.project');
		} else {
			this.set('error', 'The selected option has not been implemented yet');
		}
	}
});