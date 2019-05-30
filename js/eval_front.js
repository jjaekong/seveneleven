$('.starbox input:radio').on('change', function(){
    var starList = $('.starbox li');
    var nextAll = $(this).parent('li').nextAll();
    starList.addClass('on');
    nextAll.removeClass('on');
});