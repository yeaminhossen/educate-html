document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }

    const courseSwiperEl = document.querySelector('.course-swiper');

    if (courseSwiperEl && window.Swiper) {
        new Swiper(courseSwiperEl, {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            speed: 700,
            navigation: {
                nextEl: '.course-swiper-next',
                prevEl: '.course-swiper-prev',
            },
            pagination: {
                el: '.course-swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }
});