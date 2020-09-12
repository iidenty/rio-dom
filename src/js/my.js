// Отправка формы из модального окна
function sendModal() {
    let phone = $("#modal-phone");
    let name = $("#modal-name");
    let err = [];
    let msg = "";

    if (phone.val().length !== 18) {
        err = err.concat("Телефон введен некорректно")
    }

    if (name.val() === "") {
        err = err.concat("Имя введено некорректно")
    }

    if (err.length > 0) {
        msg = "\n";
        msg += err;
        alert("Ошибка отправки формы: " + msg)
        return false;
    }

    $.ajax({
        url: "support.php",
        type: "POST",
        data: $('.modal form').serialize(),
        success: function(msg){
            alert("Форма успешно отправлена")
        },
        error: function () {
            alert("Ошибка отправки формы")
        }
    });
}

// Отправка формы из калькулятора
function sendCalc() {
    let inputs = $(".calc_pc input");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            alert('ПУСТО')
        }
        console.log(inputs[i])
    }
    console.log(inputs)
    alert("Заявка принята")
}

// Отправка формы из подвала
function supportSend() {
    let phone = $("#support-phone");
    let name = $("#support-name");
    let err = [];
    let msg = "";

    if (phone.val().length !== 18) {
        err = err.concat("Телефон введен некорректно")
    }

    if (name.val() === "") {
        err = err.concat("Имя введено некорректно")
    }

    if (err.length > 0) {
        msg = "\n";
        msg += err;
        alert("Ошибка отправки формы:" + msg)
        return false;
    }

    $.ajax({
        url: "support.php",
        type: "POST",
        data: $('.support form').serialize(),
        success: function(msg){
            alert("Форма успешно отправлена")
        },
        error: function () {
            alert("Ошибка отправки формы")
        }
    });
}


$('.flowing-scroll').on( 'click', function(){
    var el = $(this);
    var dest = el.attr('href'); // получаем направление
    if(dest !== undefined && dest !== '') { // проверяем существование
        $('html').animate({
                scrollTop: $(dest).offset().top // прокручиваем страницу к требуемому элементу
            }, 500 // скорость прокрутки
        );
    }
    return false;
});

let form = new WOW(
    {
        boxClass: 'form-animate',
        // animateClass: 'animated',
        live: false,
    });

var formNotOpened = true;

function showForm() {
    if (formNotOpened) {
        $(".form-animate").css('opacity', 1)
        form.init()
        // $(".form-animate").addClass('animate__animated animate__fadeInUp')
        formNotOpened = false;
    }
}

let phones = $('.phone');
let phone1 = $(".calc .phone");
let phone2 = $(".support .phone");
let phone3 = $(".modal-content .phone");

phones.on("focus", function () {
    phones.attr("placeholder", "");

    if (phone1.val() === '') {
        phone1.val('+7 (');
    }

    if (phone2.val() === '') {
        phone2.val('+7 (');
    }

    if (phone3.val() === '') {
        phone3.val('+7 (');
    }
});

phones.on("blur", function () {
    phone1.attr("placeholder", "НОМЕР ТЕЛЕФОНА")
    phone2.attr("placeholder", "номер телефона")

    if (phone1.val() === '+7 (') {
        phone1.val('')
    }

    if (phone2.val() === '+7 (') {
        phone2.val('')
    }

    if (phone3.val() === '+7 (') {
        phone3.val('')
    }
});


phones.mask('+7 (000) 000 00 00');

$('.services__item').click(function () {
    $("#exampleModal").modal('show')
});

//swiper
var mySwiper = new Swiper('.swiper-container', {
    centeredSlides: true,
    slidesPerView: 1,
    // spaceBetween: 30,
    autoplay: {
        delay: 5000,
    },
    speed: 700,
    spaceBetween: 200,
    // loop: true,
    pagination: {
        el: '.swiper-pagination',// to find the swiper-pagination you put outside of the swiper-container
        clickable: true,
        renderBullet: function (index, className) {
            var slider_array = [];
            var el = $('.swiper-container')
            el.find('[data-name]').each(function () {
                slider_array.push($(this).data('name'));
            });

            // console.log(slider_array);
            return '<span class="indicators__item ' + className + '"></span>';
        }
    },
})
mySwiper.autoplay.start();
// mySwiper.swipeNext(true, true);
// mySwiper.startAutoplay(); //just in case

updateValueCalcFolder();

