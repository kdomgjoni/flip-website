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


$(document).ready(function(){
	var test = function(){
	var COL_COUNT = 2; // set this to however many columns you want
	var arr = [500, 270, 350, 250, 290, 400];
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
	}

	

	jQueryBridget( 'masonry', Masonry, $ );
	// now you can use $().masonry()
	$('.posts__blocks').masonry({
		itemSelector: '.posts__block',	 
	});


	$('.hamburger-box').click(function(event){
		$('.hamburger').toggleClass('is-active');
		$('.header').toggleClass('header-active');
		$('.navigation-list__item').toggleClass('menu-active');
	});

	$('.fa-search').click(function() {
	  $('input').toggleClass('search-active');
	});

	test();
	
});




