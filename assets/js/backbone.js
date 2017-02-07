//Model
	var ArticleModel = Backbone.Model.extend({
		defaults: {
			title: '',
			description: '',
			url: '',
			likes: 0,
			views: 0,
			image_src: '',
		},
		
		like: function(){
			this.save({likes: this.get('likes') + 1});
		},
		
		initialize: function(){
			console.log("A new model has been created!")
		}
	});
	
	var Atlantic = new ArticleModel({
		title: "It's Putin's World",
		description: "How the Russian president became the ideological hero of nationalists everywhere",
		url: "https://www.theatlantic.com/magazine/archive/2017/03/its-putins-world/513848/",
		image_src: "https://cdn.theatlantic.com/assets/media/img/2017/01/Authoritarianism_DEF_web/lead_960.jpg?1485884893"
	});
	
	var CNN = new ArticleModel({
		title: "This Apex Predator Needs a Roaring Comeback",
		description: "The African lion is an apex predator that plays an important role in its native ecosystem by controlling herbivore populations. But being at the top of the food chain doesn't protect this feline from threats. Over the past few decades, a combination of trophy hunting and habitat loss has consistently reduced its population. Can this big cat make a roaring comeback?",
		url: "http://www.greatbigstory.com/stories/on-the-brink-african-lion/?xrs=CNNHP",
		image_src: "http://i2.cdn.cnn.com/cnnnext/dam/assets/170131184329-gbs-african-lion-large-tease.jpg"
	});
	
	var WSJ = new ArticleModel({
		title: "U.S. Auto Sales Cooled in January",
		description: "GM, Ford and Fiat Chrysler all post declines in January auto sales",
		url: "https://www.wsj.com/articles/u-s-auto-sales-cool-in-january-1485959412",
		image_src: "https://si.wsj.net/public/resources/images/BN-RX310_2WiHP_Z120_20170201091438.jpg"
	});
	
	//Collection
	var ArticleCollectionMold = Backbone.Collection.extend({model:ArticleModel});
	var ArticleCollection = new ArticleCollectionMold();
	ArticleCollection.add(Atlantic);
	ArticleCollection.add(CNN);
	ArticleCollection.add(WSJ);
	
	//Child View
	var ArticleChildView = Backbone.View.extend({
		tagName: 'li',
		className: 'article',
		template: _.template($('#article-template').html()),
		render: function () {
			template = this.$el.html(this.template(this.model.attributes));
			return template;
		},
		events: {
			'click .media a': 'addView',
			'click .media .glyphicon-menu-up': 'addLike',
			'click .delete': 'deleteArticle',
		},
		addView: function(e){
			e.preventDefault();
			this.model.set({views:this.model.get("views")+1});
			console.log(this.model);
		},
		addLike: function(e){
			this.model.like();
		},
		deleteArticle: function(e){
			ArticleCollection.remove(this.model)
			$(e.target).parents(".article").remove();
		},
		initialize: function(){
			this.model.on('change', this.render, this);
		},
	});
	
	//Parent View
	var ArticleParentView = Backbone.View.extend({
		el: '#backbone',
		initialize: function () {
			this.render();
			ArticleCollection.on('add', this.addOne, this);
		},
		render: function () {
			//this.$el.html('');
			ArticleCollection.each(function (model) {
				var view = new ArticleChildView({ model: model });
				this.$el.append(view.render());
			}.bind(this)); //Why binding?
		},
		addOne: function(model){
			var view = new ArticleChildView({ model: model });
			this.$el.append(view.render());
		},
		events: {
			'submit #theform':'submitArticle',
		},
		submitArticle: function(e){
			e.preventDefault();
			var title = $(e.target).find("#article-title").val()
			if(title){
				AddedArticle = new ArticleModel({
					title: title,
					description: "Default",
					url: "https://www.theatlantic.com/magazine/archive/2017/03/its-putins-world/513848/",
					image_src: "https://cdn.theatlantic.com/assets/media/img/2017/01/Authoritarianism_DEF_web/lead_960.jpg?1485884893"
				});
				ArticleCollection.add(AddedArticle);
				$(e.target).reset;
			}
		}
	});
	var app = new ArticleParentView();
	
	//Router
	var Workspace = Backbone.Router.extend({
	  routes: {
		"help":                 "help",    // #help
		"search/:query":        "search",  // #search/kiwis
		"search/:query/p:page": "search"   // #search/kiwis/p7
	  },

	  help: function() {
		alert("This is the help function")
	  },

	  search: function(query, page) {
		alert("This is the search function")
	  }
	});

	var r = new Workspace();
	Backbone.history.start();