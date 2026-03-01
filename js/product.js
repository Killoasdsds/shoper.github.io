(function () {
	function pageFit(doc, win, maxwidth, minwidth, font) {
		var docEl = doc.documentElement,
			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function () {
				var clientWidth = docEl.clientWidth;
				if (!clientWidth) return;
				if (clientWidth >= minwidth && clientWidth <= maxwidth) {
					docEl.style.fontSize = font * (clientWidth / maxwidth) + 'px';
				} else if (clientWidth > maxwidth) {
					docEl.style.fontSize = font + 'px';
				} else if (clientWidth < minwidth) {
					docEl.style.fontSize = font * (minwidth / maxwidth) + 'px';
				}
			};
		recalc();
		if (!doc.addEventListener) return;
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener('DOMContentLoaded', recalc, false);
	}
	pageFit(document, window, 640, 320, 37.5);
	$('.video-wrapper, video').removeClass('video-wrapper');
	$('.description-body').find('iframe').wrap('<div class="video-wrapper"/>');
	$('.description-body').find('video').wrap('<div class="video-wrapper"/>');
	$('img[data-original]').lazyload({
		threshold: 500
	});
	new Swiper('.swiper-container1', {
		slidesPerView: 1,
		loop: !0,
		autoplay: {
			delay: 5000
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: !0
		}
	});
	var time = new Date;
	time.setTime(Math.round(time / 3600000) * 3600000 + 3600000);
	timer(parseInt((time - (new Date)) / 1000));

	function timer(diff) {
		var ms = 0,
			_time = $('#seckill_time'),
			_hour = _time.find('.hour'),
			_minute = _time.find('.minute'),
			_second = _time.find('.s'),
			_msecond = _time.find('.ms');
		var func = function () {
			if (diff < 0) return;
			if (--ms < 0) ms = 9;
			_msecond.text(ms);
			if (ms === 9) {
				--diff;
				var hour = Math.floor(diff / 3600),
					remain = diff - hour * 3600,
					minute = Math.floor(remain / 60),
					second = remain - minute * 60;
				if (hour < 10) hour = '0' + hour;
				if (minute < 10) minute = '0' + minute;
				if (second < 10) second = '0' + second;
				_hour.text(hour);
				_minute.text(minute);
				_second.text(second);
				if (diff == 0) {
					_msecond.text(0);
					clearInterval(seed);
				}
			}
		};
		func();
		var seed = setInterval(func, 100);
	}
	$(window).on('scroll', function () {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
			scrollDiv = $('#scrollTop'),
			seckillDiv = $('.seckill-container'),
			dH = document.documentElement.clientHeight,
			imgH = parseInt($('.swiper-container').css('height')),
			orderSubmit = $('#submit_order');
		if (scrollTop > 5) {
			orderSubmit.show();
		}
		if (scrollTop >= imgH) {
			seckillDiv.addClass('fixed');
		} else {
			seckillDiv.removeClass('fixed');
		}
		if (scrollTop > dH + 100) {
			scrollDiv.addClass('fadeInRight').addClass('loading').removeClass('fadeOutRight').show();
		} else {
			scrollDiv.removeClass('fadeInRight').removeClass('loading').addClass('fadeOutRight');
			setTimeout(function () {
				if (!scrollDiv.hasClass('loading')) {
					scrollDiv.hide()
				}
			}, 500);
		}
	});

})();