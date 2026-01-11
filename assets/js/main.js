document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-background]').forEach((el) => {
        const url = el.getAttribute('data-background');

        if (!url) {
            return;
        }

        el.style.backgroundImage = `url("${url}")`;
    });

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }

    document.querySelectorAll('[data-faq-accordion]').forEach((accordion) => {
        const triggers = Array.from(accordion.querySelectorAll('[data-faq-trigger]'));

        const setItemOpen = (trigger, isOpen) => {
            const item = trigger.closest('[data-faq-item]');

            if (!item) {
                return;
            }

            const panel = item.querySelector('[data-faq-panel]');
            const icon = item.querySelector('[data-faq-icon] i');

            trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

            if (panel) {
                panel.classList.toggle('grid-rows-[1fr]', isOpen);
                panel.classList.toggle('grid-rows-[0fr]', !isOpen);
            }

            if (icon) {
                icon.classList.toggle('rotate-180', isOpen);
            }
        };

        const closeAll = (exceptTrigger) => {
            triggers.forEach((trigger) => {
                if (trigger === exceptTrigger) {
                    return;
                }

                setItemOpen(trigger, false);
            });
        };

        triggers.forEach((trigger) => {
            trigger.addEventListener('click', () => {
                const isOpen = trigger.getAttribute('aria-expanded') === 'true';
                closeAll(trigger);
                setItemOpen(trigger, !isOpen);
            });
        });

        triggers.forEach((trigger) => {
            const isOpen = trigger.getAttribute('aria-expanded') === 'true';
            setItemOpen(trigger, isOpen);
        });
    });

    const courseSwiperEl = document.querySelector('.course-swiper');

    if (courseSwiperEl && window.Swiper) {
        new Swiper(courseSwiperEl, {
            slidesPerView: 1,
            spaceBetween: 24,
            centerSlides: true,
            centeredSlides: true,
            centeredSlidesBounds: true,
            loop: true,
            speed: 700,
            navigation: {
                nextEl: '.course-swiper-next',
                prevEl: '.course-swiper-prev',
            },
            pagination: {
                el: '.course-swiper-pagination',
                clickable: true,
                // dynamicBullets: true,
                // dynamicMainBullets: 5,
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }

    const reviewSwiperEl = document.querySelector('.review-swiper');

    if (reviewSwiperEl && window.Swiper) {
        new Swiper(reviewSwiperEl, {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            speed: 700,
            navigation: {
                nextEl: '.review-swiper-next',
                prevEl: '.review-swiper-prev',
            },
            breakpoints: {
                992: { slidesPerView: 2 },
            },
        });
    }

    const blogSwiperEl = document.querySelector('.blog-swiper');

    if (blogSwiperEl && window.Swiper) {
        new Swiper(blogSwiperEl, {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            speed: 700,
            watchOverflow: true,
            navigation: {
                nextEl: '.blog-swiper-next',
                prevEl: '.blog-swiper-prev',
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }

    const teamSwiperEl = document.querySelector('.team-swiper');

    if (teamSwiperEl && window.Swiper) {
        new Swiper(teamSwiperEl, {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            speed: 700,
            watchOverflow: true,
            navigation: {
                nextEl: '.team-swiper-next',
                prevEl: '.team-swiper-prev',
            },
            pagination: {
                el: '.team-swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }
});