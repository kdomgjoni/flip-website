import '../scss/main.scss';
var $ = require('jquery');
window.jQuery = $;
window.$ = $;
var jQueryBridget = require('jquery-bridget');
var Masonry = require('masonry-layout');
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
const loadGoogleMapsApi = require('load-google-maps-api');
var Barba = require('barba.js');



var hi = function(){
		$('.posts__block').each(function(index, element){
		if($(this).hasClass('post-active')){
			var COL_COUNT = 3; // set this to however many columns you want
			var arr = [270, 350, 250, 290, 400];
			var col_heights = [];
			var container = document.querySelector('.posts__blocks');


			for (var i = 0; i <= COL_COUNT; i++) {
			  col_heights.push(0);
			}

			for (var i = 0; i < container.children.length; i++) {
			  var order = (i + 1) % COL_COUNT || COL_COUNT;

			  container.children[i].style.order = order;

			  var setHeight = arr[Math.floor(Math.random()*arr.length)];

			  container.children[i].style.height = setHeight.toString() + 'px';
			  
			  var child_height = parseFloat(container.children[i].style.height); 
			  
			  col_heights[order] += child_height;
			}
			var highest = Math.max.apply(Math, col_heights);
			container.style.height = highest+'px'; 
		}else{
			return false;
		}
	});
	

	jQueryBridget( 'masonry', Masonry, $ );
	// now you can use $().masonry()
	$('.posts__blocks').masonry({
		itemSelector: '.posts__block',	 
	});


	$('.hamburger-box').click(function(event){
		$('.hamburger').toggleClass('is-active');
		$('.header').toggleClass('header-active');
		$('.navigation-list__item').toggleClass('menu-active');
		$('section').toggleClass('main-section-blur');
	});

	$('.fa-search').click(function() {
	  $('input').toggleClass('search-active');
	});



	var options = {
		key: 'AIzaSyDhBiQ6tU3cSikkas5vgpSnpo5IcZ2sAtU'
	}

	loadGoogleMapsApi(options).then(function (googleMaps) {
	  new googleMaps.Map(document.querySelector('.map'), {
	    center: {
	      lat: 40.7484405,
	      lng: -73.9944191
	    },
	    zoom: 12
	  })
	}).catch(function (error) {
	  console.error(error)
	});
}

	
hi();

$(document).ready(function(){

	Barba.Pjax.init();

	



var FadeTransition = Barba.BaseTransition.extend({
  	start: function() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */


    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise
	      .all([this.newContainerLoading, this.fadeOut()])
	      .then(this.fadeIn.bind(this));
	},

	fadeOut: function() {
	    /**
	     * this.oldContainer is the HTMLElement of the old Container
	     */

	    return $(this.oldContainer).animate({ opacity: 0 }).promise();

	},

	fadeIn: function() {
	    /**
	     * this.newContainer is the HTMLElement of the new Container
	     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
	     * Please note, newContainer is available just after newContainerLoading is resolved!
	     */

	    var _this = this;
	    var $el = $(this.newContainer);

	    $(this.oldContainer).hide();

	    $el.css({
	      visibility : 'visible',
	      opacity : 0
	    });

	    $el.animate({ opacity: 1 }, 400, function() {
	      /**
	       * Do not forget to call .done() as soon your transition is finished!
	       * .done() will automatically remove from the DOM the old Container
	       */

	      _this.done();

	    });
	  }
	});

	/**
	 * Next step, you have to tell Barba to use the new Transition
	 */

	Barba.Pjax.getTransition = function() {
	  /**
	   * Here you can use your own logic!
	   * For example you can use different Transition based on the current page or link...
	   */

	  return FadeTransition;
	};



Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
    hi();
});
});