$(".calc input").click(function (e) {
    updateValueCalcFolder()
})

$(".calc__pc input").on('click', function (e) {
    let elem = $(this).parents(".calc__pc > div")
    let next = elem.next()
    let prev = elem.prev()
    let nextNext = next.next()

    console.log(nextNext)

    nextNext.find('.calc__item').css("opacity", 1);
    nextNext.find('.calc__item input').removeAttr("disabled");
    nextNext.next().find('.calc__item').css("opacity", 1);
    nextNext.next().find('.calc__item input').removeAttr("disabled");

    if (next.find('div').hasClass('calc__next-info') && !next.find('div').hasClass('active')) {
        next.find('div').css("background", "url('img/calc__info-next-orange.png') no-repeat");
    }

    if (prev.find('div').hasClass('calc__next-info')) {
        prev.find('div').css("background", "url('img/calc__info-next.png') no-repeat");
        prev.find('div').addClass('active')
    }

})

function formatMoney(n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function isEmpty(str) {
    return (typeof str === "undefined" || str === null || str ===  "");
}

function updateValueCalcFolder() {
    let elem = $(".calc__folder-value");
    let items = $(".calc input:radio:checked");
    let sum = 0;

    for (let i = 0; i < items.length; i++) {
        sum += $(items[i]).data('price');
    }

    let rooms = $(".calc__pc input[name='rooms']").val();
    let s = $(".calc__pc input[name='area']").val();

    let mrooms = $(".calc__mobile input[name='rooms']").val();
    let ms = $(".calc__mobile input[name='area']").val();

    if (isEmpty(rooms)) {
        if(isEmpty(mrooms)) {
            rooms = 0
        } else {
            rooms = mrooms
        }
    }
    if (isEmpty(s)) {
        if(isEmpty(ms)) {
            s = 0
        } else {
            s = mrooms
        }
    }

    sum += rooms * 10000;
    sum += s * 400;

    // sum = sum.toString()

    console.log(sum)

    if (sum === 0) {
        elem.text("")
        $(".calc__folder-last").text("")
    } else {
        elem.text(formatMoney(sum, "", "", "."))
        $(".calc__folder-last").text("РУБЛЕЙ")
    }

    if (sum > 200000) {
        showForm()
    }
}

$(".calc input[name='rooms'], .calc input[name='area']").on('blur', function () {
    $(".calc__pc input[name='area']").parents('.calc__item').css('opacity', 1)
    $(".calc__pc input[name='area']").removeAttr('disabled')
    updateValueCalcFolder()
})

//swiper
let mySwiper2 = new Swiper('.swiper-container-2', {
    // slidesPerView: 1,
    // spaceBetween: 30,
    autoplay: {
        delay: 2500,
    },
    loop: true,
    pagination: {
        el: '.swiper-pagination-2',// to find the swiper-pagination you put outside of the swiper-container
        clickable: true,
        renderBullet: function (index, className) {
            var slider_array = [];
            var el = $('.swiper-container-2')
            el.find('[data-name]').each(function () {
                slider_array.push($(this).data('name'));
            });

            return '<span class="indicators__item ' + className + '"></span>';
        }
    },
});

var mySwiper3 = new Swiper('.services__swiper-container', {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 5,
    grabCursor: true,
    breakpoints: {
        345: {
            slidesPerView: 1.2,
            spaceBetween: 10,
        },
        425: {
            slidesPerView: 1.5,
            spaceBetween: 20,
        },
    }
});

// CALC SWIPER FOR PHONE
var mySwiper4 = new Swiper('.calc__swiper-container', {
    // cssMode: true,
    onlyExternal: true,
    noSwiping: true,
    allowTouchMove: false,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: -30,
    grabCursor: true,
    // breakpoints: {
    //     345: {
    //         slidesPerView: 1.2,
    //         spaceBetween: 10,
    //     },
    //     425: {
    //         slidesPerView: 1.5,
    //         spaceBetween: 20,
    //     },
    // }
});

$("#gallery-next").click(function () {
    mySwiper2.slideNext()
})

$(".calc__btn-next").click(function () {
    let item = $(".calc .swiper-slide-active input:radio:checked");
    if (item.length === 1) {
        mySwiper4.slideNext()
    }
});

$(".calc__btn-prev").click(function () {
    mySwiper4.slidePrev()
});

$('#exampleModal').on('show.bs.modal', function () {

});