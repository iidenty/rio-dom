// Gallery slider
let indicators = $(".gallery__indicators .indicators__item");
$(indicators).click(function (event) {
    if (confirm('Нет готовых картинок, вы готовы видеть нечто?')) {

        let i = indicators.index(event.target);
        let container = $('.gallery__background');

        // container.animate({'opacity': 0}, 150, function () {
        switch (i) {
            case 0:
                container.css({'background-image': "url(img/gallery_1_with_dark_with_line.png)"});
                break;
            case 1:
                container.css({'background-image': "url(img/gallery_2.jpg)"});
                break;
            case 2:
                container.css({'background-image': "url(img/gallery_3.jpg)"});
                break;
            case 3:
                container.css({'background-image': "url(img/gallery_4.jpeg)"});
                break;
        }
        // container.animate({'opacity': 1}, 150);
        // });

        indicators.removeClass('indicators__item_active');
        $(event.target).addClass('indicators__item_active');
    }
});

let phones = $('.phone');

phones.on("focus", function () {
    phones.attr("placeholder", "");
    phones.val('+7 (');
});

phones.on("blur", function () {
    phones.attr("placeholder", "НОМЕР ТЕЛЕФОНА")
});


phones.mask('+7 (000) 000 00 00');

$('.services__item').click(function () {
    alert('Пока нет информации')
});

//swiper
var mySwiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',// to find the swiper-pagination you put outside of the swiper-container
        clickable: true,
        autoplay: {
            delay: 5000,
        },
        renderBullet: function (index, className) {
            var slider_array = [];
            var el = $('.swiper-container')
            el.find('[data-name]').each(function () {
                slider_array.push($(this).data('name'));
            });

            console.log(slider_array);
            return '<span class="indicators__item ' + className + '"></span>';
        }
    },
})