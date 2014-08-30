Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  /**
   * The route's name is "home"
   * The route's template is also "home"
   * The default action will render the home template
   */
  this.route('home', {
    path: '/',
    onBeforeAction: [
      function (pause) {
        this.subscribe('organizations').wait();
		this.subscribe('schools',Session.get('organization_id')).wait();
        // we're done waiting on all subs
        if (this.ready()) {
          NProgress.done(); 
        } else {
          NProgress.start();
          pause(); // stop downstream funcs from running
        }
      }
    ]
  });

  /**
   * The route's name is "posts"
   * The route's path is "/posts"
   * The route's template is inferred to be "posts"
   */

  this.route('school', {
    path: '/school/:_id',
    onRun: function () {
      // called on first load
    },

    data: function () {
      return Schools.findOne({_id: this.params._id});
    },

    // before hooks are run before your action
    onBeforeAction: [
      function () {
        this.subscribe('school', this.params._id).wait();
      },

      function () {
        // we're done waiting on all subs
        if (this.ready()) {
          NProgress.done(); 
        } else {
          NProgress.start();
          this.stop(); // stop downstream funcs from running
        }
      }
    ],

    /*action: function () {
      var params = this.params; // including query params
      var hash = this.hash;
      var isFirstRun = this.isFirstRun;

      this.render(); // render all
      this.render('specificTemplate', {to: 'namedYield'});
    },

    unload: function () {
      // before a new route is run
    }*/
  });
});