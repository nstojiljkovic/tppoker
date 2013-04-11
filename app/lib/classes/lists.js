// @todo create a factory for these lists (list: Ember.A([]) is annoying)

TPPoker.Application.GenericList = Ember.Object.extend({
	list: Ember.A([]),
	shift: function () {
		if (this.get('list')) {
			return this.get('list').shiftObject();
		} else {
			throw new Error('This list was never set');
		}
	},
	push: function (story) {
		if (story && this.get('list')) {
			this.get('list').pushObject(story);
		}
	},
	clear: function () {
		this.set("list", Ember.A([]));
	}
});

TPPoker.Application.CardList = TPPoker.Application.GenericList.extend({
	points: null
});

TPPoker.Application.GroupedCardList = Ember.Object.extend({
	list: Ember.A([]),
	pushCard: function (card) {
		if (card && card.points) {
			var points = card.points;

			var matchedCardList = this.get("list").find(function (item) {
				return (Ember.isEqual(item.get("points"), points));
			});

			if (!matchedCardList) {
				matchedCardList = TPPoker.Application.CardList.create({
					points: points,
					list: Ember.A([])
				});

				this._addCardList(matchedCardList);
			}
			matchedCardList.push(card);
			this._sortCardList();
		}
	},

	_addCardList: function (cardList) {
		this.get("list").pushObject(cardList);
	},

	_sortCardList: function () {
		// @todo sort list by lengths of lists in elements
		// this notification exists to simulate a change in the list
		this.notifyPropertyChange("list");
	},

	clearCards: function () {
		this.set("list", Ember.A([]));
	},

	calculatePoints: function (cards) {

		if (!this.get("list").length) {
			return 0;
		}

		var value = 0;
		var totalLength = 0;
		var list = this.get("list");
		for (var i = 0; i < list.length; i++) {
			var object = list.objectAt(i);
			value += object.get("list").length * parseInt(object.get("points"));
			totalLength += object.get("list").length;
		}
		var calculatedValue = value / totalLength;
		var index = 0;
		while (calculatedValue > cards.objectAt(index).points) {
			index++;
		}

		var min = cards.objectAt(index - 1).points;
		var max = cards.objectAt(index).points;

		return (min + ((max - min) * 0.4)) > calculatedValue ? min : max;

	}

});
