
Ember.SortableItem = Ember.View.extend({

    attributeBindings: ["content.name"],
    classNames: ["ui-state-default"],

    tagName: "li",

	item: null,

    /** @private */
    init: function () {
        this._super();
    }

});
