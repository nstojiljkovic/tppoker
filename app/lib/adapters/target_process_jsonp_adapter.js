var get = Ember.get, set = Ember.set, map = Ember.EnumerableUtils.map;

TPPoker.TargetProcessJSONPAdapter = DS.Adapter.extend({
	namespace: 'api/v1',
	url: '',
	debug: true,
	timeout: 30000,
	enableMultiQueueing: true,
	ajaxQueue: [],
	ajaxQueueInProcess: [],

	_cleanTPJSON: function (data) {
		for (var i = 0; i < data.Items.length; i++) {
			data.Items[i]['id'] = data.Items[i]['Id'];
			for(var prop in data.Items[i]){
				if (typeof data.Items[i][prop] == "object" && data.Items[i][prop] != null && (typeof data.Items[i][prop]['Id'] == "number" || typeof data.Items[i][prop]['Id'] == "string")) {
					data.Items[i][prop] = data.Items[i][prop]['Id'];
				}
			}
		}

		return data;
	},

	shouldSave: function(record) {
		var reference = get(record, '_reference');

		return !reference.parent;
	},

	createRecord: function(store, type, record) {
		// @todo: implement me
		this.log('createRecord');
	},

	createRecords: function(store, type, records) {
		// @todo: implement me
		this.log('createRecords');
	},

	updateRecord: function(store, type, record) {
		// @todo: implement me
		this.log('updateRecord');
	},

	updateRecords: function(store, type, records) {
		// @todo: implement me
		this.log('updateRecords');
	},

	deleteRecord: function(store, type, record) {
		// @todo: implement me
		this.log('deleteRecord');
	},

	deleteRecords: function(store, type, records) {
		// @todo: implement me
		this.log('deleteRecords');
	},

	find: function(store, type, id) {
		var root = this.rootForType(type), plural = this.pluralize(root);

		this.queueAjax(root, function(){
			this.ajax({
				type: 'GET',
				crossDomain: true,
				url: this.buildURL(root, 'where=Id eq ' + id),
				queueName: root,
				dataType: 'jsonp',
				context: this,
				jsonp: 'callback',
				timeout: this.timeout
			}).done(function(data) {
				var json = {};
				json[plural] = this._cleanTPJSON(data).Items[0];
				this.didFindRecord(store, type, json, id);
			});
		});
	},

	findAll: function(store, type, since) {
		var root = this.rootForType(type), plural = this.pluralize(root);

		this.queueAjax(root, function(){
			this.ajax({
				type: 'GET',
				crossDomain: true,
				url: this.buildURL(root),
				queueName: root,
				dataType: 'jsonp',
				context: this,
				jsonp: 'callback',
				timeout: this.timeout
			}).done(function(data) {
				var payload = {};
				payload[plural] = this._cleanTPJSON(data).Items;
				this.didFindAll(store, type, payload);
			})
		});
	},

	findQuery: function(store, type, query, recordArray) {
		var root = this.rootForType(type), plural = this.pluralize(root);
		var queryArr = [];
		for (var prop in query) {
			if (prop == 'q') {
				queryArr.push(query[prop].toString());
			} else {
				var valuesArr = [];
				if (typeof query[prop] == "object") {
					for (var i = 0; i < query[prop].length; i++) {
						valuesArr.push('\'' + query[prop][i].toString().replace('\'', '\\\'') + '\'');
					}
				} else {
					valuesArr.push('\'' + query[prop].toString().replace('\'', '\\\'') + '\'');
				}
				queryArr.push(prop + ' in (' + valuesArr.join(',') + ')');
			}
		}

		this.queueAjax(root, function(){
			this.ajax({
				type: 'GET',
				crossDomain: true,
				url: this.buildURL(root, 'where=' + queryArr.join(' and ')),
				queueName: root,
				dataType: 'jsonp',
				context: this,
				jsonp: 'callback',
				timeout: this.timeout
			}).done(function(data) {
				var json = {};
				json[plural] = this._cleanTPJSON(data).Items;
				this.didFindQuery(store, type, json, recordArray);
			});
		});
	},

	findMany: function(store, type, ids, owner) {
		var root = this.rootForType(type), plural = this.pluralize(root);

		this.queueAjax(root, function(){
			this.ajax({
				type: 'GET',
				crossDomain: true,
				url: this.buildURL(root, 'where=Id in (' + ids.join(',') + ')'),
				queueName: root,
				dataType: 'jsonp',
				context: this,
				jsonp: 'callback',
				timeout: this.timeout
			}).done(function(data) {
				var json = {};
				json[plural] = this._cleanTPJSON(data).Items;
				this.didFindMany(store, type, json);
			});
		});
	},

	findHasMany: function(store, record, relationship, data) {
		var root = this.rootForType(relationship.type),
			plural = this.pluralize(root),
			parentRoot = this.rootForType(relationship.parentType),
			parentPlural = this.pluralize(parentRoot);

		this.queueAjax(root, function(){
			this.ajax({
				type: 'GET',
				crossDomain: true,
				url: this.buildURL(root, 'where=' + Ember.String.capitalize(parentRoot) + '.Id in (' + record.get('id') + ')'),
				queueName: root,
				dataType: 'jsonp',
				context: this,
				jsonp: 'callback',
				timeout: this.timeout
			}).done(function(data) {
				var json = {};
				json[plural] = this._cleanTPJSON(data).Items;
				this.didFindMany(store, relationship.type, json);
				store.commit();
				// Coerce server IDs into Record Reference
				var references = map(json[plural], function(reference) {
					if (typeof reference === 'object' && typeof reference['id'] !== 'object' && reference['id'] !== null) {
						return store.referenceForId(relationship.type, reference['id']);
					}
					return reference;
				}, this);

				Ember.run.once({items: record.get(relationship.key), data: references, type: relationship.type}, function() {
					for (var i = 0; i < this.data.length; i++) {
						this.items.addReference(store.referenceForId(relationship.type, this.data[i]['id']));
					}
				});
			});
		});
	},

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
			url.push('?format=json&take=99999&' + suffix);
		} else {
			url.push('?format=json&take=99999');
		}

		return result = url.join("/");
	},

	queueAjax: function(queueName, method) {
		if (this.enableMultiQueueing) {
			method.apply(this); 
		} else {
			if (!this.ajaxQueue[queueName]) {
				this.ajaxQueue[queueName] = [];
				this.ajaxQueueInProcess[queueName] = false;
			}

			if (method) {
				this.ajaxQueue[queueName].push(method);
			}

			this.runAjaxQueue(queueName);
		}
	},

	runAjaxQueue: function(queueName, force) {
		if (force === true || this.ajaxQueueInProcess[queueName] === false) {
			this.ajaxQueueInProcess[queueName] = true;
			try {
				var method = this.ajaxQueue[queueName].shift();
				method.apply(this);
			} catch (e) {
				this.ajaxQueueInProcess[queueName] = false;
			}
		}
	},

	ajax: function(options) {
		this.log('querying url: ' + options.url);

		return jQuery
			.ajax(options)
			.fail(function(jqXHR, textStatus, errorThrown) {
				this.log('fail');
			}).always(function() {
				if (options.queueName) {
					this.runAjaxQueue(options.queueName, true);
				}
			});
	},

	log: function(str) {
		if (this.debug) {
			console.log(str);
		}
	}
});