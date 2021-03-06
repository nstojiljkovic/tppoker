/**
 @class A view for a group of radio buttons.

 ## Creating a RadioButtonGroup

 You can create radio buttons like this:

 #handlebars
 {{#view Ember.RadioButtonGroup name="someName"}}
 <label>
 {{view RadioButton value="option1"}}
 Option 1
 </label>
 <label>
 {{view RadioButton value="option2"}}
 </label>
 {{/view}}

 ## Getting/Setting the selected radio button

 #js
 // get a reference to the selected radio button
 group.get("selection");

 // select a different radio button
 group.set("selection", someRadioButton);
 // or set a button as selected
 someRadioButton.set("isSelected", true);

 // clear the selection
 group.set("selection", null);
 // or deselect the selected button
 selectedButton.set("isSelected", false);

 ## Getting/Setting the selected value

 #js
 // get the `value` property of the selected radio button
 // or `null` if no buttons are selected
 group.get("selectedValue");

 // select a different radio button by value
 group.set("selectedValue", someValue);

 ## Real world example

 #js
 window.App = Ember.Application.create();

 App.question = Ember.Object.create({
        content: "Which of the following is the largest?",
        possibleAnswers: [
          Ember.Object.create({ label: "A peanut"      value: "peanut"      }),
          Ember.Object.create({ label: "An elephant"   value: "elephant"    }),
          Ember.Object.create({ label: "The moon"      value: "moon"        }),
          Ember.Object.create({ label: "A tennis ball" value: "tennis ball" })
        ],
        selectedAnswer: null
      });

 App.questionView = Ember.View.create({
        templateName: "question",
        questionBinding: "App.question",
        group: Ember.RadioButtonGroup.create({
          // create a two-way binding so changes in the
          // view propogate to the `selectedAnswer` property
          // on the question object.
          selectedValueBinding: "App.question.selectedAnswer"
        })
      });

 App.questionView.append();

 The question template could look like this:

 <script type="text/x-handlebars" data-template-name="question">
 <h2>{{question.content}}</h2>
 {{#view Ember.RadioButtonGroup name="answer" selectedValueBinding="App.question.selectedAnswer"}}
 {{#each question.possibleAnswers}}
 <label>
 {{view RadioButton valueBinding="value"}}
 {{label}}
 </label>
 {{/each}}
 </script>

 @extends Ember.View
 */
