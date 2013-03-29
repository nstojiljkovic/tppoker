require('ember-tppoker/core');

TPPoker.Application.AppController = Ember.ObjectController.extend({
	/*
	 url: function() {
	 return this.get('content.url');
	 }.property('content.url')*/
});

TPPoker.Application.AppNewController = TPPoker.Application.AppController.extend({
	create: function() {
		var app = this.get('content');
		app.load(false, 1);
	}
});

TPPoker.Application.AppsController = Ember.ArrayController.extend({
	/*
	 longSongCount: function() {
	 var longSongs = this.filter(function(song) {
	 return song.get('duration') > 30;
	 });
	 return longSongs.get('length');
	 }.property('@each.duration')
	 */
});