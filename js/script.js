jQuery(function($) {


    var topBtn = $(".js-pageTop");
    topBtn.hide();

    // ボタンの表示設定（767px以下の時のみ動作）
    function handlePageTopButton() {
        if ($(window).width() <= 767) {
            // 767px以下の時のみボタンの表示/非表示を制御
            if ($(this).scrollTop() > 80) {
                // 指定px以上のスクロールでボタンを表示
                topBtn.fadeIn();
            } else {
                // 画面が指定pxより上ならボタンを非表示
                topBtn.fadeOut();
            }
        } else {
            // 767pxより大きい時は非表示
            topBtn.fadeOut();
        }
    }

    $(window).scroll(handlePageTopButton);

    // ウィンドウリサイズ時にもチェック
    $(window).resize(function() {
        handlePageTopButton.call(this);
    });

    // ボタンをクリックしたらスクロールして上に戻る
    topBtn.click(function() {
        $("body,html").animate({
                scrollTop: 0,
            },
            300,
            "swing"
        );
        return false;
    });



    // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)

    $(document).on("click", 'a[href*="#"]', function() {
        let time = 400;
        let header = $("header").innerHeight();
        let target = $(this.hash);
        if (!target.length) return;
        let targetY = target.offset().top - header;
        $("html,body").animate({
                scrollTop: targetY,
            },
            time,
            "swing"
        );
        return false;
    });


    //youtube
    if ($(".js-modal-video").length) {
        $(".js-modal-video").modalVideo({
            channel: "youtube",
            youtube: {
                controls: 1, // コントロール表示（0は非表示）
            },
        });
    }



    //モーダル複数
    $('.js-modalOpen').click(function() {
        var modalId = $(this).attr('data-modal');
        $('.js-modalBlock').hide();
        $('#' + modalId).fadeIn(500);
        $('.js-modal').fadeIn(500);
    });

    $('.js-modalClose').click(function() {
        $('.js-modal, .js-modalBlock').fadeOut(500);
    });

    $('.js-modal').click(function(event) {
        if (!$(event.target).closest('.js-modalBlock').length) {
            $('.js-modal, .js-modalBlock').fadeOut(500);
        }
    });

    $('.js-modalBlock').click(function(event) {
        event.stopPropagation();
    });


    //モーダル1つ
    // $('.js-modalOpen').click(function() {
    //     $('.js-modal').fadeIn(500);
    // });

    // $('.js-modalClose').click(function() {
    //     $('.js-modal').fadeOut(500);
    // });

    // $('.js-modal').click(function(event) {
    //     if (!$(event.target).closest('.js-modalBlock').length) {
    //         $('.js-modal').fadeOut(500);
    //     }
    // });

    // $('.js-modalBlock').click(function(event) {
    //     event.stopPropagation();
    // });

    //swiper
    var swiper = new Swiper(".js-slider", {
        loop: true,
        effect: "fade",
        speed: 2000,
        allowTouchMove: false, // スワイプ無効
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        disableOnInteraction: false,
        loopAdditionalSlides: 1,
        centeredSlides: true,
        // 前後の矢印
        navigation: {
            nextEl: '.js-bannerNext',
            prevEl: '.js-bannerPrev',
        },
        pagination: {
            el: ".p-slider__pagination",
            clickable: true,
        },
    });

});


//gsap
document.addEventListener("DOMContentLoaded", function(event) {
    const loaderLogo = document.querySelector('.js-loader-logo');
    const loader = document.querySelector('.js-loader');
    // オープニングアニメ === === ==
    if (loaderLogo && loader) {
        const opening = gsap.timeline();
        opening.fromTo(
            '.js-loader-logo', {
                clipPath: "inset(0% 100% 0% 0%)",
            }, {
                clipPath: "inset(0% 0% 0% 0%)",
                autoAlpha: 1,
                ease: Power2.easeOut,
                delay: 0.1,
                duration: 1.2,
            }
        );
        opening.fromTo(
            '.js-loader', {
                clipPath: "inset(0% 0% 0% 0%)",
            }, {
                clipPath: "inset(0% 0% 0% 100%)",
                delay: 0.15,
                duration: 1.2,
                ease: Power2.easeOut,
            }
        )
        opening.to(
            '.js-loader', {
                display: "none",
            },
        )
        window.addEventListener("load", function() {
            opening.play();
        });
    }


    //フェードイン
    const customPosition = window.innerWidth < 768 ? 150 : 300;
    const startPosition = "top+=" + customPosition + " bottom";
    const fadeIns = gsap.utils.toArray('.js-fadeIn');
    fadeIns.forEach((fadeIn) => {
        gsap.fromTo(
            fadeIn, {
                y: 30,
                autoAlpha: 0,
            }, {
                y: 0,
                autoAlpha: 1,
                duration: 2,
                ease: Power2.easeOut,
                scrollTrigger: {
                    trigger: fadeIn,
                    start: startPosition,
                },
            }
        )
    });

    //スマホではスクロールして表示、PCではstaggerを使う
    const fadeIns2 = document.querySelectorAll('.js-fadeIn2');
    const fadeIn2Children = document.querySelectorAll('.js-fadeIn2-child');
    // ウィンドウの幅が767px以下かどうかをチェック
    let isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) {
        // Mobile (width <= 767px)
        fadeIn2Children.forEach((child) => {
            gsap.fromTo(
                child, {
                    autoAlpha: 0,
                    yPercent: 12,
                }, {
                    yPercent: 0,
                    autoAlpha: 1,
                    duration: 1.6,
                    ease: Power2.easeOut,
                    scrollTrigger: {
                        trigger: child,
                        start: startPosition,
                    }
                }
            );
        });
    } else {
        // Desktop (width > 767px)
        fadeIns2.forEach((fadeIn2) => {
            gsap.fromTo(
                fadeIn2.querySelectorAll('.js-fadeIn2-child'), {
                    autoAlpha: 0,
                    yPercent: 12,
                }, {
                    yPercent: 0,
                    autoAlpha: 1,
                    duration: 1.6,
                    ease: Power2.easeOut,
                    scrollTrigger: {
                        trigger: fadeIn2,
                        start: startPosition,
                    },
                    stagger: {
                        each: 0.4,
                    }
                }
            );
        });
    }

    // 一筆書きアニメーション（SVG path）
    const svgPath = document.querySelector('.svg-aaa__path');
    if (svgPath) {
        const pathLength = svgPath.getTotalLength();
        svgPath.style.strokeDasharray = pathLength;
        svgPath.style.strokeDashoffset = pathLength;

        gsap.to(svgPath, {
            strokeDashoffset: 0,
            duration: 3,
            ease: Power2.easeInOut,
            scrollTrigger: {
                trigger: '.svg-aaa',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
            }
        });
    }

    // 三角形の落下アニメーション
    const triangleSection = document.querySelector('.p-triangle');
    if (triangleSection) {
        const triangleItems = gsap.utils.toArray('.p-triangle__item');

        // スクロール量に追従する（scrub）タイムライン
        const tlTriangle = gsap.timeline({
            scrollTrigger: {
                trigger: triangleSection,
                start: 'top 85%',
                end: 'bottom 15%',
                scrub: 1,
            }
        });

        triangleItems.forEach((item) => {
            const delay = parseFloat(item.getAttribute('data-delay')) || 0;
            tlTriangle.fromTo(item, {
                y: -220,
                autoAlpha: 0,
                rotation: gsap.utils.random(-25, 25),
            }, {
                y: 0,
                autoAlpha: 1,
                rotation: 0,
                duration: 0.8,
                ease: Power2.easeOut,
            }, delay);
        });
    }
});

