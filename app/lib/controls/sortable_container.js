/**
 @class

     Sortable (jQuery UI Sortable) list.

 @extends Ember.View
 */
Ember.SortableContainer =  Ember.View.extend({

    classNames: ["sortable"],
    tagName: "ul",

	collection: null,
	initializedSortable: false,

	didInsertElement: function () {
		this._super();

		Ember.run.schedule('render', this, function() {
			this._initSortable();
		});
	},

	_initSortable: function() {
		if (this.initializedSortable) {
			this.$().sortable("destroy");
		}
		this.initializedSortable = true;
		this.$().sortable({
			update: jQuery.proxy(function( event, ui ) {
				var newOrder = this.$().sortable("toArray");
				var collection = Ember.A([]);
				for (var i = 0; i < newOrder.length; i++) {
					for (var j = 0; j < this.get('childViews').length; j++) {
						var childView = this.get('childViews')[j];
						if (newOrder[i] == childView.$().attr('id') &&
						    childView.constructor == Ember.SortableItem) {
							var item = this.get('childViews')[j].get('item');
							collection.push(item);
						}
					}
				}
				this.set('collection', collection);
				this._initSortable();
			}, this)
		});
	},

	willDestroyElement: function() {
		this._super();
	},

	init: function() {
		this._super();
	}
});
