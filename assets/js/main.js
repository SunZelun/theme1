//Type animation
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
};

$(document).scroll(function () {
    var $nav = $(".navbar");
    $nav.toggleClass('scrolled fixed-top', $(this).scrollTop() > $nav.height());
});

//work filter
$(window).on("load",function(){
    var e = $(".work-filter");
    t = $("#menu-filter");
    e.isotope({
        filter:"*",
        layoutMode:"masonry",
        animationOptions:{
            duration:750,
            easing:"linear"
        }
    }),
    t.find("a").on("click",function(){
        var o=$(this).attr("data-filter");
        return t.find("a").removeClass("active"),
        $(this).addClass("active"),
        e.isotope({
            filter:o,
            animationOptions:{
                animationDuration:750,
                easing:"linear",queue:!1
            }
        }),!1
    })
});