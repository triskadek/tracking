(function(global) {
	
	"use strict";

	var container = document.getElementById('container');
	var colors = document.getElementById('colors');

	var img = new Image();
	img.onload = function() {
		container.appendChild(img);
		startTracking();
	}

	img.src = './assets/profiles/moreno-crop.jpg';

	function startTracking() {
		console.log('image loaded..');
		
		var tracker = new tracking.ObjectTracker(['eye']);
		tracker.setStepSize(1.7);
		
		tracking.track(img, tracker);
		tracker.on('track', onTracking);
		
		getSwatches();
	}
	
	function onTracking(event) {
		console.log('tracking..');
		
		if(event.data.length === 0) {
			console.log('no targets were detected in this frame');
		}else {
			event.data.forEach(function (rect) {
				plot(rect.x, rect.y, rect.width, rect.height);
			});
		}	
	}
	
	function getSwatches() {
		console.log('extracting colors..');
		var vibrant = new Vibrant(img);
		var swatches = vibrant.swatches();
		
		for(var swatch  in swatches) {
			if(swatches.hasOwnProperty(swatch) && swatches[swatch]) {
				var swatchEl = document.createElement('span');
				swatchEl.style.backgroundColor = swatches[swatch].getHex();
				colors.appendChild(swatchEl);					
			}
		}
	}
	
	function plot(x, y, w, h) {
		var rect = document.createElement('div');
        container.appendChild(rect);
        rect.classList.add('rect');
        rect.style.width = w + 'px';
        rect.style.height = h + 'px';
        rect.style.left = (img.offsetLeft + x) + 'px';
        rect.style.top = (img.offsetTop + y) + 'px';
	}
})(window);