Ember.RadioButtonGroup = Ember.View.extend(/** @scope Ember.RadioButtonGroup.prototype */ {

	/**
	 The number of radio buttons that belong to this group.

	 @default 0
	 @field
	 @type Number
	 */

	classNames       : ['ember-radio-button-group'],
	attributeBindings: ['name:data-name'],

	numRadioButtons: Ember.computed(function () {
		return Ember.get(this, "_radioButtons.length");
	}).property("_radioButtons.length").cacheable(),

	name: Ember.required(),

	/**
	 After the name changes, update global radio button group instance

	 @private
	 */
	_nameDidChange: Ember.observer(function () {
		Ember['RadioButtonGroup_'+this.get('name')] = this;
	}, "name"),

	/*
	 RadioButton: Ember.computed(function () {
	 return Ember.RadioButton.extend({
	 group: this
	 });
	 }),
	 */

	_selectedValue: null,

	/**
	 Contains a reference to the `value` property of the currently
	 selected RadioButton control in the group.

	 Setting `selectedValue` to the value of a radio button in the
	 group will change the `selection` to that button.

	 @field
	 @default null
	 */
	selectedValue: Ember.computed(function (key, value) {
		// getter
		if (arguments.length === 1) {
			var currentSelection = Ember.get(this, "selection");

			return currentSelection ? currentSelection.get("value") : null;
			// setter
		} else {
			if (!Ember.isNone(value)) {
				if (Ember.get(this, "_radioButtons") && this.buttonForValue(value)) {
					this._selectedValue = null;

					var buttonForValue = this.buttonForValue(value);

					Ember.assert(Ember.String.fmt("%@ - selectedValue can only be set to the value of a radio button in the group. You passed %@", [this, value]), !!buttonForValue);

					Ember.set(this, "selection", buttonForValue);
				} else {
					this._selectedValue = value;
				}
				return value;
			}
		}
	}).property("selection").cacheable(),

	buttonForValue: function (value) {
		return Ember.get(this, "_radioButtons").findProperty("value", value);
	},

	_selection: null,

	/**
	 Contains a reference to the currently selected RadioButton control in the group.

	 @field
	 @default null
	 @type Ember.RadioButton
	 */
	selection: Ember.computed(function (key, value) {
		// getter
		if (arguments.length === 1) {
			return Ember.get(this, "_selection");

			// setter
		} else {
			var radioButtons = Ember.get(this, "_radioButtons");

			Ember.assert(Ember.String.fmt("%@ - selection accepts null or an Ember.RadioButton. You passed %@", [this, value]), function () {
				var isRadioButton = Ember.RadioButton.detectInstance(value), isValidArgument = Ember.isNone(value) || isRadioButton;

				return isValidArgument;
			});

			Ember.assert(Ember.String.fmt("%@ - cannot set selection to %@ because it's not in the group", [this, value]), function () {
				var isRadioButton = Ember.RadioButton.detectInstance(value), isGroupMember = radioButtons.contains(value);

				if (isRadioButton) {
					return isGroupMember;
				}

				// If it wasn't a radio button then it was handled by the previous assertion.
				return true;
			});

			// Notify the current selection, if any, that it has been deselected.
			// However, if the current selection just left the group we won't
			// modify the isSelected property on it.
			var currentSelection = Ember.get(this, "_selection"), currentSelectionDidLeaveGroup = !radioButtons.contains(currentSelection);
			if (currentSelection && !currentSelectionDidLeaveGroup) {
				Ember.set(currentSelection, "isSelected", false);
			}

			// Notify the new selection, if any, that it has been selected.
			if (value) {
				Ember.set(value, "isSelected", true);
			}

			Ember.set(this, "_selection", value);

			return value;
		}
	}).property("_selection").cacheable(),

	/** @private */
	init: function () {
		this._super();
		this._nameDidChange();
		Ember.set(this, "_radioButtons", Ember.A());
	},

	/**
	 Adds an {Ember.RadioButton} to the group.

	 You should not really call this function directly. Instead use
	 the `group` property on {@link Ember.RadioButton}.

	 @param {Ember.RadioButton} radioButton The radio button to add.
	 @private
	 */
	_addRadioButton: function (radioButton) {
		Ember.get(this, "_radioButtons").pushObject(radioButton);

		Ember.addObserver(radioButton, "isSelected", this, this._isSelectedDidChange);

		// If the button is selected, it becomes the new selection.
		if (Ember.get(radioButton, "isSelected")) {
			Ember.set(this, "selection", radioButton);
		}

		if (this._selectedValue) {
			this.set('selectedValue', this._selectedValue);
		}
	},

	/**
	 Removes a radio button from the group.

	 You should not really call this function directly. Instead use
	 the `group` property on {@link Ember.RadioButton}.

	 @param {Ember.RadioButton} radioButton The radio button to remove.
	 @private
	 */
	_removeRadioButton: function (radioButton) {
		var radioButtons = Ember.get(this, "_radioButtons"), isSelection = Ember.get(this, "selection") === radioButton;

		radioButtons.removeObject(radioButton);

		Ember.removeObserver(radioButton, "isSelected", this, this._isSelectedDidChange);

		// Clear the selection if it was just removed.
		if (isSelection) {
			Ember.set(this, "selection", null);
		}
	},

	/**
	 Watch for changes to the `isSelected` property on radio buttons
	 in this group and update the `selection` property accordingly.

	 @private
	 */
	_isSelectedDidChange: function (radioButton, keyName, value) {
		var isSelected = Ember.get(radioButton, "isSelected"), isSelection = Ember.get(this, "selection") === radioButton;

		// If the button is now selected, it becomes the new selection.
		if (isSelected) {
			Ember.set(this, "selection", radioButton);
		}
		// If the button is now deselected, but was the selection,
		// we must clear the selection.
		else if (isSelection) {
			Ember.set(this, "selection", null);
		}
	}
});