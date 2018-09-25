/*global window  $ jquery require*/
// const $ = require('./jquery.min.js');


var icon = $('img[src^="https://developers.google.com/"]');
(function ($, window, document) {
    "use strict";
    //vars gloal
    var mainheader = $('#home'),
        $navbar = $('nav.navbar'),
        $parralex = $('.AKparallex'),
        $navLinks = $('nav.navbar .navbar-nav a'),
        curent = [],
        lock,
        scrollTop = function ($scrollTop) {

                if ($windowScroll >= 1500) {
                    $scrollTop.css({
                        transform: 'translate3d(0,0,0)'
                    })
                } else {
                    $scrollTop.css({
                        transform: 'translate3d(5rem,0,0)'
                    })
                }


        },
        $windowScroll = null;
//remove focus on click for buttons
    document.addEventListener('click', function (e) {
        if (document.activeElement.toString() === '[object HTMLButtonElement]') {
            document.activeElement.blur();
        }


    })
    $(function () {
        $("body").niceScroll({
            cursorcolor: '#a9578bfa',
            cursorwidth: '10px'
        });
    });
    //resize
    var resize = function () {
        mainheader.find('.head-wrapper').height($(window).innerHeight());
    };
    resize();
    $(window).on('resize', resize);
    //scroll to top

    //perallax

    function perallax() {
        var x = $(window).scrollTop(),
            initScroll = initScroll || 0;

        function getInitScroll() {
            if (initScroll <= 80) {
                initScroll = initScroll + (x / mainheader.height()) * 400;
                $('.speach').css('opacity', '0').find('p').css('opacity', '1');
                if (initScroll >= 30) {
                    $('.speach').css('opacity', '1').find('p').css('opacity', '1');
                }
                if (initScroll > 80) {
                    initScroll = 80;
                }
            } else {
                initScroll = 100;

            }
        }

        if (mainheader.height() > x) {
            getInitScroll();
            $parralex.css("transform", `translate3d(0, ${-initScroll}%, 0)`)
        } else {
            initScroll = 0;
            $parralex.css("transform", `translate3d(0, ${-initScroll}%, 0)`)
        }

    };
    $(window).on('scroll', function (e) {
        $windowScroll = $(window).scrollTop();
        lock = lock || 2;
        ///sync navigation
        navScrollSync($windowScroll);
        perallax();
        if ($windowScroll + 400 >= $('#statistics').offset().top && lock === 2) {
            // init count to js
            lock = 3;
            $('.timer').countTo({
                from: 50,
                to: 25000,
                speed: 1000,
                refreshInterval: 50,
                formatter: function (value, options) {
                    return value.toFixed(options.decimals);
                },

            });
        }
    });
    //scroll to top

    //slider
    (function () {
        //var
        var next = $('#testimonials .ak-next'),
            prev = $('#testimonials .ak-prev'),
            testMon = $('.slider-body'),
            controls = $("#testimonials .ak-controls")

        //slider init
        testMon.slick({
            customPaging: function (slider, i) {
                return "<a class='dot" + i + 1 + "'><img class='img-fluid' src='img/testimonials/0" + (i + 1) + ".jpg' alt='user-feedback-avatar'> </a>"
            },
            centerMode: true,
            appendDots: $('#testimonials .ak-controls'),
            prevArrow: prev,
            nextArrow: next,
            dots: true,
            infinite: true,
            slidesToShow: 3,
            adaptiveHeight: true,
            slidesToScroll: 1,
            centerMode: true,
            appendDots: controls,
            dotsClass: "ak-dots",
            centerPadding: "0",
            speed: 500,
            cssEase: 'linear',
            responsive: [{
                breakpoint: 920,
                settings: {
                    slidesToShow: 1,
                    infinite: true
                }
            }
            ]


        });
    })();


    ///gallery
    (function () {
        var prevDeg = 0, target = void 0,
            number = $('.Ak-awesome-sets').first().find('li').length, deg = 90 / number;

        //animated buttons
        function timeGap(elm, prevDeg) {
            setTimeout(function () {
                $(elm).css({transform: `translate3d(0,-8.5rem,0)rotateZ(-${prevDeg}deg)`, transition: 'all .3s ease-in-out'})
                    .find('i').css({transform: `rotateZ(${prevDeg}deg)`});
            }, 400)
        }

        function restGap(elm, target) {
            setTimeout(function () {
                $(elm).css({transform: `translate3d(0,0,0)rotateZ(0deg)`, transition: 'all .5s ease-in-out'})
                    .find('i').css({transform: `rotateZ(0deg)`});

            }, 400)
        }

        $('.social-share .Aktoggler').on('click', function (e) {
            e.preventDefault()
            target = $(this).parent().next();

            if ($(this).hasClass("toggled") === false) {
                $(this).addClass('toggled');
                target.fadeTo(0, 1);
                target.find('li').each(function (i, elm) {
                    prevDeg += deg;
                    $(elm).css({transform: `translate3d(0,-8.5rem,0)`}).addClass('active')
                    timeGap(elm, prevDeg);
                })
            } else {
                $(this).removeClass('toggled');
                target.fadeTo(1000, 0);
                prevDeg = 0;
                target.find('li').each(function (i, elm) {
                    $(elm).css({transform: `translate3d(0,-8.5rem,0)rotateZ(0deg)`}).removeClass('active')
                        .find('i').css({transform: `rotateZ(0deg)`})
                    restGap(elm)
                });
            }
            prevDeg = 0;
        })
    })();
    // images load
    $('.grid').imagesLoaded().done(function () {
        $('.grid').masonry({
            fitWidth: true,
            columnWidth: '.grid-item',
            gutter: 0

        })
    })
    // navigaion
    //click
    $navbar.find('.navbar-nav a').each(function (i, element) {
        $(element).on('click', function (e) {
            e.preventDefault();
            $(this).parent("li").addClass('active').siblings().removeClass('active');
            $("html ,body").animate({
                scrollTop: $($(this).attr("href")).offset().top - $navbar.innerHeight()
            }, 1000)
        })
    })

    //scroll
    function navScrollSync($widnowScroll) {
        curent = $navLinks.map(function () {
            if ($widnowScroll >= $($(this).attr("href")).offset().top - $navbar.innerHeight() - 1) {
                return this;
            }
            curent = curent[curent.length - 1] || $('nav .navbar-nav li.active a');
            // curent = curent[curent.length - 1];
            $(curent).parent().addClass("active").siblings().removeClass("active").find('a')[0].blur();
        })

    }

    //input
    function inputlabel($listOfButtons) {
        $listOfButtons.each(function (i, el) {
            $(el).on('blur', function () {
                $(this).val().length > 0 ? $(this).parent().find('label').fadeOut() : $(this).parent().find('label').fadeIn();

            })
        })
    }

    // hide spinner
    inputlabel($('input[type="text"] , input[type="email"]'))
    $(document).ready(function () {
        var $scrollToTopEL = $('#scrollToTop');
        $(window).on('scroll',function () {
            scrollTop($scrollToTopEL)
        })
        $scrollToTopEL.find('.button').on('click',function (e) {
            e.preventDefault();
            $navbar.find('li:first-of-type a').trigger('click');
        })
        $('main').css({
            display: 'block'
        })
        // hideing loader
        $('.loeader').fadeOut()
        //wow
        //adding data and class
        function animationRunner(index, $el) {
            $($el).addClass('wow ak-fade-animation').attr({
                'data-wow-delay': `${index * .2}s`,
                'data-wow-dutation': '.5s'
            })
        };

        function aninamtionExe($selectors) {
            $($selectors).each(function (i, $jqObject) {
                $jqObject.each(function (index, element) {
                    animationRunner(index, element);
                })
            })
        }

        aninamtionExe([
            $('#services').find('.card'), $('#pricing-tabels').find('.card'), $('#ourteam').find('.card'), $('#tips-view ,  #cover-letter ')
        ]);
        new WOW().init();

    })

})(jQuery, window, document)

//google maps init
function initMap() {
    var map = new google.maps.Map($('#map')[0], {
        center: {lat: 51.5074, lng: 0.1278},
        zoom: 18
    })
    var marker = new google.maps.Marker({
        position: {lat: 51.5074, lng: 0.1278}

    })
    marker.setMap(map);
}
