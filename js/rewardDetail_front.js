// full modal popup
function fullPopupFn(popup){
    var $popup = $('#' + popup);
    var posY = $(window).scrollTop();

    $popup.addClass('on');
    // 바닥페이지 락 & 상단이동 막기
    $('html, body').addClass('not_scroll');
    $('#body_wrapper').css('top', -posY);
    
    // 풀팝업 뜰경우 스크롤할 영역이 있을때만 스크롤락 해제
    var winHeight = $(window).innerHeight();
    var modalHeight = $popup.find('.modal_inner').innerHeight();
    if(modalHeight > winHeight){
        enableScroll();
    }

    // close
    $popup.find('.btn_modal_close').on('click', function(){
        $popup.removeClass('on');
        // 바닥페이지 락 & 상단이동 해제
        $('html, body').removeClass('not_scroll');
        posY = $(window).scrollTop(posY);

        // 바코드 위에서 닫을 경우 스크롤락
        $('.barcode_cont').each(function(){
            if($(this).hasClass('on')){
                disableScroll();
            }
        });
    })
}

// Disable scroll
function disableScroll(){
    $('#wrapper').on('scroll touchmove mousewheel', function(e){
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
}

// Enable scroll
function enableScroll(){
    $('#wrapper').off('scroll touchmove mousewheel');
}

