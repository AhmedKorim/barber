"use strict";
var icon = $('img[src^="https://developers.google.com/"]');

function initMap() {
    var t = new google.maps.Map($("#map")[0], {center: {lat: 51.5074, lng: .1278}, zoom: 18});
    new google.maps.Marker({position: {lat: 51.5074, lng: .1278}}).setMap(t)
}

!function (t, e, a) {
    var n, i = t("#home"), s = t("nav.navbar"), o = t(".AKparallex"), r = t("nav.navbar .navbar-nav a"), c = [], l = null;
    a.addEventListener("click", function (t) {
        "[object HTMLButtonElement]" === a.activeElement.toString() && a.activeElement.blur()
    }), t(function () {
        t("body").niceScroll({cursorcolor: "#a9578bfa", cursorwidth: "10px"})
    });
    var d, f, u, m, p, g = function () {
        i.find(".head-wrapper").height(t(e).innerHeight())
    };
    g(), t(e).on("resize", g), t(e).on("scroll", function (a) {
        var d, f, u;
        l = t(e).scrollTop(), n = n || 2, d = l, c = r.map(function () {
            if (d >= t(t(this).attr("href")).offset().top - s.innerHeight() - 1) return this;
            c = c[c.length - 1] || t("nav .navbar-nav li.active a"), t(c).parent().addClass("active").siblings().removeClass("active").find('a').each((i,el)=> el.blur());
        }), f = t(e).scrollTop(), u = u || 0, i.height() > f ? (u <= 80 ? (u += f / i.height() * 400, t(".speach").css("opacity", "0").find("p").css("opacity", "1"), u >= 30 && t(".speach").css("opacity", "1").find("p").css("opacity", "1"), u > 80 && (u = 80)) : u = 100, o.css("transform", "translate3d(0, " + -u + "%, 0)")) : (u = 0, o.css("transform", "translate3d(0, " + -u + "%, 0)")), l + 400 >= t("#statistics").offset().top && 2 === n && (n = 3, t(".timer").countTo({
            from: 50,
            to: 25e3,
            speed: 1e3,
            refreshInterval: 50,
            formatter: function (t, e) {
                return t.toFixed(e.decimals)
            }
        }))
    }), f = t("#testimonials .ak-next"), u = t("#testimonials .ak-prev"), m = t(".slider-body"), p = t("#testimonials .ak-controls"), m.slick(((d = {
        customPaging: function (t, e) {
            return "<a class='dot" + e + "1'><img class='img-fluid' src='img/testimonials/0" + (e + 1) + ".jpg' alt='user-feedback-avatar'> </a>"
        },
        centerMode: !0,
        appendDots: t("#testimonials .ak-controls"),
        prevArrow: u,
        nextArrow: f,
        dots: !0,
        infinite: !0,
        slidesToShow: 3,
        adaptiveHeight: !0,
        slidesToScroll: 1
    }).centerMode = !0, d.appendDots = p, d.dotsClass = "ak-dots", d.centerPadding = "0", d.speed = 500, d.cssEase = "linear", d.responsive = [{
        breakpoint: 920,
        settings: {slidesToShow: 1, infinite: !0}
    }], d)), function () {
        var e = 0, a = void 0, n = 90 / t(".Ak-awesome-sets").first().find("li").length;
        t(".social-share .Aktoggler").on("click", function (i) {
            i.preventDefault(), a = t(this).parent().next(), !1 === t(this).hasClass("toggled") ? (t(this).addClass("toggled"), a.fadeTo(0, 1), a.find("li").each(function (a, i) {
                var s, o;
                e += n, t(i).css({transform: "translate3d(0,-8.5rem,0)"}).addClass("active"), s = i, o = e, setTimeout(function () {
                    t(s).css({
                        transform: "translate3d(0,-8.5rem,0)rotateZ(-" + o + "deg)",
                        transition: "all .3s ease-in-out"
                    }).find("i").css({transform: "rotateZ(" + o + "deg)"})
                }, 400)
            })) : (t(this).removeClass("toggled"), a.fadeTo(1e3, 0), e = 0, a.find("li").each(function (e, a) {
                var n;
                t(a).css({transform: "translate3d(0,-8.5rem,0)rotateZ(0deg)"}).removeClass("active").find("i").css({transform: "rotateZ(0deg)"}), n = a, setTimeout(function () {
                    t(n).css({transform: "translate3d(0,0,0)rotateZ(0deg)", transition: "all .5s ease-in-out"}).find("i").css({transform: "rotateZ(0deg)"})
                }, 400)
            })), e = 0
        })
    }(), t(".grid").imagesLoaded().done(function () {
        t(".grid").masonry({fitWidth: !0, columnWidth: ".grid-item", gutter: 0})
    }), s.find(".navbar-nav a").each(function (e, a) {
        t(a).on("click", function (e) {
            e.preventDefault(), t(this).parent("li").addClass("active").siblings().removeClass("active"), t("html ,body").animate({scrollTop: t(t(this).attr("href")).offset().top - s.innerHeight()}, 1e3)
        })
    }), t('input[type="text"] , input[type="email"]').each(function (e, a) {
        t(a).on("blur", function () {
            t(this).val().length > 0 ? t(this).parent().find("label").fadeOut() : t(this).parent().find("label").fadeIn()
        })
    }), t(a).ready(function () {
        var a, n = t("#scrollToTop");
        t(e).on("scroll", function () {
            var t;
            t = n, l >= 1500 ? t.css({transform: "translate3d(0,0,0)"}) : t.css({transform: "translate3d(5rem,0,0)"})
        }), n.find(".button").on("click", function (t) {
            t.preventDefault(), s.find("li:first-of-type a").trigger("click")
        }), t("main").css({display: "block"}), t(".loeader").fadeOut(), a = [t("#services").find(".card"), t("#pricing-tabels").find(".card"), t("#ourteam").find(".card"), t("#tips-view ,  #cover-letter ")], t(a).each(function (e, a) {
            a.each(function (e, a) {
                var n;
                n = e, t(a).addClass("wow ak-fade-animation").attr({"data-wow-delay": .2 * n + "s", "data-wow-dutation": ".5s"})
            })
        }), (new WOW).init({offset: 400})
    })
}(jQuery, window, document);
