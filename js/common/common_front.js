var isSlideMenuOpen = false;

$(function(){ 
    $('.icon_allmore').on('click', function(){
        slidemenu_open();
    });

    // scroll header fix
    $('#header_wrapper .main_menu').length && headerFixedFn();

    // footer tab bar
    $('.menu_bottom').length && bottomMenuShowFn();

    // contents title
    var conttitWidth = $('.cont_area .tit').width();
    var parentWidth = $('.cont_area .tit').offsetParent().width();
    var contPercent = Math.round(100 * conttitWidth / parentWidth);
    if(contPercent > 63){
        $('.cont_area .tit').addClass('long');
    }else{
        $('.cont_area .tit').removeClass('long');
    }

    $('.icon_top').on('click', function(){
        $('html, body').stop().animate({scrollTop : '0'}, 200);
    });
});


// LNB Layer
function slidemenu_open() {
    isSlideMenuOpen = true;
    var siblingBtn = $('.menu_bottom').find('button').not('.icon_allmore');
    $('.menu_slide').show();
    $('.icon_allmore').addClass('on');
    $('.menu_bottom').addClass('on');
    $('.menu_slide .menu_contents').animate({right: '0%'}, 200);
    siblingBtn.removeClass('on');
    
    //util Top 버튼 및 barcode fadeIn
    $('.icon_lpot').hide();
    $('.icon_top').hide(); 
    $('.barcode_box').hide();
    // $('.menu_bottom').stop().animate({bottom : '0%'}, 200);

    // background locked
    if(isSlideMenuOpen == true){
        $('body').css('overflow', 'hidden');
        disableScroll();
    }else {
        $('body').css('overflow', '');
        enableScroll();
    }

    // menu slide close
    var SlideMenuClose = $('.menu_bottom').find('button').not('.icon_allmore');
    SlideMenuClose.click(function(){
        $('.menu_slide .menu_contents').animate({right: '-100%'}, 200);
        $("body").css("overflow", "").unbind('touchmove');
        $('.menu_slide').fadeOut();
        $('.icon_allmore').removeClass('on');
        $('.icon_lpot').show();
        $('.icon_top').show(); 
        $('.barcode_box').show();
        isSlideMenuOpen = false;
        enableScroll();
    });   
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

// full modal popup
function fullPopupFn(popup){
    var $popup = $('#' + popup);
    $popup.addClass('on');
    $('html, body').css('overflow', 'hidden');
    
    // 풀팝업 뜰경우 스크롤할 영역이 있을때만 스크롤락 해제
    var winHeight = $(window).innerHeight();
    var modalHeight = $popup.find('.modal_inner').innerHeight();
    // console.log(winHeight, modalHeight)
    if(modalHeight > winHeight){
        enableScroll();
    }

    // close
    $popup.find('.btn_modal_close').on('click', function(){
        $popup.removeClass('on');
        $('html, body').css('overflow', '');

        // 바코드 위에서 닫을 경우 스크롤락
        $('.barcode_cont').each(function(){
            if($(this).hasClass('on')){
                disableScroll();
            }
        });
    })
}

// scroll header fix
function headerFixedFn(){
    $(window).on('scroll', function(){
        var scrT = $(this).scrollTop();
        if(scrT > 0){
            $('.main_menu').addClass('fixed');
        }else{
            $('.main_menu').removeClass('fixed');
        }
    })
}

// footer tab bar
function bottomMenuShowFn(){
    var scrTBefore = 0;

    // lnb가 떠있다면 bottomMenu 고정
    if(!isSlideMenuOpen){
        $(window).on('scroll', scrollCheck);
    }

    // lnb에서도 bottomMenu 실행해야 할 경우 하단 주석 살리기
    // $(window).on('scroll', scrollCheck);

    //LNB open
    // $('.menu_contents').on('scroll', bottomMove);
    

    var winHeight = $(window).height();
    var mainMenuHeight = $('.main_menu').height();
    var standardOffset = Math.floor((winHeight/100) * 71) - mainMenuHeight; 

    /**
        * top 나타나는 기준값(standardOffset) : 화면에서 메인 비주얼 높이가 차지하는 비율 (71%)
        * 
        * 초기값 (default)
        *       - 하단바 있음
        *       - lpot(o), top(x)
        * 
        * 스크롤다운 
        *       - 하단바 사라짐
        *       - 기준값 이하일때 : lpot(o), top(x)
        *       - 기준값 이상일때 : lpot(o), top(o)
        * 
        * 스크롤업
        *       - 하단바 나타남
        *       - 기준값 이하일때 : lpot(o), top(x)
        *       - 기준값 이상일때 : lpot(o), top(o)
    */

    function scrollCheck(){

        // LNB 열릴때 스크롤 실행되는 이슈로 열려진 상태 판별하여 return
        if(isSlideMenuOpen){
            return false;
        } else {
            //bottomMove();
        }
    }

    function bottomMove(){
        var scrT = $(this).scrollTop();
        var bottomMenu = $('.menu_bottom');
        var isMenuOn = bottomMenu.is('.on');
        var btnUtil = $('.btn_util');
        var isSub = $('.onsub').length > 0;
        var isbtnFixed = $('.bottom_fixed').length > 0;

        /** fix 버튼 영역에 따른 btnUtil 포지션 분기
         * 
         * fix 버튼영역이 없을경우 (.btn_util) 
         * fix 버튼영역이 있을경우 ('.btn_util.fix') : fix버튼영역을 기준으로 btnUtil영역이 움직이도록 함
         * 
         * */
        function btnClassInit(){
            if(isbtnFixed){
                btnUtil.attr('class', 'btn_util fix');
            } else {
                btnUtil.attr('class', 'btn_util');
            }
        }
        
        if(scrT < 0){
            // console.log('성공')
            return false;
        }else{
            if(scrT > scrTBefore){
                //down
                if(isMenuOn){
                    bottomMenu.removeClass('on');
                    bottomMenu.stop().animate({bottom: '-30%'}, 300);
                    btnClassInit();
                    btnUtil.addClass('down');
                }
                if(scrT > standardOffset){
                    btnClassInit();
                } 
            }else{
                //up
                if(!isMenuOn){
                    bottomMenu.addClass('on');
                    bottomMenu.stop().animate({bottom: 0}, 300);
                    if(!isSub){
                        btnClassInit();
                        btnUtil.addClass('up');
                    }
                }
                if(scrT < standardOffset){
                    btnClassInit();
                    btnUtil.addClass('hidetop');
                }
            }
            scrTBefore = scrT;
        }
    }
}

// count -,+
function updateQty(addType){
    var idx = 0;
    var itemQty = parseInt($('input[name=itemQty]').eq(idx).val());

    if(addType == "plus"){
        $('input[name=itemQty]').eq(idx).val(parseInt(itemQty + 1));
    } else if (addType == "minus"){
        if(itemQty > 1){
            $('input[name=itemQty]').eq(idx).val(parseInt(itemQty - 1));
        }
    }
}

// tab_common_nav
$(function(){ 
    var tabComNav = $('.tab_common_nav a');
    tabComNav.on('click', function(e){
        // e.preventDefault();
        tabComNav.removeClass('on');
        $(this).addClass('on');
    });
});

// modal header shadow
var isModalScDown = false;
$('.modal_box').on('scroll', function(){
    var scrT = $(this).scrollTop();
    if(scrT > 0){
        if(!isModalScDown){
            isModalScDown = true;
            $('.modal_header').addClass('shadow');
        }
    } else {
        if(isModalScDown){
            isModalScDown = false;
            $('.modal_header').removeClass('shadow');
        }
    }
});

// lnb name length check
$('.member_tit.login .txt_bold').each(function(){
    //표시할 글자수 지정
    var length = 3; 

    if( $(this).text().length > length ){ 
        //지정한 글자수 이후 표시할 텍스트(...)
        $(this).text($(this).text().substr(0,length)+'…');
    }
})