require('jquery');
require('jquery-ui');
require('bootstrap');
require('handlebars');
require('ember');
require('ember-data');
require('ember-tppoker/ext');
require('ember-tppoker/env');

// namespace
TPPoker = {};

TPPoker.Application = Ember.Application.create({
	LOG_TRANSITIONS: true,
	state: Ember.Object.create({
		app: null,
		project: 'null',
		release: 'null',
		iteration: 'null',
		query: ''
	})
});