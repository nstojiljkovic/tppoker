/**
 @class

	 Sortable (jQuery UI Sortable) list.

 @extends Ember.View
 */
Ember.SortableContainer = Ember.View.extend({

	classNames: ["sortable"],
	tagName   : "ul",

	collection         : null,
	initializedSortable: false,

	didInsertElement: function () {
		this._super();

		Ember.run.schedule('render', this, function () {
			this._initSortable();
		});
	},

	_initSortable: function () {
		if (this.initializedSortable) {
			this.$().sortable("destroy");
		}
		this.initializedSortable = true;
		var sortable = this.$().sortable({
			update: jQuery.proxy(function (event, ui) {
				var newIndex = this.$().find('.sortable-item').index(ui.item);
				this.$().sortable('cancel');
				var oldIndex = this.$().find('.sortable-item').index(ui.item);
				this._moveCollectionElement(oldIndex, newIndex);
				this._initSortable();
			}, this)
		});
	},

	_moveCollectionElement: function (from, to) {
		var fromElem = this.get('collection').objectAt(from);
		this.get('collection').removeAt(from);
		this.get('collection').insertAt(to, fromElem);
	},

	willDestroyElement: function () {
		this._super();
	},

	init: function () {
		this._super();
	}
});
