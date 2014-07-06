ProgressIndicator = function(options){
  // Famous Modules
  require("famous/core/famous");
  var View             = require('famous/core/View');
  var Surface          = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Transitionable = require('famous/transitions/Transitionable');
  var SpringTransition = require('famous/transitions/SpringTransition');

  Transitionable.registerMethod('spring', SpringTransition);

  require('famous/inputs/FastClick');

  // ---------------------------------------------------------------------------
  function _ProgressIndicator(options) {
    View.apply(this);

    var surface = new Surface({
      content: "<img src='img/ajax-loader.gif'>",
      size: [100, 100]
    });

    this.stateModifier = new StateModifier({
      origin: [0.5, 0]
    });

    this.add(this.stateModifier).add(surface);

    this.spring = {
      method: 'spring',
      period: 1000,
      dampingRatio: 0.3
    };

  }
  // ---------------------------------------------------------------------------
  _ProgressIndicator.prototype = Object.create(View.prototype);
  _ProgressIndicator.prototype.constructor = _ProgressIndicator;
  // ---------------------------------------------------------------------------
  _ProgressIndicator.prototype.show = function() {
    this.stateModifier.setTransform(
      Transform.translate(0, 300, 0), this.spring
    );
  };
  // ---------------------------------------------------------------------------
  _ProgressIndicator.prototype.hide = function() {

  };
  // ---------------------------------------------------------------------------
  return new _ProgressIndicator(options);
};
