// 직접입력 값 초기화
var directBtn = $('.dev_top .btn_direct');
directBtn.on('click', function(){
    var selectBtn = $(this);
    var inputBox = selectBtn.parent().next().find('.form_box input');
    inputBox.val('');
});


// 배달물품 직접입력
$('#selectItem').on('change', function(){
    $('#selectItem option:selected').each(function(){
        if($(this).val() == '1'){
            //직접입력일 경우
            $('#direct_form').show();
        } else {
            //직접입력 아닐 경우
            $('#direct_form').hide();
        }
    })
});

// 주소록 리스트
var isAddrRegist = $('#addressRegist').length > 0;

$('.addr_list').each(function(){
    var resultRadio = $(this).find('input:radio');
    var listCont = $(this).find('.list_cont');

    resultRadio.on('change', function(){
        $('.addr_list').removeClass('on');
        $(this).parents('.addr_list').addClass('on');

        // 주소등록 화면의 경우 하단 버튼 변경
        if(isAddrRegist){
            $('#btnAddrGroup').addClass('col-2');
            $('#btnAddrRegist').addClass('gray');
            $('#btnAddrSelect').show();
        }
    });
});