$.fn.slider = function() {
	return this.each(function(i, el){
		var $this = $(el);
		var $images = $this.find('li');
		var max = $images.length, index = 0;
		function onClick() {
			if(index != max - 1) { index++; } 
			else { index = 0; }

			$this.find('.is-visible').removeClass('is-visible');
			$images.eq(index).addClass('is-visible');
		}
		function addEventListeners(){
			$images.on('click', onClick);
		}
		function initialize(){
			addEventListeners();
			$this.height($this.find('.visible').height());
			window.setInterval(function(){
				onClick();
			}, 3000);
		}
		initialize();
	});
};