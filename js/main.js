(function detectIe() {
    var ie = 0;
    try { ie = navigator.userAgent.match( /(MSIE |Trident.*rv[ :])([0-9]+)/ )[ 2 ]; }
    catch(e){}
    if (ie !== 0) document.getElementsByTagName("html")[0].className += " ie v" + ie;
 }());

$(document).ready(function() {
    $('.scrollTo-link').on('click', function(e){
		var target=$(this).attr('href');

		if ($(target).length){
			$('html, body').animate({'scrollTop':$(target).offset().top},600);
		}
		e.preventDefault();	
	})
 });