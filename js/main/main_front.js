var sevenui = sevenui || {};

$(document).ready(function(event) {

    // 초기 진입 시 barcode show
    // barcodeLayerShowFn();

    // 접혀있는 바코드
    barcodeLayerfold();

    $('.btn_barcode').on('click', function(e){
        var barcodeBox = $(this).parents('.barcode_box');
        var barcodeCont = $(this).closest('.barcode_cont');
        var isBarcode = barcodeCont.is('.on');
    
        if(isBarcode){
            barcodeCont.removeClass('on');
            barcodeBox.animate({top: '-150.833vw'}, 300);
            $(this).find('img').attr('alt','바코드 열기');
            $(this).removeClass('on');
            $('body').css('overflow', '');
            $(this).parents().find('.dimm').fadeOut();
    
            enableScroll();
            
            // 3초 후 float_menu_coach show
            setTimeout(function(){ 
                $('.float_menu_coach').fadeIn();
            }, 2000);
        }else{
            barcodeCont.addClass('on');
            barcodeBox.animate({top: '0%'}, 300);
            $(this).find('img').attr('alt','바코드 닫기');
            $(this).addClass('on');
            $('body').css('overflow', 'hidden');
            $(this).parents().find('.dimm').fadeIn();

            disableScroll();
        }
    });

    // sevenui.main_slider = new Swiper('.main_top_slider', {
    //     loop: true,
    //     autoplay: $('.swiper-container .swiper-slide').length > 1 ? true : false,
    //     pagination: {
    //         el: '.swiper-pagination',
    //         type: 'fraction',
    //     },
    //     on: {
    //         init : function() {                
    //             // $('.swiper-num').find('.current').html(this.realIndex + 1);
    //             // $('.swiper-num').find('.total').html(this.slides.length - 2);

    //             // slide 1 case
    //             if(this.slides.length == 3){
    //                  $(this.$el.find('.swiper-pagination, .swiper-num, .swiper-autoplay')).hide();
    //             }else{
    //                  $(this.$el.find('.swiper-pagination, .swiper-num, .swiper-autoplay')).show();
    //             }
    //             $(this.$el.find('.swiper-autoplay button')).on('click', function(){
    //                 if($(this).is('.stop')){
    //                     sevenui.main_slider.autoplay.stop();
    //                     $(this).removeClass('stop').addClass('play').text('재생');
    //                 }else {
    //                     sevenui.main_slider.autoplay.start();
    //                     $(this).removeClass('play').addClass('stop').text('정지'); 
    //                 }                
    //             }) 
    //         },
    //         // slideChange : function() {
    //         //     $('.swiper-num').find('.current').html(this.realIndex + 1);
    //         //     $('.swiper-num').find('.total').html(this.slides.length - 2);
    //         // } 
    //     }
    // });

    // if(sevenui.main_slider.slides.length == 3) sevenui.main_slider.destroy();

    // sevenui.fee_slider = new Swiper('.main_fee_slider', {
    //     loop: true,
    //     autoplay: $('.swiper-container .swiper-slide').length > 1 ? true : false,
    //     pagination: {
    //         el: '.swiper-pagination',
    //         type: 'fraction',
    //     },
    //     on: {
    //         init : function() {                
    //             // slide 1 case
    //             if(this.slides.length == 3){
    //                  $(this.$el.find('.swiper-pagination, .swiper-num, .swiper-autoplay')).hide();
    //             }else{
    //                  $(this.$el.find('.swiper-pagination, .swiper-num, .swiper-autoplay')).show();
    //             }   
    //             $(this.$el.find('.swiper-autoplay button')).on('click', function(){
    //                 if($(this).is('.stop')){
    //                     sevenui.fee_slider.autoplay.stop();
    //                     $(this).removeClass('stop').addClass('play').text('재생');
    //                 }else {
    //                     sevenui.fee_slider.autoplay.start();
    //                     $(this).removeClass('play').addClass('stop').text('정지');  
    //                 }                
    //             })            
    //         }
    //     }
    // });

    // if(sevenui.fee_slider.slides.length == 3) sevenui.fee_slider.destroy();

    // sevenui.item_slider = new Swiper('.item_slider', {
    //     loop: false,
    //     autoplay: false,
    //     pagination: {
    //         el: '.swiper-pagination',
    //         type: 'progressbar',
    //     },
    //     slidesPerView: 'auto'
    // });
    
    // sevenui.event_slider = new Swiper('.event_slider', {
    //     loop: false,
    //     init: false,
    //     autoplay: false,
    //     // init:false,
    //     pagination: {
    //         el: '.swiper-pagination',
    //         type: 'progressbar',
    //     },
    //     slidesPerView: 'auto'
    // });
    // //sevenui.event_slider = event_slider;

    // sevenui.reward_slider = new Swiper('.reward_slider', {
    //     loop: false,
    //     autoplay: false,
    //     pagination: {
    //         el: '.swiper-pagination',
    //         type: 'progressbar',
    //     },
    //     slidesPerView: 'auto'
    // });


    // main dropdown menu 
    $('.dropDown_box .btn_drop').on('click', function(){
        var dropBox = $(this).closest('dt');
        var dropBoxCont = dropBox.next('.drop_cont');
        var isdropBox = dropBoxCont.is('.on');

        if(isdropBox){
            // dropBoxCont.removeClass('on').stop().slideUp('400');
            dropBoxCont.removeClass('on');
            dropBoxCont.slideUp();
            $(this).removeClass('on');
            $(this).find('.hidden').text('열기');
        }else{
            // dropBoxCont.addClass('on').stop().slideDown('400');
            dropBoxCont.addClass('on');
            dropBoxCont.slideDown();
            $(this).addClass('on');
            $(this).find('.hidden').text('닫기');
        }
    });

    // 혜택*이벤트 tab menu
    tabSetting();    
    
    // ad area close
    $('.banner_area .ad_btn_x').on('click', function(){
        $(this).parents('.banner_area').fadeOut();
    })

    // zzim button
    $('.txt_zzim').on('click', function(){
        $(this).toggleClass('on');
    })
});


// barcode Layer auto
function barcodeLayerShowFn(){
    // barcode auto show
    $('.barcode_box').show().animate({top: '0%'}, 300);
    $('.barcode_box .barcode_cont').animate({top: '0%'}, 300).addClass('on');
    $('body').css('overflow', 'hidden');
    disableScroll();
}

function barcodeLayerfold(){
    $('.barcode_box').animate({top: '-150.833vw'}, 100);
    $('.barcode_box').show();
    $('.dimm').hide();

    // 3초 후 float_menu_coach show
    setTimeout(function(){ 
        $('.float_menu_coach').fadeIn();
    }, 2000);
}

// 혜택*이벤트 tab menu
function tabSetting(){
    //현재 선택된 탭메뉴만 show
    $('.tab_event_cont .tab_panel').hide();
    $($('.tab_event_nav a.on').attr('href')).show();

    //tab click event
    $('.tab_event_nav a').on('click', function(event){
        // selected tag Name
        var selectedTag = $(event.target);
        var onElement = $('a[class~=on]');
        var isOn = false;

        // 현재 클릭된 탭이 on을 가졌는지 확인
        isOn = $(selectedTag).hasClass('on');

        // on을 가지지 않을 경우 실행
        if(!isOn){            
            $($(onElement).attr('href')).hide();
            $(onElement).removeClass('on');
           
            $(selectedTag).addClass('on');
            $($(selectedTag).attr('href')).show();
            sevenui.event_slider.init();
            sevenui.reward_slider.init();
        }
        return false;
    })
}

