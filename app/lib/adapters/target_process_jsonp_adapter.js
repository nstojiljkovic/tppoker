var get = Ember.get, set = Ember.set, merge = Ember.merge;

TPPoker.TargetProcessJSONPAdapter = DS.BasicAdapter.extend({
	namespace: 'api/v1',
	url: '',
	findAll: function(store, type, since) {
		var root = this.rootForType(type), plural = this.pluralize(root);

		$.ajax({
			type: 'GET',
			crossDomain: true,
			url: this.buildURL(root),
			dataType: 'jsonp',
			context: this,
			jsonp: 'callback',
			timeout: 5000
		}).done(function(data) {
				for (var i = 0; i < data.Items.length; i++) {
					data.Items[i]['id'] = data.Items[i]['Id'];
				}
				var payload = {}
				payload[plural] = data.Items;
				this.didFindAll(store, type, payload);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log('fail');
			}).always(function() {
				console.log('always');
			});
	},

	url: "",

	rootForType: function(type) {
		var serializer = get(this, 'serializer');
		return serializer.rootForType(type);
	},

	pluralize: function(string) {
		var serializer = get(this, 'serializer');
		return serializer.pluralize(string);
	},

	buildURL: function(record, suffix) {
		var url = [this.url];

		Ember.assert("Namespace URL (" + this.namespace + ") must not start with slash", !this.namespace || this.namespace.toString().charAt(0) !== "/");
		Ember.assert("Record URL (" + record + ") must not start with slash", !record || record.toString().charAt(0) !== "/");
		Ember.assert("URL suffix (" + suffix + ") must not start with slash", !suffix || suffix.toString().charAt(0) !== "/");

		if (this.namespace !== undefined) {
			url.push(this.namespace);
		}

		url.push(this.pluralize(record));

		if (suffix !== undefined) {
			url.push(suffix);
		}

		url.push('?format=json')

		return url.join("/");
	}
});