// ハンバーガーメニュー
// document.addEventListener('DOMContentLoaded', function() {
//     const hamburger = document.querySelector('.js-hamburger');
//     const headerHamburger = document.querySelector('.p-header__hamburger');
//     const spNav = document.querySelector('.js-spNav');

//     if (hamburger) {
//         hamburger.addEventListener('click', function() {
//             if (headerHamburger) {
//                 headerHamburger.classList.toggle('js-open');
//             }
//             if (spNav) {
//                 spNav.classList.toggle('js-open');
//             }
//             document.body.classList.toggle('noscroll');
//         });
//     }

//     // アコーディオンメニュー
//     const accordionLinks = document.querySelectorAll('.js-accordion .p-spNav__link');
//     accordionLinks.forEach(function(link) {
//         link.addEventListener('click', function(e) {
//             e.preventDefault();
//             const accordion = this.closest('.js-accordion');
//             if (accordion) {
//                 const accordionContent = accordion.querySelector('.c-accordion');
//                 if (accordionContent) {
//                     const isActive = accordion.classList.contains('is-active');

//                     if (isActive) {
//                         // 閉じる
//                         accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
//                         // リフローを強制
//                         accordionContent.offsetHeight;
//                         accordionContent.style.maxHeight = '0px';
//                         accordionContent.style.opacity = '0';
//                         accordion.classList.remove('is-active');

//                         setTimeout(function() {
//                             accordionContent.style.display = 'none';
//                         }, 300);
//                     } else {
//                         // 開く
//                         accordionContent.style.display = 'block';
//                         accordionContent.style.maxHeight = '0px';
//                         accordionContent.style.opacity = '0';
//                         // リフローを強制
//                         accordionContent.offsetHeight;
//                         accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
//                         accordionContent.style.opacity = '1';
//                         accordion.classList.add('is-active');
//                     }
//                 }
//             }
//         });
//     });

//     // メニュー内のリンクをクリックしたらメニューを閉じる（アコーディオン以外）
//     const navLinks = document.querySelectorAll('.p-spNav__link');
//     navLinks.forEach(function(link) {
//         link.addEventListener('click', function() {
//             const parent = this.parentElement;
//             if (parent && !parent.classList.contains('js-accordion')) {
//                 if (headerHamburger) {
//                     headerHamburger.classList.remove('js-open');
//                 }
//                 if (spNav) {
//                     spNav.classList.remove('js-open');
//                 }
//                 document.body.classList.remove('noscroll');
//             }
//         });
//     });
// });
// 
document.addEventListener('DOMContentLoaded', function() {
    /* ==========================
      ヘッダーのスクロールアニメーション
    ========================== */
    let beforePos = 0;
    const header = document.querySelector('.p-header');

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
//iPhoneハック
if (navigator.userAgent.indexOf('iPhone') > 0) {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('iPhone');
}

if (navigator.userAgent.indexOf('Android') > 0) {
    let body = document.getElementsByTagName('html')[0];
    body.classList.add('Android');
}

/* ==========================
  ハンバーガーメニュー
========================== */
document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.querySelector('.drawer__icon');
    var drawer = document.querySelector('.drawer');

    if (hamburger && drawer) {
        // ハンバーガーアイコンをクリックで開閉
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('js-show');
            drawer.classList.toggle('js-show');
            document.body.classList.toggle('noscroll');
        });

        // ドロワー内のリンクをクリックしたらメニューを閉じる
        var drawerLinks = drawer.querySelectorAll('a');
        drawerLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('js-show');
                drawer.classList.remove('js-show');
                document.body.classList.remove('noscroll');
            });
        });
    }
});