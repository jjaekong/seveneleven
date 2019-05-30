//메인 상단 슬라이드 페이지 갯수 저장하기 위한 변수
var last_slide_val = 0;
var now_slide_val = 0;

//메뉴페이지 상단에 달라붙었는지 체크하는 밸류
var sticky_val = 0;
//main_div 높이
var main_h = 0;
//main_menu 높이
var main_menu_h = 0;
//scroll_menu 높이
var scrollmenu_h = 0;
//scroll_menu 가로 스크롤
var offsetmenu = 0;
//메인 상단 슬라이더
var main_slider = '';

$(document).ready(function(){       
    main_h = $(".main").height();
    main_menu_h = $(".main_menu").outerHeight();
      
    
//    main_slider = $('.bxslider').bxSlider({
//        mode: 'vertical',        
//        slideMargin: 0,  
//        controls: false,
//        infiniteLoop: false,
//        pager: false,
//        auto: false,
//        startSlide: 2, //슬라이드 갯수를 집어넣는다 ( 마지막 페이지 부터 보여주기 위함 )        
//        onSliderLoad:function(currentIndex){            
//            now_slide_val = currentIndex;              
//        },
//        onSlideBefore:function(slideElement, oldIndex, newIndex){
//            var page_num = newIndex+1;            
//            
//            //메인슬라이드 메인 카피 중앙정렬
//            var div_width = $('#main_copy_'+page_num).width()/2;           
//            $('#main_copy_'+page_num).css('margin-left', '-'+div_width+'px');
//        },
//        onSlideAfter:function(slideElement, oldIndex, newIndex){ 
//            now_slide_val = newIndex;                          
//            console.log(newIndex);
//        },        
//    }); 
    
    $('.main_slider')
    .on('init', function(event, slick){
        now_slide_val = slick.slideCount-1;    
        last_slide_val = slick.slideCount-1;     
        
        var div_width = $('#main_copy_'+slick.slideCount).width()/2;           
        $('#main_copy_'+now_slide_val).css('margin-left', '-'+div_width+'px');
    })
    .on('beforeChange', function(event, slick, currentSlide, nextSlide){        
        var page_num = nextSlide+1;                        
        //메인슬라이드 메인 카피 중앙정렬
        //var div_width = $('#main_copy_'+page_num).width()/2;           
        //$('#main_copy_'+page_num).css('margin-left', '-'+div_width+'px');
    })
    .on('afterChange', function(event, slick, currentSlide, nextSlide){                
        now_slide_val = currentSlide;             
    });
    
    $('.main_slider').slick({
        vertical : true,
        verticalSwiping : true,
        prevArrow : $('.arrow_up'),
        nextArrow : $('.arrow_down'),
        infinite : false,
        initialSlide : 2
    });
        

    
    //처음 시작시 마지막 슬라이드에서 시작하게 하기 위해서
    //전체 슬라이드의 갯수를 받아온다. 슬라이드는 0부터 시작하기 때문에 갯수에서 1을 빼준다.
    
    //마지막 페이지에서 슬라이드 처리하기 위해서
    //메인 상단 슬라이드의 갯수를 last_slide_val에 저장한다.            
    //last_slide_val = main_slider.getSlideCount()-1;                
    
    //메인 슬라이드 마지막 페이지부터 시작되게
    
    
    $(window).scroll(function(){
        var window_top = $(window).scrollTop();          
                
        //화면 최상단일 때
        if(window_top < sticky_scroll_h)
        {
            if(window_top == 0)
            {
                //하단 뒤로가기 버튼 및 Top 버튼 없애기
                $('.icon_back').stop().fadeOut();
                $('.icon_top').stop().fadeOut();    
            }else{
                //하단 뒤로가기 버튼 및 Top 버튼 fadeIn
                $('.icon_back').stop().fadeIn();
                $('.icon_top').stop().fadeIn();
            }
            
            
            $('.blank_scrollmenu').height(0);
            $('.scrollmenu').css("position", "relative").css("top", "0");   
            //$('.scrollmenu').scrollLeft(offsetmenu.left);      
            
            //메뉴 이미지 변경 및 스크롤메뉴 탈부착
            $('.main_menu').css("background", "");                
            $('.main_menu .main_logo').stop().fadeOut(10);
            $('.icon_3line img').attr("src", "http://seven.connected8.com/images/menu/icon_3line_white.png");                
            //$('.menu_bottom').stop().animate({bottom : '-10%'}, 200);            
                                    
        }else{
            scrollmenu_h = $(".scrollmenu").outerHeight();  
            //메뉴 이미지 변경 및 스크롤메뉴 탈부착
            $('.blank_scrollmenu').height(scrollmenu_h);
            $('.scrollmenu').css("position", "fixed").css("z-index", 3).css("top", main_menu_h-1);
            //$('.scrollmenu').scrollLeft(offsetmenu.left);      
            
            $('.main_menu').css("background", "white");                
            $('.main_menu .main_logo').stop().fadeIn();
            $('.icon_3line img').attr("src", "http://seven.connected8.com/images/menu/icon_3line_green.png");
            //$('.menu_bottom').stop().animate({bottom : '0%'}, 200);
                        
        }                                     
    });                        
    
    //메뉴별로 가로 스크롤 이동 설정
    //해당 메뉴의 offset을 가져와서 페이지 접속 시 자동 이동 시켜준다.
    offsetmenu = $('.scrollmenu #menu_4').offset();    
    $('.scrollmenu').scrollLeft(offsetmenu.left);                                    

    //메인슬라이드 메인 카피 중앙정렬
    var div_width = $('.main_copy').width()/2+10;           
    $('.main_copy').css('margin-left', '-'+div_width+'px');

    

    $('#left_btn_x').click(function(){
        $('.left_ad').fadeOut(); 
    });

    $('#right_btn_x').click(function(){
        $('.right_ad').fadeOut(); 
    });

    $('.icon_top img').click(function(){
        sticky_val = 0;
        $('.menu_bottom').animate({bottom : '-10%'}, 200);
        $('html, body').animate({scrollTop : 0}, 500);
    });

    $('.icon_3line').click(function(){        
        $('.menu_slide').show();
        $('.menu_slide .menu_contents').animate({right: '0%'}, 300);      
        $('.menu_slide .btn_menu_close').animate({right: '85%'}, 300);   
        //$('body').css({overflow:'visible'}).bind('touchmove', function(e){e.preventDefault()});
    });
    
    $('.btn_menu_close').click(function(){
        $('.menu_slide .menu_contents').animate({right: '-90%'}, 300);
        $('.menu_slide .btn_menu_close').animate({right: '-8%'}, 300);
        $('.menu_slide').fadeOut();
        //$('body').unbind('touchmove');
    });
            
});


