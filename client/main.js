//// ROUTING

Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function() {
    this.render('list', {to: "content"});
});

Router.route('/detail/:_id', function() {
    var itemID = Websites.findOne({_id: this.params._id});
    this.render('detail', {data: itemID, to: "content"});
});


//// COLLECTIONS
Websites = new Mongo.Collection("websites");




/////
// template helpers 
/////

// helper function that returns all available websites
Template.list.helpers({
	websites:function(){
		return Websites.find({}, {sort: {upVotes: -1}});
	}
});


/////
// template events 
/////

Template.website_item.events({
	"click .js-upvote":function(event){
		var website_id = this._id;

		// put the code in here to add a vote to a website!
                Websites.update(
                    {_id:   website_id},
                    {$inc:  {upVotes: 1}
                });

		return false;        // prevent the button from reloading the page
	}, 
	"click .js-downvote":function(event){
		var website_id = this._id;

		// put the code in here to remove a vote from a website!
                Websites.update(
                      {_id:   website_id},
                      {$inc:  {downVotes: 1} 
                    });

		return false;        // prevent the button from reloading the page
	}
})

Template.website_form.events({
	"click .js-toggle-website-form":function(event){
		$("#website_form").toggle('slow');
	}, 
	"submit .js-save-website-form":function(event, template){
		// saving new website
                Websites.insert({
                    title:       event.target.title.value,
                    url:         event.target.url.value,
                    description: event.target.description.value,
                    createdOn:   new Date(),
                    createdBy:   Meteor.user()._id,
                    upVotes:     0,
                    downVotes:   0,
                });

		template.find(".js-save-website-form").reset();
		return false;    // stop the form submit from reloading the page

	}
});


Template.detail.events({
        "submit .js-add-comment-form":function(event, template){
                var website_id = this._id;

                Websites.update(
                    {_id: website_id},
                    {$push: {comment: event.target.comment.value}}
                );

                template.find(".js-add-comment-form").reset();
                return false;    // stop the form submit from reloading the page

        }
});

