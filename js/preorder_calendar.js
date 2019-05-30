$(function() {
    // datepicker korea
    $.datepicker.regional['ko'] = {
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '.',
        minDate: 1,
        onSelect : function(){
            // calendar event
            var $this = $(this);
            var toggleCont = $this.parent('.list_toggle_cont');
            var toggleContParent = toggleCont.closest('li');

            toggleCont.slideUp();
            toggleInit($(this));

            toggleContParent.stop().slideDown(1000, function(){
                // 바로뜨게
                var nextToggle = $(this).next().find('.list_toggle_cont');
                nextToggle.slideDown();
                nextToggle.prev('.reserv_wrap').find('.list_toggle').addClass('on');

                // 조금뒤에 
                // var _this = $(this);
                // setTimeout(function(){
                // var nextToggle = _this.next().find('.list_toggle_cont'); 
                //     nextToggle.slideDown();
                //     nextToggle.prev('.reserv_wrap').find('.list_toggle').addClass('on');
                // },400)
            });
        }
    };


    $.datepicker.setDefaults($.datepicker.regional['ko']);

    $(function() {
        $("#datepicker").datepicker();
        $('.ui-state-active').addClass('init'); //default 선택 가능일자 스타일 초기화
    });    

    // preorder time select
    $('.reserv_time li').on('click', function(){
        $(this).addClass('on').siblings().removeClass('on');
    })

    // preorder time text change
    $('.reserv_time li button').bind('click', function(){
        var btnSelTime = $(this).text();
        $('.txt_selTime').text(btnSelTime);

        toggleInit($(this));
    });

    function toggleInit(clickElem){
        var toggleCont = clickElem.parents().find('.toggle_box').find('.list_toggle_cont');
        var toggleBtn = clickElem.parents().find('.toggle_box').find('.list_toggle');
        toggleCont.slideUp();
        toggleBtn.removeClass('on');
    }

    // toggle on/off 
    var toggleBox = $('.toggle_box');
    toggleBox.each(function(){
        var toggleBtn = $(this).find('.list_toggle');
        var allToggleBox = $(this).siblings('.toggle_box');
        var allToggleCont = allToggleBox.find('.list_toggle_cont');
        var alltoggleBtn = allToggleBox.find('.list_toggle');

        toggleBtn.on('click', function(){
            allToggleCont.slideUp();
            alltoggleBtn.removeClass('on');
            $(this).toggleClass('on');
            var thisToggleCont = $(this).parents('li').find('.list_toggle_cont');
            thisToggleCont.slideToggle();
        });
    });

    
});
