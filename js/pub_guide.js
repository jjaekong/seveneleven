$(function(){
    // tab nav
    var tabNav = $('.tab_list li');
    tabNav.on('click', function(){
        tabNav.removeClass('on');
        $(this).addClass('on');
    });

    // 2depth tab nav
    $('.tab_list_common li').on('click', function(){
        var index = $(this).index();
        
        $(this).addClass('on').siblings().removeClass('on');
        $('.tab_cont_common').eq(index).addClass('on').siblings().removeClass('on');

        // contents title
        var conttitWidth = $('.cont_area .tit').width();
        var parentWidth = $('.cont_area .tit').offsetParent().width();
        var contPercent = Math.round(100 * conttitWidth / parentWidth);
        if(contPercent > 63){
            $('.cont_area .tit').addClass('long');
        }else{
            $('.cont_area .tit').removeClass('long');
        }

    });

    headerFixedFn();
});


// link scrolling
$(document).on('click', 'a[href^="#"]', function(e){
    var id = $(this).attr('href');
    var $id = $(id);
    if($id.length === 0){
        return;
    }
    e.preventDefault();

    var pos = $id.offset().top;
    $('html, body').animate({scrollTop : pos});
})


// scroll header fix
function headerFixedFn(){
    $(window).on('scroll', function(){
        var scrT = $(this).scrollTop();
        if(scrT > 0){
            $('.header_wrapper').addClass('fixed');
        }else{
            $('.header_wrapper').removeClass('fixed');
        }
    })
}