
Ember.SortableItem = Ember.View.extend({

    attributeBindings: ["content.name"],
    classNames: ["ui-state-default", "sortable-item"],

    tagName: "li",

	item: null,

    /** @private */
    init: function () {
        this._super();
    }

});
