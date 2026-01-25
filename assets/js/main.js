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

    const initCourseSwiper = (el) => {
        if (!el || !window.Swiper) return null;

        const container = el.closest('.relative') || el.parentElement;
        const nextEl = container.querySelector('.course-swiper-next');
        const prevEl = container.querySelector('.course-swiper-prev');
        const paginationEl = container.querySelector('.course-swiper-pagination');

        return new Swiper(el, {
            slidesPerView: 1,
            spaceBetween: 24,
            centeredSlides: true,
            loop: true,
            speed: 700,
            navigation: {
                nextEl: nextEl,
                prevEl: prevEl,
            },
            pagination: {
                el: paginationEl,
                clickable: true,
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    };

    document.querySelectorAll('.course-swiper').forEach(el => {
        initCourseSwiper(el);
    });

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
            pagination: {
                el: '.blog-swiper-pagination',
                clickable: true,
            },
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

    // Counter Up Animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const startTime = performance.now();

                const updateCounter = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const currentCount = Math.floor(progress * target);

                    // Add comma for large numbers (like 1,500)
                    counter.innerText = currentCount.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };

                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => counterObserver.observe(counter));


    // Cart Sidebar Toggle
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartBackdrop = document.getElementById('cart-backdrop');
    const body = document.body;

    if (cartBtn && cartSidebar && cartCloseBtn && cartBackdrop) {
        const cartHeader = document.getElementById('cart-header');
        const cartFooter = document.getElementById('cart-footer');
        const cartItems = document.querySelectorAll('.cart-item');

        const openCart = () => {
            // Calculate scrollbar width to prevent "dhakha" (jerk)
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            
            if (scrollbarWidth > 0) {
                // Apply compensation to body instantly
                body.style.paddingRight = `${scrollbarWidth}px`;
            }

            // Lock scroll on body for stability
            body.style.overflow = 'hidden';

            cartSidebar.classList.remove('translate-x-full', 'invisible');
            cartSidebar.classList.add('translate-x-0');
            cartBackdrop.classList.remove('opacity-0', 'invisible');
            cartBackdrop.classList.add('opacity-100');
            
            // Staggered animations for content
            if (cartHeader) {
                cartHeader.classList.remove('opacity-0', 'translate-y-4');
                cartHeader.classList.add('opacity-100', 'translate-y-0');
            }
            
            cartItems.forEach((item) => {
                item.classList.remove('opacity-0', 'translate-y-4');
                item.classList.add('opacity-100', 'translate-y-0');
            });
            
            if (cartFooter) {
                cartFooter.classList.remove('opacity-0', 'translate-y-4');
                cartFooter.classList.add('opacity-100', 'translate-y-0');
            }
        };

        const closeCart = () => {
            cartSidebar.classList.remove('translate-x-0');
            cartSidebar.classList.add('translate-x-full');
            cartBackdrop.classList.remove('opacity-100');
            cartBackdrop.classList.add('opacity-0', 'invisible');
            
            // Reset animations for content
            if (cartHeader) {
                cartHeader.classList.add('opacity-0', 'translate-y-4');
                cartHeader.classList.remove('opacity-100', 'translate-y-0');
            }
            
            cartItems.forEach((item) => {
                item.classList.add('opacity-0 ', 'translate-y-4');
                item.classList.remove('opacity-100', 'translate-y-0');
            });
            
            if (cartFooter) {
                cartFooter.classList.add('opacity-0', 'translate-y-4');
                cartFooter.classList.remove('opacity-100', 'translate-y-0');
            }

            // Hide sidebar after transition
            setTimeout(() => {
                if (cartSidebar.classList.contains('translate-x-full')) {
                    cartSidebar.classList.add('invisible');
                    
                    // Reset all styles
                    body.style.overflow = '';
                    body.style.paddingRight = '';
                }
            }, 800);
        };

        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });

        cartCloseBtn.addEventListener('click', closeCart);
        cartBackdrop.addEventListener('click', closeCart);

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeCart();
            }
        });
    }

    // User Profile Dropdown Toggle
    const userProfileBtn = document.getElementById('user-profile-btn');
    const userProfileDropdown = document.getElementById('user-profile-dropdown');

    if (userProfileBtn && userProfileDropdown) {
        const toggleDropdown = (show) => {
            if (show) {
                userProfileDropdown.classList.remove('opacity-0', 'invisible', 'translate-y-4');
                userProfileDropdown.classList.add('opacity-100', 'visible', 'translate-y-0');
            } else {
                userProfileDropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
                userProfileDropdown.classList.add('opacity-0', 'invisible', 'translate-y-4');
            }
        };

        userProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !userProfileDropdown.classList.contains('invisible');
            toggleDropdown(!isOpen);
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!userProfileDropdown.contains(e.target) && e.target !== userProfileBtn) {
                toggleDropdown(false);
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                toggleDropdown(false);
            }
        });
    }

    // Popular Courses Tabs
    const courseTabs = document.querySelectorAll('.course-tab-btn');
    const popularCourseSection = document.querySelector('#popular-courses');

    if (courseTabs.length > 0 && popularCourseSection) {
        const popularCourseSwiper = popularCourseSection.querySelector('.course-swiper');
        const swiperWrapper = popularCourseSwiper.querySelector('.swiper-wrapper');
        
        // Capture original slides (excluding duplicates created by Swiper)
        const originalSlides = Array.from(swiperWrapper.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)'));

        courseTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const filter = this.getAttribute('data-tab-filter');

                // Update active tab UI
                courseTabs.forEach(t => {
                    t.classList.remove('bg-secondary', 'text-white', 'shadow-[0px_10px_20px_rgba(147,130,255,0.3)]');
                    t.classList.add('bg-white/5', 'border', 'border-white/10', 'text-white/60');
                });
                this.classList.add('bg-secondary', 'text-white', 'shadow-[0px_10px_20px_rgba(147,130,255,0.3)]');
                this.classList.remove('bg-white/5', 'border', 'border-white/10', 'text-white/60');

                // Destroy existing swiper
                if (popularCourseSwiper.swiper) {
                    popularCourseSwiper.swiper.destroy(true, true);
                }

                // Clear wrapper and append filtered slides
                swiperWrapper.innerHTML = '';
                originalSlides.forEach(slide => {
                    const category = slide.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        swiperWrapper.appendChild(slide.cloneNode(true));
                    }
                });

                // Re-initialize swiper
                initCourseSwiper(popularCourseSwiper);
            });
        });
    }

    // Why Choose Us Tabs
    const whyChooseTabs = document.querySelectorAll('[data-choose-tab]');
    const whyChooseContents = document.querySelectorAll('[data-choose-content]');

    if (whyChooseTabs.length > 0) {
        whyChooseTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const target = this.getAttribute('data-choose-tab');

                // Update Tabs UI
                whyChooseTabs.forEach(t => t.classList.remove('active-tab'));
                this.classList.add('active-tab');

                // Update Contents
                whyChooseContents.forEach(content => {
                    if (content.getAttribute('data-choose-content') === target) {
                        content.classList.remove('hidden');
                        content.classList.add('block');
                        // Optional: trigger animation
                        content.style.animation = 'none';
                        content.offsetHeight; // trigger reflow
                        content.style.animation = null;
                    } else {
                        content.classList.remove('block');
                        content.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Testimonial Sliders Sync
    const testimonialImageSwiper = new Swiper('.testimonial-image-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 800,
        effect: 'slide',
        allowTouchMove: false, // Image slider is controlled by content slider
    });

    const testimonialContentSwiper = new Swiper('.testimonial-content-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.testimonial-pagination',
            clickable: true,
        },
    });

    // Sync Sliders
    testimonialContentSwiper.on('slideChange', function () {
        testimonialImageSwiper.slideToLoop(testimonialContentSwiper.realIndex);
    });

    // Hero Swiper Initialization
    const heroSwiperEl = document.querySelector('.hero-swiper');
    if (heroSwiperEl && window.Swiper) {
        const heroSwiper = new Swiper(heroSwiperEl, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            speed: 1200,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            on: {
                slideChange: function () {
                    const activeIndex = this.realIndex;
                    const bullets = document.querySelectorAll('.hero-bullet');
                    bullets.forEach((bullet, idx) => {
                        if (idx === activeIndex) {
                            bullet.classList.add('active');
                        } else {
                            bullet.classList.remove('active');
                        }
                    });
                }
            }
        });

        // Hero Bullet Click
        document.querySelectorAll('.hero-bullet').forEach(bullet => {
            bullet.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                heroSwiper.slideToLoop(index);
            });
        });
    }
});