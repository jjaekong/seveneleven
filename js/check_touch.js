//contents 상단에 붙이는 기준 스크롤높이
var sticky_scroll_h = 0;
//contents iframe 높이
var iframe_h = 0;
$(document).ready(function(){        
    //메인 div에서 touchstart 체크 - touch start point (for slide up/down check)
    var main_ts = 0;
    $('.main').bind('touchstart', function(e) {                
        var window_top = $(window).scrollTop();
        main_ts = e.originalEvent.touches[0].pageY;
        
        //sticky_scroll_h 값을 받아온다
        sticky_scroll_h = get_sticky_scroll_h();
    });


    //메인 div에서 touchmove 체크                            
    $('.main').bind('touchmove', function(e) {
        var window_top = $(window).scrollTop();                                

        //현재 메인슬라이드가 마지막페이지가 아니면
        if(now_slide_val < last_slide_val)
        {            
            //슬라이드 안되게 차단한다.
            e.preventDefault();            
        //현재 메인슬라이드가 마지막 페이지면
        }else{

        }                                    
    });

    //메인 div에서 touchend 체크    
    $('.main').bind('touchend', function(e) {
        var window_top = $(window).scrollTop();                
        var main_te = e.originalEvent.changedTouches[0].pageY;                  

        //현재 메인슬라이드가 마지막페이지가 아니면
        if(now_slide_val < last_slide_val)
        {                    
            //main_slider.goToPrevSlide();
        //현재 메인슬라이드가 마지막 페이지면
        }else{
            //slide down
            if (main_ts > main_te) {
                //슬라이드 다운일 때 window_top이 sticky_scroll_h 이하이면 
                //body window_top을 sticky_scroll_h로 이동 (for 메뉴 상단 고정 이동)
                if(window_top < sticky_scroll_h)
                {
                    if(sticky_val == 0)
                    {
                        $('html, body').stop().animate({scrollTop : sticky_scroll_h}, 200);
                        //메뉴가 상단에 붙으면 sticky_val 을 1로 바꿔 더이상 작동하지 않게 한다. (오작동 최소화)
                        sticky_val = 1;    
                        
                        $('.menu_bottom').stop().animate({bottom : '0%'}, 200);
                    }

                }
            //slide up
            }else{
                $('.menu_bottom').stop().animate({bottom : '-10%'}, 200);
            }
        }
    });

    //contents_iframe으로부터 데이터 받아 스크롤 처리
//    window.onmessage = function(e){
//        var window_top = $(window).scrollTop();            
//        if(e.data == 't_start')
//        {
//            //sticky_scroll_h 값을 받아온다
//            sticky_scroll_h = get_sticky_scroll_h();    
//            
//            if(window_top < sticky_scroll_h)
//            {
//                sticky_val = 0;
//            }
//                        
//        }else if(e.data == 'down')
//        {           
//            $('.menu_bottom').stop().animate({bottom : '0%'}, 200);
//            //슬라이드 다운일 때 window_top이 sticky_scroll_h 이하이면 
//            //body window_top을 sticky_scroll_h로 이동 (for 메뉴 상단 고정 이동)
//            if(window_top < sticky_scroll_h)
//            {
//                if(sticky_val == 0)
//                {
//                    $('html, body').stop().animate({scrollTop : sticky_scroll_h}, 200);
//                    //메뉴가 상단에 붙으면 sticky_val 을 1로 바꿔 더이상 작동하지 않게 한다. (오작동 최소화)
//                    sticky_val = 1;                                        
//                }
//            }                        
//        }else if(e.data == 'up')
//        {
//            $('.menu_bottom').stop().animate({bottom : '-10%'}, 200);
//            //슬라이드 업일 때 window_top이 sticky_scroll_h 이상이면 
//            //body window_top을 sticky_scroll_h로 이동 (for 메뉴 상단 고정 이동)
//            if(window_top <= sticky_scroll_h)
//            {
//                $('html, body').stop().animate({scrollTop : 0}, 200);
//                sticky_val = 0;                                    
//            }     
//
//            if(sticky_val == 0)
//            {
//                return false;
//            }
//
//            if(sticky_val == 1)
//            {
//                //스크롤 발생 이후 0.1초 후 스크롤 멈춤으로 판단한다.
//                //스크롤이 멈췄을 때 window_top이 sticky_scroll_h보다 작으면
//                //상단 main_menu에 contents div를 붙여 준다.
//                clearTimeout( $.data( this, "scrollCheck" ) );
//                $.data( this, "scrollCheck", setTimeout(function() {
//                    var window_top = $(window).scrollTop();    
//
//                    if(window_top < sticky_scroll_h)
//                    {
//                        $('html, body').stop().animate({scrollTop : sticky_scroll_h}, 200);
//                        //메뉴가 상단에 붙으면 sticky_val 을 1로 바꿔 더이상 작동하지 않게 한다. (오작동 최소화)
//                        sticky_val = 1;    
//                    }    
//                }, 700) );        
//            }
//        }else{
//            iframe_h = e.data;
//            //contents iframe 높이 지정
//            set_iframe_h(iframe_h);
//        }
//    }
    
    //contents div에서 touchstart 체크 - touch start point (for slide up/down check)
    var contents_ts = 0;
    $('.contents').bind('touchstart', function(e) {
        var window_top = $(window).scrollTop();
        contents_ts = e.originalEvent.touches[0].pageY;

        //sticky_scroll_h 값을 받아온다
        sticky_scroll_h = get_sticky_scroll_h();        

        if(window_top < sticky_scroll_h)
        {
            sticky_val = 0;
        }                               
    });

    //contents div에서 터치슬라이드체크            
    $('.contents').bind('touchmove', function(e) {
        var window_top = $(window).scrollTop();                                 
    });

    var contents_te = 0;
    //.contents div에서 touchend 체크
    $('.contents').bind('touchend', function(e) {        
        var window_top = $(window).scrollTop();                  
        
        //스크롤 메뉴에서는 세로 슬라이드가 먹지 않도록 
        //스크롤 메뉴의 스크롤 높이 값을 계산한다.        
        var scroll_menu_h_s = $(".main").height();              
        var main_menu_h = $(".main_menu").outerHeight();
        
                
        //터치한 곳 스크롤 위치 from top
        //touch end point
        var contents_te = e.originalEvent.changedTouches[0].pageY;                  
        
        //slide down
        if (contents_ts > contents_te) {   
            $('.menu_bottom').stop().animate({bottom : '0%'}, 200);
            //슬라이드 다운일 때 window_top이 sticky_scroll_h 이하이면 
            //body window_top을 sticky_scroll_h로 이동 (for 메뉴 상단 고정 이동)
            if(window_top < sticky_scroll_h)
            {
                if(sticky_val == 0)
                {
                    $('html, body').stop().animate({scrollTop : sticky_scroll_h}, 200);
                    //메뉴가 상단에 붙으면 sticky_val 을 1로 바꿔 더이상 작동하지 않게 한다. (오작동 최소화)
                    sticky_val = 1;                    
                }
            }            
        //slide up
        } else if(contents_ts < contents_te){   
            $('.menu_bottom').stop().animate({bottom : '-10%'}, 200);
            //슬라이드 업일 때 window_top이 sticky_scroll_h 이상이면 
            //body window_top을 sticky_scroll_h로 이동 (for 메뉴 상단 고정 이동)
            if(window_top <= sticky_scroll_h)
            {
                $('html, body').stop().animate({scrollTop : 0}, 200);
                sticky_val = 0;                    
            }     

            if(sticky_val == 0)
            {
                return false;
            }

            if(sticky_val == 1)
            {
                //스크롤 발생 이후 0.1초 후 스크롤 멈춤으로 판단한다.
                //스크롤이 멈췄을 때 window_top이 sticky_scroll_h보다 작으면
                //상단 main_menu에 contents div를 붙여 준다.
                clearTimeout( $.data( this, "scrollCheck" ) );
                $.data( this, "scrollCheck", setTimeout(function() {
                    var window_top = $(window).scrollTop();    

                    if(window_top < sticky_scroll_h)
                    {
                        $('html, body').stop().animate({scrollTop : sticky_scroll_h}, 200);
                        //메뉴가 상단에 붙으면 sticky_val 을 1로 바꿔 더이상 작동하지 않게 한다. (오작동 최소화)
                        sticky_val = 1;    
                    }    
                }, 700) );        
            }
        }                   
    });
        
    //contents div에서 터치슬라이드체크            
    $('.main_menu').bind('touchmove', function(e) {
        e.preventDefault();       
    });

});

//스크롤 상단에 붙이는 기준 높이를 구한다.
//sticky_scroll_h = 메인스크롤 화면의 전체 높이 - 메인메뉴 높이     
function get_sticky_scroll_h()
{
    main_h = $(".main").height();
    main_menu_h = $(".main_menu").outerHeight();
    var get_sticky_scroll_h = main_h - main_menu_h;   

    return get_sticky_scroll_h;
}

function set_iframe_h(get_parameter)
{        
    $('.contents').attr("height", get_parameter);    
}