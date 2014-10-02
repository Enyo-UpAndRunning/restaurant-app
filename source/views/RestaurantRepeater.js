// This kind can bubble the _onEdit_ event when the Edit button is tapped
enyo.kind({
	name: 'restaurant.RestaurantRepeater',
	kind: 'enyo.DataRepeater',
	components: [{ kind: 'restaurant.RestaurantView' }]
});
