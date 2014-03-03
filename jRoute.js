var app = {
  $outlet: null,
  init: function() {
    app.$outlet = $('div[outlet]');
    
    $(window).on('hashchange', function() {
      app.$outlet.html(app.giveTemplate());
    });
    app.$outlet.html(app.giveTemplate());
    app.lazyLoad();
  },
  giveTemplate: function() {
    var location = window.location.hash;
    location = location.replace('#', '');

    $.each(app.templates, function() {
      if (this.location == location) {
        app.$outlet.html(this.html);
        console.log('this was loaded by lazy loading');
        return;
      }
    });

    $.each(app.routeObj, function() {
      if (location == this.location) {
        console.log('this was loaded by slow loading');
        app.$outlet.html(app.load(this.template));
      };
    });
  },
  load: function(template) {
    $.ajax({
      url: './'+template,
      async: true,
      type: 'post',
      dataType: 'html',
      success: function(e) {
        app.$outlet.html(e);
      }
    });
  },
  lazyLoad: function() {
    $.each(app.routeObj, function() {
      $.ajax({
        url: './'+this.template,
        async: true,
        type: 'post',
        dataType: 'html',
        success: function(e) {
          app.templates.push({location: this.location, html: e});
          console.log('good');
        }
      });
    });
  },
  templates: [],
  routeObj: {
    fudgeBeef: {
      location: 'fudgebeef',
      template: 'fudgebeef.html'
    },
    marko: {
      location: 'marko',
      template: 'marko.html'
    },
    polo: {
      location: 'polo',
      template: 'polo.html'
    }
  }
};

$(document).ready(function() {
  app.init();
});