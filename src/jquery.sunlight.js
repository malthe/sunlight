/**
 * jQuery plugin for Sunlight http://sunlightjs.com/
 *
 * (c) 2011 Tommy Montgomery http://tommymontgomery.com/
 * licensed under WTFPL http://sam.zoy.org/wtfpl/
 */
(function($, window, undefined){
	
	$.fn.sunlight = function(options) {
		var highlighter = new window.Sunlight.Highlighter(options);
		this.each(function() {
			highlighter.highlightNode(this);
		});
		
		return this;
	};
	
}(jQuery, window));