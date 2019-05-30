$(document).ready(function() {
	//모달 닫기
	$('.btn-modal-close').on('click', function() {
		var $this = $(this);
		$this.closest('.modal').removeClass('in').fadeOut(200);
		if (!$('.modal').hasClass('in')) {
			$('.shadow').removeClass('on');
			$('body').removeClass('modal-open');
		} else {
			$('.shadow').addClass('on');
			$('body').addClass('modal-open');
		}
	});
	//맨 위로 스크롤 이동
	$(window).on('scroll', function () {
		// back-top
		if ($(this).scrollTop() > 0) {
			$('.back-top').fadeIn();
		} else {
			$('.back-top').fadeOut();
		}
	});
	$('.back-top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 450);
		return false;
	});
});

//모달 열기 modalId:모달 고유 ID
function openModal(modalId) {
	$('body').addClass('modal-open');
	$('.modal').removeClass('in').fadeOut(200);
	$('#' + modalId).addClass('in').fadeIn(200);
	$('.shadow').addClass('on');
}

//정렬 부분 탭 화면 상단에 걸리기
function tabScroll(id) {
	var tabId = $(id);
	var tabIdtop = tabId.offset().top - $('.page-top').outerHeight();
	var tabIdHe = tabId.outerHeight();

	$(window).scroll(function() {
		if ($(this).scrollTop() >= tabIdtop) {
			tabId.addClass('fixed');
            $('.detail-contents').css({
                'padding-top' : tabIdHe
            });
		} else {
			tabId.removeClass('fixed');
            $('.detail-contents').css({
                'padding-top' : 0
            });
		}
	});
}

function accordion(elem, scroll) {
	var accordionBtn = $(elem).find('.a-title');
	accordionBtn.on('click', function() {
		var _this = $(this);
		if (_this.next('.a-data').css('display') == 'none') {
			$('.a-title').closest('.a-row').removeClass('on');
			$('.a-data').stop().slideUp(200);
			_this.closest('.a-row').addClass('on');
			_this.next('.a-data').stop().slideDown(200);
		} else {
			_this.closest('.a-row').removeClass('on');
			_this.next('.a-data').stop().slideUp(200);
			_this.focus();
		}
        if (scroll) {
            setTimeout(function(){
                var fixH = $('.page-top').outerHeight() + $('.titlebox').outerHeight();
                var _thisTop = _this.offset().top;
                $('html, body').stop().animate({
                    scrollTop: _thisTop - fixH
                }, 450);
            }, 220);
        }
	});
}


//input number maxlength 제어
function maxLengthCheck(object){
	if (object.value.length > object.maxLength){
		object.value = object.value.slice(0, object.maxLength);
	}    
}

//포인트 사용 모달창 열었을 때 카드번호에 포커스
function modalFocus ( elem , modalid ) {
	$('.' + elem ).click(function () {
		setTimeout( function () {
			$('#' + modalid +' .card-num input').focus()
		}, 1);
	});
}
