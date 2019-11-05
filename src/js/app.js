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

$(document).ready(function(){

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
	  $('.search-modal').addClass('search-modal-active');
	  $('.search-input').addClass('scale-times');
	});

	$('.fa-times').click(function(){
		$('.search-modal').removeClass('search-modal-active');
	})



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
});




