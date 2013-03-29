/**
 @class

	 A radio button view that enables `Ember.RadioButtonGroup` membership and binding.

 See the {@link Ember.RadioButtonGroup} documentation for more information.

 @extends Ember.View
 */
Ember.RadioButton = Ember.View.extend(/** @scope Ember.RadioButton.prototype */ {

	attributeBindings: ["isDisabled:disabled", "type", "name", "value"],
	classNames       : ["ember-radio-button"],

	/**
	 Sets the disabled property on the element.

	 @default false
	 @type Boolean
	 */
	isDisabled: false,

	/**
	 Sets the checked property on the element.

	 @default false
	 @type Boolean
	 */
	isSelected: false,

	tagName: "input",
	type   : "radio",
	name   : Ember.computed(function () {
		return Ember.get(this, 'group.name');
	}).property('group'),

	/** @private */
	init: function () {
		this._super();
		this._groupDidChange();
	},

	/**
	 The group this radio button is associated with.

	 @default null
	 @type Ember.RadioButtonGroup
	 */
	group: null,

	/**
	 Before the group changes, notify the current group to remove us.

	 @private
	 */
	_groupWillChange: Ember.beforeObserver(function () {
		var group = Ember.get(this, "group");

		if (group) {
			group._removeRadioButton(this);
		}
	}, "group"),

	/**
	 After the group changes, notify the new group to add us.

	 @private
	 */
	_groupDidChange: Ember.observer(function () {
		var group = Ember.get(this, "group");

		if (group) {
			Ember.assert("group must be an instance of Ember.RadioButtonGroup", Ember.RadioButtonGroup.detectInstance(group));

			group._addRadioButton(this);
		}
	}, "group"),

	/**
	 Watch for changes in the `checked` property of the
	 element and update the `isSelected` property accordingly.

	 @private
	 */
	change: function () {
		Ember.run.once(this, this._elementCheckedDidChange);
	},

	/** @private */
	didInsertElement: function () {
		this._isSelectedDidChange();
	},

	/** @private */
	_elementCheckedDidChange: function () {
		Ember.set(this, "isSelected", this.$().is(":checked"));
	},

	/**
	 Watch for changes in the `isSelected` property,
	 and update the `checked` property on the element.

	 @private
	 */
	_isSelectedDidChange: Ember.observer(function () {
		if (this.$()) {
			this.$().prop("checked", Ember.get(this, "isSelected"));
		}
	}, "isSelected")
});