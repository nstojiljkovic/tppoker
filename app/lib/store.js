require('ember-tppoker/core');
require('ember-tppoker/adapters');

//TPPoker.Application.Store = DS.Store.extend({
//	revision: 12,
//	adapter: 'TPPoker.TargetProcessJSONPAdapter'
//});

TPPoker.Application.Store = DS.Store.extend({
	revision: 12,
	adapter : 'DS.FixtureAdapter'
});
