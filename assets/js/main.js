document.addEventListener('DOMContentLoaded', function () {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const hidePreloader = () => {
            preloader.classList.add('opacity-0', 'invisible');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 700);
        };

        if (document.readyState === 'complete') {
            hidePreloader();
        } else {
            window.addEventListener('load', hidePreloader);
        }
    }

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

    const TEAM_CARD_SELECTOR = '[data-team-card]';
    const TEAM_SHARE_BTN_SELECTOR = '[data-team-share]';
    const TEAM_SOCIALS_SELECTOR = '[data-team-social]';

    const TEAM_SHARE_BTN_OPEN_CLASSES = [
        'rounded-full',
        'bg-linear-to-r',
        'from-border-secondary',
        'via-[#FF71BF]',
        'to-[#FFBD7A]',
        'border',
        'border-transparent',
        'shadow-[0px_14px_40px_rgba(178,110,247,0.35)]',
        'scale-105',
    ];

    const TEAM_SHARE_BTN_CLOSED_CLASSES = [
        'rounded-big',
        'bg-[#0F102A]',
        'border-white/10',
        'shadow-[0px_14px_40px_rgba(0,0,0,0.35)]',
    ];

    const TEAM_SOCIALS_OPEN_CLASSES = ['opacity-100', 'translate-y-0', 'scale-100', 'pointer-events-auto'];
    const TEAM_SOCIALS_CLOSED_CLASSES = ['opacity-0', 'translate-y-2', 'scale-95', 'pointer-events-none'];

    const TEAM_SOCIAL_ITEM_OPEN_CLASSES = ['opacity-100', 'translate-y-0'];
    const TEAM_SOCIAL_ITEM_CLOSED_CLASSES = ['opacity-0', 'translate-y-2'];

    const swapClasses = (el, isOn, onClasses, offClasses) => {
        if (!el) return;
        el.classList.remove(...(isOn ? offClasses : onClasses));
        el.classList.add(...(isOn ? onClasses : offClasses));
    };

    const setTeamCardShareOpen = (card, isOpen) => {
        if (!card) return;

        const shareBtn = card.querySelector(TEAM_SHARE_BTN_SELECTOR);
        const socials = card.querySelector(TEAM_SOCIALS_SELECTOR);

        if (shareBtn) {
            shareBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            swapClasses(shareBtn, isOpen, TEAM_SHARE_BTN_OPEN_CLASSES, TEAM_SHARE_BTN_CLOSED_CLASSES);
        }

        if (socials) {
            swapClasses(socials, isOpen, TEAM_SOCIALS_OPEN_CLASSES, TEAM_SOCIALS_CLOSED_CLASSES);
            socials.querySelectorAll('a').forEach((link) => {
                swapClasses(link, isOpen, TEAM_SOCIAL_ITEM_OPEN_CLASSES, TEAM_SOCIAL_ITEM_CLOSED_CLASSES);
            });
        }
    };

    const closeAllTeamShares = (exceptCard = null) => {
        document.querySelectorAll(TEAM_CARD_SELECTOR).forEach((card) => {
            if (exceptCard && card === exceptCard) {
                return;
            }

            setTeamCardShareOpen(card, false);
        });
    };

    document.addEventListener('click', (e) => {
        const shareBtn = e.target.closest(TEAM_SHARE_BTN_SELECTOR);

        if (shareBtn) {
            const card = shareBtn.closest(TEAM_CARD_SELECTOR);
            const isOpen = shareBtn.getAttribute('aria-expanded') === 'true';

            closeAllTeamShares(card);
            setTeamCardShareOpen(card, !isOpen);
            return;
        }

        const socialLink = e.target.closest(`${TEAM_SOCIALS_SELECTOR} a`);
        if (socialLink && socialLink.getAttribute('href') === '#') {
            e.preventDefault();
            return;
        }

        if (!e.target.closest(TEAM_CARD_SELECTOR)) {
            closeAllTeamShares();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllTeamShares();
        }
    });

    const brandSwiperEl = document.querySelector('.brand-swiper');

    if (brandSwiperEl && window.Swiper) {
        new Swiper(brandSwiperEl, {
            slidesPerView: 2,
            spaceBetween: 16,
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            breakpoints: {
                480: { slidesPerView: 2, spaceBetween: 20 },
                640: { slidesPerView: 3, spaceBetween: 20 },
                992: { slidesPerView: 4, spaceBetween: 24 },
                1200: { slidesPerView: 5, spaceBetween: 24 },
            },
        });
    }

    const backToTopBtn = document.getElementById('back-to-top');
    const backToTopProgress = document.getElementById('back-to-top-progress');
    const backToTopPercent = document.getElementById('back-to-top-percent');
    const backToTopText = document.getElementById('back-to-top-text');
    const backToTopGlow = document.getElementById('back-to-top-glow');

    if (backToTopBtn && backToTopProgress && backToTopPercent && backToTopText && backToTopGlow) {
        const circumference = 2 * Math.PI * 45; // 282.7
        const showClassList = ['opacity-100', 'visible', 'translate-y-0', 'pointer-events-auto'];
        const hideClassList = ['opacity-0', 'invisible', 'translate-y-4', 'pointer-events-none'];

        const setBackToTopVisibility = (shouldShow) => {
            if (shouldShow) {
                backToTopBtn.classList.remove(...hideClassList);
                backToTopBtn.classList.add(...showClassList);
            } else {
                backToTopBtn.classList.remove(...showClassList);
                backToTopBtn.classList.add(...hideClassList);
            }
        };

        const updateScrollProgress = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = scrollTop / docHeight;
            const percentage = Math.round(scrollPercent * 100);

            // Update Progress Circle
            const offset = circumference - (scrollPercent * circumference);
            backToTopProgress.style.strokeDashoffset = offset;

            // Update Glow (50% threshold)
            if (percentage >= 50) {
                backToTopGlow.style.backgroundColor = 'rgba(36, 189, 37, 0.15)';
            } else {
                backToTopGlow.style.backgroundColor = 'rgba(36, 189, 37, 0)';
            }

            // Update Content (100% threshold)
            if (percentage >= 100) {
                backToTopPercent.style.display = 'none';
                backToTopText.innerHTML = 'All <br> Done!';
                backToTopText.style.fontSize = '14px';
                backToTopText.style.color = '#ffffff';
            } else {
                backToTopPercent.style.display = 'block';
                backToTopPercent.innerText = `${percentage}%`;
                backToTopText.innerHTML = 'Explore <br> More';
                backToTopText.style.fontSize = '10px';
                backToTopText.style.color = 'rgba(255, 255, 255, 0.6)';
            }

            setBackToTopVisibility(scrollTop > 200);
        };

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateScrollProgress();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Initial check
        updateScrollProgress();

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const getStickyHeaderOffset = () => {
        const header = document.querySelector('header');
        if (!header) return 0;
        const rect = header.getBoundingClientRect();
        const height = Number.isFinite(rect.height) ? rect.height : 0;
        return height > 0 ? Math.ceil(height) : 0;
    };

    const scrollToHashTarget = (targetEl) => {
        if (!targetEl) return;
        const headerOffset = getStickyHeaderOffset();
        const extraOffset = 12;
        const rect = targetEl.getBoundingClientRect();
        const targetTop = window.scrollY + rect.top - headerOffset - extraOffset;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    };

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        const href = link.getAttribute('href') || '';
        if (!href || href === '#' || href === '#!') return;

        const hash = href.slice(1);
        if (!hash) return;

        const targetEl = document.getElementById(hash);
        if (!targetEl) return;

        e.preventDefault();
        scrollToHashTarget(targetEl);

        if (history.pushState) {
            history.pushState(null, '', `#${hash}`);
        } else {
            window.location.hash = hash;
        }

        if (typeof targetEl.focus === 'function' && !targetEl.hasAttribute('tabindex')) {
            targetEl.setAttribute('tabindex', '-1');
        }
        if (typeof targetEl.focus === 'function') {
            targetEl.focus({ preventScroll: true });
        }
    });

    if (window.location.hash) {
        const hash = window.location.hash.replace('#', '');
        const targetEl = hash ? document.getElementById(hash) : null;
        if (targetEl) {
            setTimeout(() => {
                scrollToHashTarget(targetEl);
            }, 0);
        }
    }
});