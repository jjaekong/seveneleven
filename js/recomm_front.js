$(document).ready(function(event) {

    // 추천상품 slider
    var recomm_slider = new Swiper('.recomm_slider', {
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 'auto'
    });

    /**
     * 스와이퍼 갯수에 따라 destroy 분기
     */
    var singleSlide = recomm_slider.$el !== undefined;

    // 스와이퍼 2개 이상일 경우
    if(!singleSlide){
        recomm_slider.map(function(slider){
            destroyCheck(slider);
        });
    // 스와이퍼 1개일 경우
    } else {
        destroyCheck(recomm_slider);
    }

    function destroyCheck(recomm_slider){
        var isSingle = recomm_slider.slides.length === 1;
        var controller = '.swiper-pagination, .swiper-control';
        if(isSingle){
            $(recomm_slider.$el.find(controller)).hide();
            recomm_slider.destroy();
        } else {
            $(recomm_slider.$el.find(controller)).not('.swiper-button-disabled').show();
        }  
    }
    
    
});