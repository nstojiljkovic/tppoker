TPPoker.Application.WizardRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		controller.set('content', model);
	},
	redirect: function() {
		var app = TPPoker.Application.state.get('app');
		if (app==null || !app.get('loaded')) {
			this.transitionTo('app.new');
		}
	}
});

TPPoker.Application.WizardProjectRoute = TPPoker.Application.WizardRoute.extend({
	model: function(params) {
		var app = TPPoker.Application.state.get('app');
		if (app==null || !app.get('loaded')) {
			return null;
		} else {
			var ProjectsModel = Ember.Object.extend({
				projects: TPPoker.Application.Project.find(),
				nullProject: 'null',
				isLoaded: function() {
					var isLoaded = this.get('projects').filterProperty('isLoaded', true).get('length') > 0;
					return isLoaded;
				}.property('projects.@each.isLoaded'),
				isNotLoaded: function() {
					return !this.get('isLoaded');
				}.property('isLoaded')
			});
			return ProjectsModel.create({});
		}
	}
});

TPPoker.Application.WizardReleaseRoute = TPPoker.Application.WizardRoute.extend({
	model: function(params) {
		var app = TPPoker.Application.state.get('app');
		if (app==null || !app.get('loaded')) {
			return null;
		} else {
			var ReleaseModel = Ember.Object.extend({
				releases: TPPoker.Application.state.get('project.releases'),
				nullRelease: 'null',
				isLoaded: function() {
					var isLoaded = this.get('releases').filterProperty('isLoaded', true).get('length') > 0;
					return isLoaded;
				}.property('releases.@each.isLoaded'),
				isNotLoaded: function() {
					return !this.get('isLoaded');
				}.property('isLoaded')
			});
			return ReleaseModel.create({});
		}
	}
});

TPPoker.Application.WizardIterationRoute = TPPoker.Application.WizardRoute.extend({
	model: function(params) {
		var app = TPPoker.Application.state.get('app');
		if (app==null || !app.get('loaded')) {
			return null;
		} else {
			var IterationModel = Ember.Object.extend({
				iterations: TPPoker.Application.state.get('release.iterations'),
				nullRelease: 'null',
				isLoaded: function() {
					var isLoaded = this.get('iterations').filterProperty('isLoaded', true).get('length') > 0;
					return isLoaded;
				}.property('iterations.@each.isLoaded'),
				isNotLoaded: function() {
					return !this.get('isLoaded');
				}.property('isLoaded')
			});
			return IterationModel.create({});
		}
	}
});


TPPoker.Application.WizardQueryRoute = TPPoker.Application.WizardRoute.extend({
	model: function(params) {
		var queryArr = [];

		if (typeof TPPoker.Application.state.get('project') == 'object') {
			queryArr.push('(Project.Id eq \'' + TPPoker.Application.state.get('project.id') + '\')');
		}

		if (typeof TPPoker.Application.state.get('release') == 'object') {
			queryArr.push('(Release.Id eq \'' + TPPoker.Application.state.get('release.id') + '\')');
		}

		if (typeof TPPoker.Application.state.get('iteration') == 'object') {
			queryArr.push('(Iteration.Id eq \'' + TPPoker.Application.state.get('iteration.id') + '\')');
		}

		queryArr.push('(EntityState.Name ne \'Done\')');

		queryArr.push('(Effort eq \'0\')');

		var QueryModel = Ember.Object.extend({
			queryBinding: 'TPPoker.Application.state.query',
			userStories: function(key, value) {
				return TPPoker.Application.UserStory.find({q: this.get('query')});
				/*
				if (arguments.length === 1) {
					// getter
					return this.get('content.lastLoadingError');
				} else {
					// setter
					this.set('content.lastLoadingError', value);
					return value;
				}*/
			}.property('query')
		});
		var model = QueryModel.create({});
		model.set('query', queryArr.join(' and '));

		return model;
		/*
		if (app==null || !app.get('loaded')) {
			return null;
		} else {
			var IterationModel = Ember.Object.extend({
				iterations: TPPoker.Application.state.get('release.iterations'),
				nullRelease: 'null',
				isLoaded: function() {
					var isLoaded = this.get('iterations').filterProperty('isLoaded', true).get('length') > 0;
					return isLoaded;
				}.property('iterations.@each.isLoaded'),
				isNotLoaded: function() {
					return !this.get('isLoaded');
				}.property('isLoaded')
			});
			return IterationModel.create({});
		}
		*/
	}
});