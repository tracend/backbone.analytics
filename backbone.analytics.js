(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('backbone'));
  } else {
    factory(window.Backbone);
  }
})(function(Backbone) {
  var loadUrl = Backbone.History.prototype.loadUrl;

  Backbone.History.prototype.loadUrl = function(fragmentOverride) {
    var matched = loadUrl.apply(this, arguments),
        gaFragment = this.fragment;
    if (!/^\//.test(gaFragment)) gaFragment = '/' + gaFragment;
    // legacy version
    if(typeof window._gaq !== "undefined") window._gaq.push(['_trackPageview', gaFragment]);
    // Analytics.js
    var ga = window['GoogleAnalyticsObject'] || window.ga;
    if(typeof ga !== "undefined"){
      ga('send', 'pageview', gaFragment);
    }
    return matched;
  };

});
