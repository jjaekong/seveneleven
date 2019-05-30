// 리워드 선물하기/보상받기 레이어
var rewardBtns = $('.btn_fixed').find('.btn_common');
var isReward = rewardBtns.length > 0;

if(isReward){
    rewardLayer();
}

function rewardLayer(){
    var layerReward = $('.layer_reward');
    var btnRewardClose = $('.reward_close');
    
    layerReward.show();
    rewardBtns.each(function(){
        var $thisBtn = $(this);
        
        $thisBtn.on('click', function(){
            rewardBtns.removeClass('active');
            $thisBtn.addClass('active');
    
            var layerId = $thisBtn.attr('id').slice(3);
            layerReward.removeClass('open');
            $('#layer'+ layerId).addClass('open');
        });
    });
    
    btnRewardClose.on('click', function(){
        var thisLayer = $(this).parent(layerReward);
        rewardBtns.removeClass('active');
        thisLayer.removeClass('open');
    });
}


// 당첨자발표 입력값 초기화
var serchIpt = $('#winnerSearch');
var serchDelBtn = $('#searchDelete');
serchDelBtn.on('click', function(){
    serchIpt.val('');
});

// 리워드 스탬프 사이드 라운드처리
$('.reward_stamp_coupon').each(function(){
    $(this).prepend('<div class="side_round"><span class="crc1"></span><span class="crc2"></span><span class="crc3"></span><span class="crc4"></span></div>');
});


// 리워드 배너 슬라이더로 사용시 아래 스크립트 사용
/* 
$('.reward_banner_slider').each(function(){

    var $this = $(this);
    var slideLeng = $this.find('.swiper-slide').length;
    var autoFlag = slideLeng > 1 ? true : false;    
    var controller = $this.find('.swiper-control');
    var btnPlay = $this.find('.swiper-autoplay button');

    var reward_slider = new Swiper($this, {
        loop: autoFlag,
        autoplay: autoFlag,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
        }
    });

    if(autoFlag){
        controller.show();
        slideControl();
    } else {
        reward_slider.destroy();
        controller.hide();
    }

    function slideControl(){
        btnPlay.on('click', function(){
            if($(this).is('.stop')){
                reward_slider.autoplay.stop();
                $(this).removeClass('stop').addClass('play').text('재생');
            }else {
                reward_slider.autoplay.start();
                $(this).removeClass('play').addClass('stop').text('정지');  
            }                
        });    
    }
});
*/
