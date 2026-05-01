var swiperInstance;

// 有効化時のオプション
function initializeSwiper() {
    swiperInstance = new Swiper('.p-voice__swiper', {
        spaceBetween: 0,
        slidesPerView: 1,
        initialSlide: 0, // 1枚目から開始
        loop: true, // 最終スライド後に先頭へ戻る
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

// 無効化
function destroySwiper() {
    if (swiperInstance) {
        swiperInstance.destroy();
        swiperInstance = undefined;
    }
}

// 画面幅による制御
function handleResize() {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (w < 768) {
        if (!swiperInstance) {
            initializeSwiper();
        }
    } else {
        destroySwiper();
    }
}

// 初回実行
handleResize();
window.addEventListener('resize', handleResize);


document.addEventListener('DOMContentLoaded', function() {
    /* ==========================
      ヘッダーのスクロールアニメーション
    ========================== */
    let beforePos = 0;
    const header = document.querySelector('drawer__icon');

    function scrollAnime() {
        const scroll = window.pageYOffset || document.documentElement.scrollTop;
        if (!header) return;

        if (scroll === 0) {
            header.classList.remove('js-down');
        } else if (scroll < beforePos) {
            // 上にスクロール
            header.classList.remove('js-up');
            header.classList.add('js-down');
        } else {
            // 下にスクロール
            header.classList.remove('js-down');
            header.classList.add('js-up');
        }

        beforePos = scroll;
    }

    window.addEventListener('scroll', scrollAnime);


    /* ==========================
      アコーディオン（slideToggle相当）
    ========================== */
    const accordions = document.querySelectorAll('.js-accordion');

    accordions.forEach(function(accordion) {
        accordion.addEventListener('click', function() {
            const target = accordion.querySelector('ul');
            if (!target) return;

            // 初期スタイル（1回だけ設定してもOK）
            target.style.overflow = 'hidden';
            target.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';

            accordion.classList.toggle('is-active');

            if (target.style.maxHeight && target.style.maxHeight !== '0px') {
                target.style.maxHeight = '0px';
                target.style.opacity = '0';
            } else {
                target.style.display = 'block';
                target.style.maxHeight = target.scrollHeight + 'px';
                target.style.opacity = '1';
            }
        });
    });


});