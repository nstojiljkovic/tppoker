TPPoker.Application.Application = Ember.Object.extend({
	//standard properties
	url: '',
	version: '',
	teams: [],
	role: 'moderator', // 'developer',
	loading: false,
	loaded: false,
	lastLoadingError: '',
	load: function(force, retryCount, transitionTo) {
		if (this.get('apiUrl')=='') {
			this.set('lastLoadingError', 'no URL');
		} else if (force || !this.get('loading')) {
			TPPoker.TargetProcessJSONPAdapter.reopen({
				url: this.get('url').replace(/\/$/g,"")
			});

			this.set('loading', true);
			this.set('lastLoadingError', '');

			$.ajax({
				type: 'GET',
				crossDomain: true,
				url: this.get('apiUrl') + 'Context/?format=json',
				dataType: 'jsonp',
				context: this,
				jsonp: 'callback',
				timeout: 5000
			}).done(function(data) {
				this.set('lastLoadingError', '');
				this.set('version', data.Version);
				this.set('loaded', true);
				this.get('loading', false);
				if (transitionTo) {
					TPPoker.Application.Router.router.transitionTo(transitionTo);
				}
			}).fail(function(jqXHR, textStatus, errorThrown) {
				this.set('loading', false);
				if (textStatus=='timeout' && typeof retryCount != 'undefined' && retryCount > 0) {
					console.log('trying again.');
					this.load(true, --retryCount);
				} else {
					this.set('lastLoadingError', textStatus);
					console.log('fail');
				}
			}).always(function() {
			});
		}
	},
	apiUrl: function() {
		return this.get('url') ? (this.get('url').replace(/\/$/g,"") + "/api/v1/") : '';
	}.property('url'),
	isModerator: function() {
		return this.get('role')=='moderator';
	}.property('role'),
	isNotModerator: function() {
		return this.get('role')!='moderator';
	}.property('role'),
	urlChanged: function(key, value) {
		console.log(this.get('url'));
	}.observes('url'),
	roleChange: function(key, value) {
		console.log('Role changed to: ' + this.get('role'));
	}.observes('role')
});
