TPPoker.Application.Store = DS.Store.extend({
	revision: 12,
	adapter : 'DS.FixtureAdapter'
});


TPPoker.Application.Card = DS.Model.extend({
	points: DS.attr("number"),
	name  : DS.attr("string")
});

TPPoker.Application.Card.FIXTURES = [
	{
		id    : 1,
		points: 1,
		name  : "pera"
	},
	{
		id    : 2,
		points: 2,
		name  : "mika"
	},
	{
		id    : 3,
		points: 3,
		name  : "laza"
	}
];

TPPoker.Application.UserStory.FIXTURES = [
	{
		id         : 1,
		description: "description",
		name       : "Name"
	},
    {
		id         : 2,
		description: "description",
		name       : "Name"
	},
    {
		id         : 3,
		description: "description",
		name       : "Name"
	},
    {
		id         : 4,
		description: "description",
		name       : "Name"
	}
]


TPPoker.Application.Game = DS.Model.extend({
	time_counter      : DS.attr("number"),
	duration          : DS.attr("number"),
	isModeratorBinding: DS.attr("boolean", {defaultValue: true}),
	calculated_points : DS.attr("number", {defaultValue: 4}),
	cards             : Ember.A([
		{points: 0.5},
		{points: 1},
		{points: 2},
		{points: 3},
		{points: 5},
		{points: 8},
		{points: 20},
		{points: 40},
		{points: 100}
	]),
	stories           : Ember.computed(function () {
		return DS.Model.createRecord({
			list: TPPoker.Application.UserStory.find()
		})
	}),
	history           : Ember.computed(function () {
		return DS.Model.createRecord({
			list: Ember.A([])
		})
	}),
	skipped           : Ember.computed(function () {
		return DS.Model.createRecord({
			list: Ember.A([])
		})
	}),

	selectedCard : DS.attr("number"),
	selectedCards: Ember.computed(function () {
		return DS.Model.createRecord({
			list: TPPoker.Application.Card.find()
		})
	}),

	clearSelectedCards: function () {
		this.set("selectedCards.list", Ember.A([]));
		this.set("selectedCard", 0);
	},

	_selectedCardsListChanged: function () {
		//		this.set("calculated_points", this.get("selectedCards").calculatePoints(this.get("cards")));
		this.set("calculated_points", 4);
	}.observes("selectedCards.list")
});

/************This is old modal that works but its commented out so we could work only on game page with fixtures************/

//
//TPPoker.Application.Game = Ember.Object.extend({
//	time_counter     : 60,
//	duration         : 60,
//	isModerator      : true, //isModeratorBinding: TPPoker.Application.state.get("app.isModerator")
//	calculated_points: 0,
//	cards            : Ember.A([
//		{points: 0.5},
//		{points: 1},
//		{points: 2},
//		{points: 3},
//		{points: 5},
//		{points: 8},
//		{points: 20},
//		{points: 40},
//		{points: 100}
//	]),
//
//	/*	 Stories	 */
//
//	stories      : TPPoker.Application.GenericList.create({
//		listBinding: "TPPoker.Application.state.app.userStories"
//	}),
//	history      : TPPoker.Application.GenericList.create({
//		list: Ember.A(([])) // has to be set or it will just be a reference to a previously made Array
//	}),
//	skipped      : TPPoker.Application.GenericList.create({
//		list: Ember.A(([])) // has to be set or it will just be a reference to a previously made Array
//	}),
//
//
//	/* 	 Cards	 */
//
//	// @todo should notify the server about the selection (DS.Model...)
//	selectedCard : -1,
//	selectedCards: TPPoker.Application.GroupedCardList.create({
//		list: Ember.A(([])) // has to be set or it will just be a reference to a previously made Array
//	}),
//
//	clearSelectedCards: function () {
//		this.get("selectedCards").clearCards();
//		this.set("selectedCard", 0);
//	},
//
//	_selectedCardsListChanged: function () {
//		this.set("calculated_points", this.get("selectedCards").calculatePoints(this.get("cards")));
//	}.observes("selectedCards.list")
//});
