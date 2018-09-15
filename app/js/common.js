$(function() {

	// 3d
	$('.review').brazzersCarousel();
	$('.image-wrap img:not(:first-child)').attr('style', 'display: none;');

	// Variables
	var mainSlider = $('.slider'),
			hand = $('.hand'),
			svg = hand.find('svg'),
			videoMute = false,
			video = $('.slider-video');

	// Slider properties
	$('.slider').owlCarousel({
		loop: false,
		nav: false,
		smartSpeed: 700,
		items: 1,
		dots: false
	});

	// Slider center bg
	$('.slider-item').append('<div class="slider-item-bg"></div>');

	// Hand for small devices
	if(window.matchMedia('(max-width: 768px)').matches)
	{
			$('.owl-item:first-child .slider-item').append($('.hand-holder'));
	}

	// Hand animation
	function slide() {
		hand.animate({
			left: 132
		}, 1500, 'swing', handBack);
	}
	function handMove() {
		svg.animate({
			top: 0
		}, {
			duration: 10,
			step: function (now, fx) {
				$(this).css('top', now);
			},
			complete: function () {
				slide()
			}
		}, 'linear');
	}
	function handBack() {
		svg.animate({
			top: -750
		}, {
			duration: 10,
			step: function (now, fx) {
				$(this).css('top', now);
			},
			complete: function () {
				slideBack()
			}
		}, 'linear');
	}
	function slideBack() {
		hand.animate({
			left: 0
		}, 1500, 'swing', handMove)
	}
	setTimeout(slide, 1000);

	// Video play/pause
	if(!window.matchMedia('(max-width: 992px)').matches)
	{
		video.get(0).play();
		mainSlider.on('changed.owl.carousel', function (event) {
			var item = event.item.index;
			if (item == 0) {
				video.get(0).play();
			} else {
				video.get(0).pause();
			}
		});
	}

	// Video mute
	$(document).on('click', '.mute', function (event) {
		event.stopPropagation();
		if (!videoMute) {
			video.prop('muted', true);
			$(this).addClass('disable');
		} else {
			video.prop('muted', false);
			$(this).removeClass('disable');
		}
		videoMute = !videoMute;
	});

	//E-mail Ajax Send
	$('form.callback').submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: 'POST',
			url: '../mail.php', //Change
			data: th.serialize()
		}).done(function() {
			$(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
			setTimeout(function() {
				$(th).find('.success').removeClass('active').fadeOut();
				th.trigger('reset');
			}, 3000);
		});
		return false;
	});

	// Parallax
	$(document).on('mousemove', '.slider-item', function (event) {
		var x = -1 * parseInt(event.pageX);
		var y = -1 * parseInt(event.pageY);
		$(this).find('paralax-holder').attr('style', 'transform:translate3d(' + x * 0.1 + 'px ,' + y * 0.06 + 'px, 0); -webkit-transform: translate3d(' + x * 0.1 + 'px ,' + y * 0.06 + 'px, 0)');
		$(this).find('.slide-decor-1').attr('style', 'transform:translate3d(' + x * 0.1 + 'px ,' + y * 0.06 + 'px, 0); -webkit-transform: translate3d(' + x * 0.1 + 'px ,' + y * 0.06 + 'px, 0)');
		$(this).find('.slide-decor-2').attr('style', 'transform:translate3d(' + x * 0.01 + 'px ,' + y * 0.05 + 'px, 0); -webkit-transform: translate3d(' + x * 0.01 + 'px ,' + y * 0.05 + 'px, 0)');
	});

});
