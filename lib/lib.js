Websites = new Mongo.Collection("websites");
PlayersIndex = new EasySearch.Index({
    collection: Websites,
    fields: ['title', 'url', 'description'],
    engine: new EasySearch.Minimongo({
	sort: function() { 
	    return {upVotes: -1}; 
	}
    })
});

