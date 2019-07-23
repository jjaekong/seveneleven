var sevenui = sevenui || {};

$(document).ready(function(event) {
    
    // 예약주문 main slider
    sevenui.preorder_top_slider = new Swiper('.preorder_top_slider', {
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        on: {
            init : function() {

                // slide 1 case
                if(this.slides.length == 3){
                     $(this.$el.find('.swiper-pagination, .swiper-num, .swiper-autoplay')).hide();
                }else{
                     $(this.$el.find('.swiper-pagination, .swiper-num, .swiper-autoplay')).show();
                }
                $(this.$el.find('.swiper-autoplay button')).on('click', function(){
                    if($(this).is('.stop')){
                        sevenui.preorder_top_slider.autoplay.stop();
                        $(this).removeClass('stop').addClass('play').text('재생');
                    }else {
                        sevenui.preorder_top_slider.autoplay.start();
                        $(this).removeClass('play').addClass('stop').text('정지'); 
                    }                
                })
            }
        }
    });
    if(sevenui.preorder_top_slider.slides != undefined && sevenui.preorder_top_slider.slides.length == 3) sevenui.preorder_top_slider.destroy();


    // 예약주문 main slider
    sevenui.preorder_fee_slider = new Swiper('.preorder_fee_slider', {
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        on: {
            init : function() {                
                // slide 1 case
                if(this.slides.length == 3){
                     $(this.$el.find('.swiper-pagination, .swiper-num, .swiper-autoplay')).hide();
                }else{
                     $(this.$el.find('.swiper-pagination, .swiper-num, .swiper-autoplay')).show();
                }   
                $(this.$el.find('.swiper-autoplay button')).on('click', function(){
                    if($(this).is('.stop')){
                        sevenui.preorder_fee_slider.autoplay.stop();
                        $(this).removeClass('stop').addClass('play').text('재생');
                    }else {
                        sevenui.preorder_fee_slider.autoplay.start();
                        $(this).removeClass('play').addClass('stop').text('정지');  
                    }                
                })
            }
        }
    });

    if(sevenui.preorder_fee_slider.slides != undefined && sevenui.preorder_fee_slider.slides.length == 3) sevenui.preorder_fee_slider.destroy();
    
    // ad area close
    $('.banner_area .ad_btn_x').on('click', function(){
        $(this).parents('.banner_area').fadeOut();
    })

    // zzim button
    $('.btn_zzim').on('click', function(){
        $(this).toggleClass('on');
    })

    // category button 
    // $('.category_box li button').on('click', function(){
    //     $(this).addClass('on');
    //     $(this).parents('li').siblings().find('button').removeClass('on');
    // })

    // item detail tab
    $('.item_detail_tab li').on('click', function(){
        var index = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        $('.item_detail_cont > .tab_cont').eq(index).addClass('on').siblings().removeClass('on');
    })
});


