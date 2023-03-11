$(function() {
    // ハンバーガー
    $('.hamburger').click(function() {
        $(this).toggleClass('active');
 
        if ($(this).hasClass('active')) {
            $('.globalMenuSp').addClass('active');
        } else {
            $('.globalMenuSp').removeClass('active');
        }
    });

    // プロジェクトのモーダル
    const opens = $('[class*="modal-open"]'),
        close = $('.modal-close'),
        container = $('.modal-container'),
        iframe = $('.modal-content iframe');
    function modalOpen(e) {
        const type = $(e.target).closest('.card').children('.type').text();
        const src = $(e.target).closest('.card').children('.src').text();

        if (type == 'link') {
            window.open(src, '_blank')
        } else if (type == 'iframe') {
            container.addClass('active');
            iframe.attr('src', src + '?embed=true');
        }
        // モーダル外クリックに伝播させない
        return false;
    }
    function modalClose() {
        container.removeClass('active');
        iframe.attr('src', '');
    }
	opens.on('click', modalOpen);
	close.on('click', modalClose);
	$(document).on('click', function(e) {
		if(!$(e.target).closest('.modal-body').length) {
            modalClose();
		}
	});
    
    // コピーライトの年数
    const now = new Date();
    const year = now.getFullYear();
    $('.copyright p').append(year);
    
    // スクロール時
    $(window).scroll(function () {
        const scrollAmount = $(window).scrollTop();
        const wHeight = $(window).height();
        const dHeight = $(document).height();
        const maxScrollAmount = dHeight - wHeight;

        // ヘッダーメニューのハイライト
        const aboutPosition = $('#about-anc').offset().top;
        const skillPosition = $('#skill-anc').offset().top;
        const developPosition = $('#develop-anc').offset().top;
        let nth = 1;
        if (scrollAmount >= developPosition || scrollAmount == maxScrollAmount) {
            nth = 4;
        } else if (scrollAmount >= skillPosition) {
            nth = 3;
        } else if (scrollAmount >= aboutPosition) {
            nth = 2;   
        }
        const allNav = $('header nav.normal-menu li a');
        const targetNav = $('header nav.normal-menu li:nth-child(' + nth + ') a');
        allNav.removeClass('invert');
        targetNav.addClass('invert');

        // 要素のフェイドイン
        let buffer;
        if ($(window).width() >= 835) {
          buffer = 200;
        } else {
          buffer = 100;
        }
        $('.js-fadein').each(function () {
          const targetPosition = $(this).offset().top;
          if (scrollAmount > targetPosition - wHeight + buffer || scrollAmount == maxScrollAmount) {
            $(this).addClass("is-fadein");
          }
        });
    });

});