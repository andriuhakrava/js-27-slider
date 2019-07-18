/* plugin slide-show-742 */

(function($){
	
	$.fn.slideshow742 = function(options){
		if (typeof options === 'string'){
			let command = options;
			options = this.get(0).sliderOptions;
			if (command === 'stop') stop(this);
			if (command === 'run') run(this);
			return;
		}
		
		options = $.extend({
			timeout: 3000,
			prev: null,
			next: null,
			pager: null
		}, options);

		this.each(function (){
			this.sliderOptions = options;
			let $slider = $(this);
			setPrevNext($slider);
			setPager($slider);
			$slider.addClass('s-show-742');
			activePrevNext($slider, $slider.children(':first'));
			$slider.trigger('slideChange');
			run($slider);
		});
		
		return this;
		
		function setPrevNext($slider){
			let $prev = $slider.nextAll('.prev');
			let $next = $slider.nextAll('.next');
			
			if (options.prev) $prev = $prev.add($(options.prev));
			if (options.next) $next = $next.add($(options.next));
			
			$prev.on('click', function(){
				stop($slider);
				toSlide($slider, 'prev');
				run($slider);
			});
			
			$next.on('click', function(){
				stop($slider);
				toSlide($slider, 'next');
				run($slider);
			});
		}
		
		function toSlide($slider, n){
			let $active = $slider.children('.active');
			let $next;

			if (typeof n === 'string'){
				$next = $active[n]();
				let str = n === 'next' ? ':first' : ':last';
				if (!$next.length) $next = $slider.children(':' + str);
			} else {
				$next = $slider.children().eq(n);
			}
			activePrevNext($slider, $next);
			$slider.trigger('slideChange');
			if (typeof n === 'string') {
				$slider.trigger('slide' + n[0].toUpperCase() + n.substr(1));
			}
		}
		
		function setPager($slider){
			let $pager = $slider.nextAll('.pager');
			let html = '';
			
			$slider.children().each(function(){
				html += '<span></span>';
			});
			
			$pager.html(html);
			$slider.on('slideChange', function(){
				$pager.children('.active').removeClass('active');
				let n = $slider.children('.active').index();
				$pager.children().eq(n).addClass('active');
			});
			
			$pager.children().on('click', function(){
				let n = $(this).index();
				stop($slider);
				toSlide($slider, n);
				run($slider);
			});
		}
		
		function activePrevNext($slider, $active){
			let $exActive = $slider.children('.active');
			
			$slider.children().removeClass('active exActive prevActive nextActive');
			$active.addClass('active');
			$exActive.addClass('exActive');
			
			let $prevActive = $active.prev();
			let $nextActive = $active.next();
			
			if (!$prevActive.length) $prevActive = $slider.children(':last');
			if (!$nextActive.length) $nextActive = $slider.children(':first');
			$prevActive.addClass('prevActive');
			$nextActive.addClass('nextActive');
		}
		
		function stop($slider){
			clearInterval(+$slider.get(0).dataset.timer);
		}
		function run($slider){
			$slider.get(0).dataset.timer = setInterval(toSlide, options.timeout, $slider, 'next');
		}
	
	};
	
})(jQuery);
