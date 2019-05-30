// 탭 스타일 테스트
// $('.store_tab .tab').on('click', function () {
//     $('.store_tab .tab').removeClass('on');
//     $(this).addClass('on');
// });

// 점포 레이어
var storeLayerHtml = $('#storeLayer').html();
var isStoreLayer = false;
var btnFixed = $('.bottom_fixed .btn_common');

// 검색점포 리스트
$('.store_list').each(function(){
    var resultRadio = $(this).find('input:radio');
    var listCont = $(this).find('.list_cont');
    resultRadio.on('change', function(){
        $('.store_list').removeClass('on');
        $(this).parents('.store_list').addClass('on');
        btnFixed.removeClass('disabled').removeAttr('disabled');
    });

    var storeTypeBtn = $(this).find('.store_type');
    storeTypeBtn.on('click', function(e){
        layerInit();
        listCont.append(storeLayerHtml);
        layerEvent();
    });
});

function layerEvent(){
    $('.layer_storelabel').each(function(){
        isStoreLayer = true;
        var thisLayer = $(this);
        var closeBtn = $(this).find('.close');

        // 외부영역 클릭시 닫기
        $(document).on('click', function(e){
            var thisLayer = $('.layer_storelabel')
            var parentClass = e.target.parentNode.className;
            var isStoreBtn = parentClass === 'store_type' || parentClass === 'store';
            if(thisLayer.has(e.target).length === 0 && !isStoreBtn){
                layerClose(thisLayer);
            }
        });

        closeBtn.on('click', function(){
            layerClose(thisLayer);
        });

        function layerClose(target){
            target.remove();
            isStoreLayer = false;
        }
    });
}


function layerInit(){
    $('.layer_storelabel').remove();
}

$('.pin').on('click', function(){
    var mapOffsetTop = $('.map').offset().top;
    var topBarHeight = $('.top_bar_back').height();
    var storeList = $(this).parents('.store_list');
    var isMapType = $(this).parents().hasClass('maptype');

    $('.pin').removeClass('on');
    $(this).addClass('on');

    // 기본 : 상단에 있는 지도영역으로 scroll
    if(!isMapType){
        $('html, body').animate({
            scrollTop:mapOffsetTop - topBarHeight
        });
    // 점포검색 타입 : 리스트 다음영역에 있는 지도 노출
    } else {

        var isMapOpen = storeList.next('.map')[0].style.display === 'block';

        if(isMapOpen){
            $(this).removeClass('on');
            storeList.next('.map').stop().slideUp();
        } else{
            $('.map').stop().slideUp();
            storeList.next('.map').stop().slideToggle();
        }
    }
});


// 점포 검색 입력값 초기화
var serchIpt = $('#storeSearch');
var serchDelBtn = $('#searchDelete');
serchDelBtn.on('click', function(){
    serchIpt.val('');
});
