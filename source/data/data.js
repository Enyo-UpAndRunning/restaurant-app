/**
	For simple applications, you might define all of your models, collections,
	and sources in this file.  For more complex applications, you might choose to separate
	these kind definitions into multiple files under this folder.
*/

enyo.kind({
	name: 'restaurant.RestaurantModel',
	kind: 'enyo.Model',
	source: 'localData',
	url: 'RestaurantList',
	options: {
		commit: true,
	},
	attributes: {
		name: '',
		cuisine: 'Unknown',
		specialty: '',
		rating: 0
	},
	computed: [
		{ method: 'starRating', path: 'rating' }
	],
	starRating: function() {
		var rating = this.get('rating');
		return rating + ' star' + ((rating == 1) ? '' : 's');
	}
});

enyo.kind({
	name: 'restaurant.RestaurantCollection',
	kind: 'enyo.Collection',
	model: 'restaurant.RestaurantModel',
	source: 'localData',
	url: 'RestaurantList',
	options: {
		commit: true,
		fetch: true
	}
});
