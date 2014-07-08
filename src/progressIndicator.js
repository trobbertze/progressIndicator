ProgressIndicator = function(options){
  // Famous Modules
  require("famous/core/famous");
  var View             = require('famous/core/View');
  var Surface          = require('famous/core/Surface');
  var Transform        = require('famous/core/Transform');
  var StateModifier    = require('famous/modifiers/StateModifier');
  var Transitionable   = require('famous/transitions/Transitionable');
  var SpringTransition = require('famous/transitions/SpringTransition');

  Transitionable.registerMethod('spring', SpringTransition);

  require('famous/inputs/FastClick');

  // ---------------------------------------------------------------------------
  function _ProgressIndicator(options) {
    View.apply(this);

    this.background = new Surface({
      size: [undefined, undefined],
      properties: {
        backgroundColor: "rgba(0,0,0, 0.2)"
      }
    });

    this.backgroundModifier = new StateModifier({
      origin: [0,0],
      transform: Transform.translate(0, -window.innerHeight - 200),
      opacity: 0
    });


    var spinner = new Surface({
      content: "<img src='packages/progressIndicator/img/ajax-loader.gif'>",
      size: [31, 31],
      properties: {
        zIndex: "100"
      }
    });

    this.spinnerModifier = new StateModifier({
      origin: [0.5, 0.5],
      transform: Transform.translate(0, -window.innerHeight)
    });

    this.add(this.backgroundModifier).add(this.background);
    this.add(this.spinnerModifier).add(spinner);

  }
  // ---------------------------------------------------------------------------
  _ProgressIndicator.prototype = Object.create(View.prototype);
  _ProgressIndicator.prototype.constructor = _ProgressIndicator;
  // ---------------------------------------------------------------------------
  _ProgressIndicator.prototype.show = function() {
    this.spinnerModifier.halt();

    this.backgroundModifier.setTransform(
      Transform.translate(0, 0, 0)
    );

    this.backgroundModifier.setOpacity(1);

    this.spinnerModifier.setTransform(
      Transform.translate(0, 0, 0),
      {
        method: 'spring',
        period: 400,
        dampingRatio: 0.3
      }
    );
  };
  // ---------------------------------------------------------------------------
  _ProgressIndicator.prototype.hide = function() {
    this.spinnerModifier.halt();

    this.backgroundModifier.setOpacity(0);

    this.backgroundModifier.setTransform(
      Transform.translate(0, -window.innerHeight - 200, 0)
    );

    this.spinnerModifier.setTransform(
      Transform.translate(0, -window.innerHeight, 0),
      {
        method: 'spring',
        period: 500,
        dampingRatio: 0.3
      }
    );
  };
  // ---------------------------------------------------------------------------
  return new _ProgressIndicator(options);
};
