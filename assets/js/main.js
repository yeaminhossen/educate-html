document.addEventListener('DOMContentLoaded', function () {
    // Mobile Sidebar Toggle
    const mobileSidebarBtn = document.getElementById('mobile-sidebar-btn');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const mobileSidebarClose = document.getElementById('mobile-sidebar-close');
    const mobileSidebarBackdrop = document.getElementById('mobile-sidebar-backdrop');

    if (mobileSidebarBtn && mobileSidebar && mobileSidebarClose && mobileSidebarBackdrop) {
        const openMobileSidebar = () => {
            mobileSidebar.classList.remove('translate-x-full', 'invisible');
            mobileSidebar.classList.add('translate-x-0');
            mobileSidebar.setAttribute('aria-expanded', 'true');
            mobileSidebarBackdrop.classList.remove('opacity-0', 'invisible');
            mobileSidebarBackdrop.classList.add('opacity-100');
            document.body.style.overflow = 'hidden';
        };

        const closeMobileSidebar = () => {
            mobileSidebar.classList.remove('translate-x-0');
            mobileSidebar.classList.add('translate-x-full');
            mobileSidebar.setAttribute('aria-expanded', 'false');
            mobileSidebarBackdrop.classList.remove('opacity-100');
            mobileSidebarBackdrop.classList.add('opacity-0', 'invisible');
            
            setTimeout(() => {
                if (mobileSidebar.classList.contains('translate-x-full')) {
                    mobileSidebar.classList.add('invisible');
                    document.body.style.overflow = '';
                }
            }, 500);
        };

        mobileSidebarBtn.addEventListener('click', openMobileSidebar);
        mobileSidebarClose.addEventListener('click', closeMobileSidebar);
        mobileSidebarBackdrop.addEventListener('click', closeMobileSidebar);

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileSidebar.classList.contains('translate-x-0')) {
                closeMobileSidebar();
            }
        });
    }

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
    //// Set background images from data attributes


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
            const open = !mobileMenu.classList.contains('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
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

            item.classList.toggle('!border-secondary/60', isOpen);
            item.classList.toggle('!shadow-[0px_0px_30px_rgba(147,130,255,0.18)]', isOpen);

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

        const container = el.parentElement.parentElement;
        const nextEl = container.querySelector('.course-swiper-next');
        const prevEl = container.querySelector('.course-swiper-prev');
        const paginationEl = container.querySelector('.course-swiper-pagination');

        return new Swiper(el, {
            slidesPerView: 1,
            spaceBetween: 16,
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
                480: { spaceBetween: 20 },
                640: { slidesPerView: 2, spaceBetween: 22 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
            },
        });
    };

    document.querySelectorAll('.course-swiper').forEach(el => {
        initCourseSwiper(el);
    });

    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const icon = this.querySelector('i');
            const active = icon.classList.contains('fa-solid');
            icon.classList.toggle('fa-solid', !active);
            icon.classList.toggle('fa-regular', active);
            icon.style.color = active ? '' : '#FF71BF';
        });
    });

    const courseFilterBtns = document.querySelectorAll('.course-filter-btn');
    courseFilterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            courseFilterBtns.forEach(b => b.classList.remove('active-filter'));
            this.classList.add('active-filter');
            const filter = this.getAttribute('data-filter');
            document.querySelectorAll('.course-swiper .swiper-slide').forEach(slide => {
                const level = slide.getAttribute('data-level');
                slide.style.display = (filter === 'all' || level === filter) ? '' : 'none';
            });
        });
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
            pagination: {
                el: '.review-swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                992: { slidesPerView: 2 },
            },
        });
    }

    //blog swiper initialization 3 slides per view
    const blogSwiperEl = document.querySelector('.blog-active-swiper');

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
    //blog swiper initialization 2 slides per view
    const blogSwiperEl2 = document.querySelector('.blog-active-two-swiper');

    if (blogSwiperEl2 && window.Swiper) {
        new Swiper(blogSwiperEl2, {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            speed: 700,
            watchOverflow: true,
            pagination: {
                el: '.blog-two-swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.blog-two-swiper-next',
                prevEl: '.blog-two-swiper-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }

    document.querySelectorAll('.blog-standard-gallery').forEach((el) => {
        if (!window.Swiper) return;
        const wrap = el.closest('.blog-standard-gallery-wrap');
        if (!wrap) return;
        new Swiper(el, {
            slidesPerView: 1,
            loop: true,
            speed: 600,
            navigation: {
                nextEl: wrap.querySelector('.blog-standard-gallery-next'),
                prevEl: wrap.querySelector('.blog-standard-gallery-prev'),
            },
        });
    });

    //team swiper initialization
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
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
            },
        });
    }

    const TEAM_CARD_SELECTOR = '[data-team-card]';
    const TEAM_SHARE_BTN_SELECTOR = '[data-team-share]';
    const TEAM_SOCIALS_SELECTOR = '[data-team-social]';


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
            swapClasses(shareBtn, isOpen, shareBtn.dataset.openClasses.split(' '), shareBtn.dataset.closedClasses.split(' '));
        }

        if (socials) {
            swapClasses(socials, isOpen, socials.dataset.openClasses.split(' '), socials.dataset.closedClasses.split(' '));
            socials.querySelectorAll('a').forEach((link) => {
                swapClasses(link, isOpen, link.dataset.openClasses.split(' '), link.dataset.closedClasses.split(' '));
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

    // Brand Swiper
    document.querySelectorAll('.brand-swiper').forEach(el => {
        if (!window.Swiper) return;
        
        const isAutoWidth = el.querySelector('.swiper-slide')?.classList.contains('!w-auto');
        
        new Swiper(el, {
            slidesPerView: isAutoWidth ? 'auto' : 1.35,
            spaceBetween: 24,
            loop: true,
            speed: 4000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            breakpoints: {
                400: { slidesPerView: isAutoWidth ? 'auto' : 2, spaceBetween: 30 },
                640: { slidesPerView: isAutoWidth ? 'auto' : 3, spaceBetween: 40 },
                992: { slidesPerView: isAutoWidth ? 'auto' : 4, spaceBetween: 50 },
                1200: { slidesPerView: isAutoWidth ? 'auto' : 5, spaceBetween: 60 },
            },
        });
    });
    // Brand Swiper two
    document.querySelectorAll('.brand-swiper-two').forEach(el => {
        if (!window.Swiper) return;
        
        const isAutoWidth = el.querySelector('.swiper-slide')?.classList.contains('!w-auto');
        
        new Swiper(el, {
            slidesPerView: isAutoWidth ? 'auto' : 2.35,
            spaceBetween: 24,
            loop: true,
            speed: 4000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            breakpoints: {
                400: { slidesPerView: isAutoWidth ? 'auto' : 3, spaceBetween: 30 },
                640: { slidesPerView: isAutoWidth ? 'auto' : 4, spaceBetween: 40 },
                992: { slidesPerView: isAutoWidth ? 'auto' : 5, spaceBetween: 50 },
                1200: { slidesPerView: isAutoWidth ? 'auto' : 7, spaceBetween: 60 },
            },
        });
    });
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

    const stickyHeader = document.querySelector('header');
    if (stickyHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                stickyHeader.classList.add('scrolled-header');
            } else {
                stickyHeader.classList.remove('scrolled-header');
            }
        }, {
            passive: true
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

    const renderCounterValue = (counter, value) => {
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        counter.textContent = `${prefix}${Math.round(value).toLocaleString()}${suffix}`;
    };

    // Counter Up Animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const counter = entry.target;
            if (counter.dataset.counterAnimated === 'true') {
                observer.unobserve(counter);
                return;
            }

            const target = parseInt(counter.getAttribute('data-target'), 10);
            if (!Number.isFinite(target)) {
                observer.unobserve(counter);
                return;
            }

            const duration = 2000;
            const startTime = performance.now();
            counter.dataset.counterAnimated = 'true';

            const updateCounter = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const currentCount = Math.floor(progress * target);

                renderCounterValue(counter, currentCount);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                    return;
                }

                renderCounterValue(counter, target);
            };

            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);
        });
    }, {
        threshold: 0.5
    });

    counters.forEach((counter) => counterObserver.observe(counter));


    // Cart Sidebar Toggle
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartBackdrop = document.getElementById('cart-backdrop');
    const body = document.body;

    if (cartBtn && cartSidebar && cartCloseBtn && cartBackdrop) {
        const cartHeader = document.getElementById('cart-header');
        const cartFooter = document.getElementById('cart-footer');
        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartItemCountEl = document.getElementById('cart-item-count');
        const cartSubtotalEl = document.getElementById('cart-subtotal');
        const cartEmptyMsg = document.getElementById('cart-empty-msg');
        const cartCheckoutBtn = document.getElementById('cart-checkout-btn');

        const getCartRows = () => (cartItemsContainer ? cartItemsContainer.querySelectorAll('.cart-item') : []);

        const updateCartTotals = () => {
            if (!cartItemsContainer) return;
            const rows = cartItemsContainer.querySelectorAll('.cart-item');
            let subtotal = 0;
            let qtySum = 0;
            rows.forEach((row) => {
                const unit = Number(row.dataset.unitPrice) || 0;
                const qtyEl = row.querySelector('.cart-item-qty');
                let qty = parseInt(qtyEl && qtyEl.textContent, 10);
                if (Number.isNaN(qty) || qty < 1) qty = 1;
                qtySum += qty;
                subtotal += unit * qty;
                const lineTotalEl = row.querySelector('.cart-item-line-total');
                if (lineTotalEl) lineTotalEl.textContent = '$' + unit * qty;
                const minusBtn = row.querySelector('.cart-item-qty-minus');
                if (minusBtn) minusBtn.disabled = qty <= 1;
            });
            if (cartItemCountEl) cartItemCountEl.textContent = String(qtySum);
            if (cartSubtotalEl) cartSubtotalEl.textContent = '$' + subtotal;
            if (cartEmptyMsg) cartEmptyMsg.classList.toggle('hidden', rows.length > 0);
            if (cartCheckoutBtn) {
                const empty = rows.length === 0;
                cartCheckoutBtn.classList.toggle('pointer-events-none', empty);
                cartCheckoutBtn.classList.toggle('opacity-50', empty);
            }
        };

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
            cartSidebar.setAttribute('aria-hidden', 'false');
            cartBackdrop.classList.remove('opacity-0', 'invisible');
            cartBackdrop.classList.add('opacity-100');

            // Staggered animations for content
            if (cartHeader) {
                cartHeader.classList.remove('opacity-0', 'translate-y-4');
                cartHeader.classList.add('opacity-100', 'translate-y-0');
            }

            getCartRows().forEach((item) => {
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
            cartSidebar.setAttribute('aria-hidden', 'true');
            cartBackdrop.classList.remove('opacity-100');
            cartBackdrop.classList.add('opacity-0', 'invisible');

            // Reset animations for content
            if (cartHeader) {
                cartHeader.classList.add('opacity-0', 'translate-y-4');
                cartHeader.classList.remove('opacity-100', 'translate-y-0');
            }

            getCartRows().forEach((item) => {
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

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cartSidebar.classList.contains('translate-x-0')) {
                closeCart();
            }
        });

        if (cartItemsContainer) {
            cartItemsContainer.addEventListener('click', (e) => {
                const removeBtn = e.target.closest('.cart-item-remove');
                if (removeBtn) {
                    e.preventDefault();
                    const row = removeBtn.closest('.cart-item');
                    if (row) row.remove();
                    updateCartTotals();
                    return;
                }
                const plus = e.target.closest('.cart-item-qty-plus');
                if (plus) {
                    e.preventDefault();
                    const row = plus.closest('.cart-item');
                    if (!row) return;
                    const qtyEl = row.querySelector('.cart-item-qty');
                    let q = parseInt(qtyEl && qtyEl.textContent, 10) || 1;
                    if (q < 99) qtyEl.textContent = String(q + 1);
                    updateCartTotals();
                    return;
                }
                const minus = e.target.closest('.cart-item-qty-minus');
                if (minus) {
                    e.preventDefault();
                    if (minus.disabled) return;
                    const row = minus.closest('.cart-item');
                    if (!row) return;
                    const qtyEl = row.querySelector('.cart-item-qty');
                    let q = parseInt(qtyEl && qtyEl.textContent, 10) || 1;
                    if (q > 1) qtyEl.textContent = String(q - 1);
                    updateCartTotals();
                }
            });
        }

        if (cartCheckoutBtn) {
            cartCheckoutBtn.addEventListener('click', (e) => {
                if (!cartItemsContainer || cartItemsContainer.querySelectorAll('.cart-item').length === 0) {
                    e.preventDefault();
                }
            });
        }

        updateCartTotals();
    }

    // User Profile Dropdown Toggle
    const userProfileBtn = document.getElementById('user-profile-btn');
    const userProfileDropdown = document.getElementById('user-profile-dropdown');

    if (userProfileBtn && userProfileDropdown) {
        const toggleDropdown = (show) => {
            if (show) {
                userProfileDropdown.classList.remove('opacity-0', 'invisible', 'translate-y-4');
                userProfileDropdown.classList.add('opacity-100', 'visible', 'translate-y-0');
                userProfileBtn.setAttribute('aria-expanded', 'true');
            } else {
                userProfileDropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
                userProfileDropdown.classList.add('opacity-0', 'invisible', 'translate-y-4');
                userProfileBtn.setAttribute('aria-expanded', 'false');
            }
        };

        userProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = userProfileBtn.getAttribute('aria-expanded') === 'true';
            toggleDropdown(!isOpen);
        });

        document.addEventListener('click', (e) => {
            if (!userProfileDropdown.contains(e.target) && !userProfileBtn.contains(e.target)) {
                toggleDropdown(false);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                toggleDropdown(false);
            }
        });
    }

    // Language Switcher Dropdown Toggle
    const languageSwitcherBtn = document.getElementById('language-switcher-btn');
    const languageSwitcherDropdown = document.getElementById('language-switcher-dropdown');

    if (languageSwitcherBtn && languageSwitcherDropdown) {
        const toggleLanguageDropdown = (show) => {
            if (show) {
                languageSwitcherDropdown.classList.remove('opacity-0', 'invisible', 'translate-y-4');
                languageSwitcherDropdown.classList.add('opacity-100', 'visible', 'translate-y-0');
                languageSwitcherBtn.setAttribute('aria-expanded', 'true');
            } else {
                languageSwitcherDropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
                languageSwitcherDropdown.classList.add('opacity-0', 'invisible', 'translate-y-4');
                languageSwitcherBtn.setAttribute('aria-expanded', 'false');
            }
        };

        languageSwitcherBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = languageSwitcherBtn.getAttribute('aria-expanded') === 'true';
            toggleLanguageDropdown(!isOpen);
        });

        document.addEventListener('click', (e) => {
            if (!languageSwitcherDropdown.contains(e.target) && !languageSwitcherBtn.contains(e.target)) {
                toggleLanguageDropdown(false);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                toggleLanguageDropdown(false);
            }
        });

        languageSwitcherDropdown.addEventListener('click', (e) => {
            const link = e.target.closest('[data-lang-flag][data-lang-label]');
            if (!link) return;
            e.preventDefault();
            e.stopPropagation();
            const flag = link.getAttribute('data-lang-flag');
            const label = link.getAttribute('data-lang-label');
            const deskFlag = document.getElementById('language-switcher-flag');
            const deskLabel = document.getElementById('language-switcher-label');
            const mobFlag = document.getElementById('mobile-language-switcher-flag');
            const mobLabel = document.getElementById('mobile-language-switcher-label');
            const mobBtn = document.getElementById('mobile-language-switcher-display');
            if (deskFlag && flag) {
                deskFlag.src = flag;
                deskFlag.alt = label || '';
            }
            if (deskLabel && label) deskLabel.textContent = label;
            if (mobFlag && flag) {
                mobFlag.src = flag;
                if (label) mobFlag.alt = label;
            }
            if (mobLabel && label) mobLabel.textContent = label;
            if (mobBtn && label) mobBtn.setAttribute('aria-label', `Language, ${label}`);
            languageSwitcherBtn.setAttribute('aria-label', `Language, ${label}`);
            toggleLanguageDropdown(false);
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
                    if (filter === 'all' || category.split(' ').includes(filter)) {
                        swiperWrapper.appendChild(slide.cloneNode(true));
                    }
                });

                // Re-initialize swiper
                initCourseSwiper(popularCourseSwiper);
            });
        });
    }

    // Marketplace Course Tabs (Grid + Search)
    const courseTabsSection = document.querySelector('#course-tabs');

    if (courseTabsSection) {
        const tabList = courseTabsSection.querySelector('#course-tabs-tablist');
        const prevBtn = courseTabsSection.querySelector('[data-course-tabs-prev]');
        const nextBtn = courseTabsSection.querySelector('[data-course-tabs-next]');
        const filterBtns = Array.from(courseTabsSection.querySelectorAll('[data-course-filter]'));
        const items = Array.from(courseTabsSection.querySelectorAll('[data-course-item]'));
        const searchOpenBtn = courseTabsSection.querySelector('[data-course-search-open]');
        const searchCloseBtn = courseTabsSection.querySelector('[data-course-search-close]');
        const searchPopover = courseTabsSection.querySelector('[data-course-search-popover]');
        const searchInput = courseTabsSection.querySelector('#course-tabs-search');

        const ACTIVE_CLASSES = ['bg-secondary', 'text-white', 'border-secondary', 'shadow-[0px_10px_20px_rgba(147,130,255,0.3)]'];
        const INACTIVE_CLASSES = ['bg-white/5', 'border-white/10', 'text-white/60'];

        let currentFilter = 'all';
        let currentQuery = '';

        const setActiveBtn = (btn) => {
            filterBtns.forEach((b) => {
                b.classList.remove(...ACTIVE_CLASSES);
                b.classList.add(...INACTIVE_CLASSES);
            });

            if (btn) {
                btn.classList.remove(...INACTIVE_CLASSES);
                btn.classList.add(...ACTIVE_CLASSES);
            }
        };

        const applyFilters = () => {
            const query = currentQuery.trim().toLowerCase();

            items.forEach((item) => {
                const category = (item.getAttribute('data-course-category') || '').toLowerCase();
                const title = (item.getAttribute('data-course-title') || '').toLowerCase();
                const matchesFilter = currentFilter === 'all' || category === currentFilter;
                const matchesQuery = !query || title.includes(query);

                item.classList.toggle('hidden', !(matchesFilter && matchesQuery));
            });
        };

        filterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                currentFilter = (btn.getAttribute('data-course-filter') || 'all').toLowerCase();
                setActiveBtn(btn);
                applyFilters();
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', () => {
                currentQuery = searchInput.value || '';
                applyFilters();
            });
        }

        const openSearch = () => {
            if (!searchPopover) return;
            searchPopover.classList.remove('hidden');
            if (searchInput) searchInput.focus();
        };

        const closeSearch = () => {
            if (!searchPopover) return;
            if (searchInput) searchInput.value = '';
            currentQuery = '';
            applyFilters();
            searchPopover.classList.add('hidden');
        };

        if (searchOpenBtn) {
            searchOpenBtn.addEventListener('click', openSearch);
        }

        if (searchCloseBtn) {
            searchCloseBtn.addEventListener('click', closeSearch);
        }

        document.addEventListener('click', (e) => {
            if (!searchPopover || searchPopover.classList.contains('hidden')) return;
            if (searchPopover.contains(e.target) || (searchOpenBtn && searchOpenBtn.contains(e.target))) return;
            closeSearch();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchPopover && !searchPopover.classList.contains('hidden')) closeSearch();
        });

        const scrollTabsBy = (delta) => {
            if (!tabList) return;
            tabList.scrollBy({ left: delta, behavior: 'smooth' });
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => scrollTabsBy(-280));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => scrollTabsBy(280));
        }

        const updateTabViewport = () => {
            if (!tabList) return;

            const isDesktop = window.innerWidth >= 1024;
            if (!isDesktop) {
                tabList.style.maxWidth = '';
                return;
            }

            const tabs = Array.from(tabList.querySelectorAll('button[data-course-filter]'));
            const VISIBLE_TABS = 7;

            if (tabs.length <= VISIBLE_TABS) {
                tabList.style.maxWidth = '';
                return;
            }

            const styles = window.getComputedStyle(tabList);
            const gap = parseFloat(styles.gap || styles.columnGap || '0') || 0;

            let width = 0;
            for (let i = 0; i < VISIBLE_TABS; i += 1) {
                width += tabs[i].offsetWidth || 0;
            }
            width += gap * (VISIBLE_TABS - 1);

            tabList.style.maxWidth = `${Math.ceil(width)}px`;
        };

        updateTabViewport();
        window.addEventListener('resize', updateTabViewport);

        const defaultBtn = filterBtns.find((b) => (b.getAttribute('data-course-filter') || '').toLowerCase() === 'all') || filterBtns[0];
        setActiveBtn(defaultBtn);
        applyFilters();
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

    // About Section Tabs
    const aboutTabBtns = document.querySelectorAll('[data-about-tab]');
    const aboutContents = document.querySelectorAll('[data-about-content]');
    if (aboutTabBtns.length) {
        aboutTabBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const target = this.dataset.aboutTab;
                aboutTabBtns.forEach(b => {
                    b.classList.remove('gradient-color-primary', 'text-white', 'shadow-[0_8px_25px_rgba(178,110,247,0.4)]');
                    b.classList.add('bg-[#10102B]', 'border', 'border-white/[0.08]', 'text-[#D6DAF0]/70');
                });
                this.classList.add('gradient-color-primary', 'text-white');
                this.classList.remove('bg-[#10102B]', 'border', 'border-white/[0.08]', 'text-[#D6DAF0]/70');
                aboutContents.forEach(c => {
                    c.getAttribute('data-about-content') === target ? (c.classList.remove('hidden'), c.classList.add('block')) : (c.classList.remove('block'), c.classList.add('hidden'));
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
        navigation: {
            nextEl: '.testimonial-next',
            prevEl: '.testimonial-prev',
        },
        pagination: {
            el: '.testimonial-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            },
        },
    });

    // Sync Sliders
    testimonialContentSwiper.on('slideChange', function () {
        testimonialImageSwiper.slideToLoop(testimonialContentSwiper.realIndex);
    });

    // Hero Swiper Initialization
    const heroSwiperEl = document.querySelector('.hero-swiper');
    if (heroSwiperEl && window.Swiper) {
        const setActiveHeroBullet = (activeIndex) => {
            document.querySelectorAll('.hero-bullet').forEach((bullet) => {
                const bulletIndex = Number(bullet.getAttribute('data-index'));
                bullet.classList.toggle('active', bulletIndex === activeIndex);
            });
        };

        const heroSwiper = new Swiper(heroSwiperEl, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            speed: 1200,
            // autoplay: {
            //     delay: 6000,
            //     disableOnInteraction: false,
            // },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            on: {
                init: function () {
                    setActiveHeroBullet(this.realIndex);
                },
                slideChange: function () {
                    setActiveHeroBullet(this.realIndex);
                }
            }
        });

        // Hero Bullet Click
        document.querySelectorAll('.hero-bullet').forEach(bullet => {
            bullet.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                heroSwiper.slideToLoop(index);
            });
        });
    }

    // Marketplace Testimonial Swiper
    const testimonialMainSwiperEl = document.querySelector('.testimonial-main-swiper');
    if (testimonialMainSwiperEl && window.Swiper) {
        const mainImage = document.getElementById('testimonial-main-image');

        const testimonialMainSwiper = new Swiper(testimonialMainSwiperEl, {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            navigation: {
                nextEl: '.testimonial-next',
                prevEl: '.testimonial-prev',
            },
            pagination: {
                el: '.testimonial-pagination-main',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + ' w-3 h-3 !bg-white/20 !opacity-100 rounded-full transition-all duration-300 [&.swiper-pagination-bullet-active]:!bg-secondary [&.swiper-pagination-bullet-active]:w-8"></span>';
                },
            },
            on: {
                slideChange: function () {
                    if (mainImage) {
                        const activeSlide = this.slides[this.activeIndex];
                        const newImageUrl = activeSlide.getAttribute('data-main-image');

                        if (newImageUrl) {
                            // Smooth image transition
                            mainImage.style.opacity = '0';
                            mainImage.style.transform = 'scale(0.95)';

                            setTimeout(() => {
                                mainImage.src = newImageUrl;
                                mainImage.onload = () => {
                                    mainImage.style.opacity = '1';
                                    mainImage.style.transform = 'scale(1)';
                                };
                            }, 300);
                        }
                    }
                }
            }
        });
    }

    // New Experience Swiper
    const expContentSwiperEl = document.querySelector('.exp-content-swiper');
    const expThumbSwiperEl = document.querySelector('.exp-thumb-swiper');

    if (expContentSwiperEl && expThumbSwiperEl && window.Swiper) {
        const mainImg = document.getElementById('exp-main-img');
        const thumbItems = document.querySelectorAll('.exp-thumb-swiper [data-exp-index]');
        const expCurrentEl = document.getElementById('exp-current');
        const expProgressEl = document.getElementById('exp-progress');
        const totalExpSlides = expContentSwiperEl.querySelectorAll('.swiper-slide').length;

        const updateExpUI = (realIndex) => {
            if (expCurrentEl) expCurrentEl.textContent = String(realIndex + 1).padStart(2, '0');
            if (expProgressEl) expProgressEl.style.width = `${((realIndex + 1) / totalExpSlides) * 100}%`;
            expThumbSwiperEl.querySelectorAll('[data-exp-index]').forEach(thumb => {
                thumb.classList.toggle('active', parseInt(thumb.getAttribute('data-exp-index')) === realIndex);
            });
        };

        const expThumbSwiper = new Swiper(expThumbSwiperEl, {
            direction: 'vertical',
            slidesPerView: 3,
            spaceBetween: 20,
            centeredSlides: true,
            watchSlidesProgress: true,
            loop: false,
            speed: 800,
            breakpoints: {
                0: { direction: 'horizontal', slidesPerView: 3 },
                1024: { direction: 'vertical', slidesPerView: 3 },
            },
        });

        const expContentSwiper = new Swiper(expContentSwiperEl, {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 1000,
            autoplay: { delay: 5000, disableOnInteraction: false },
            effect: 'fade',
            fadeEffect: { crossFade: true },
            navigation: { nextEl: '.exp-nav-next', prevEl: '.exp-nav-prev' },
            on: {
                init: function () { updateExpUI(this.realIndex); },
                slideChange: function () {
                    const activeIndex = this.realIndex;
                    updateExpUI(activeIndex);
                    if (mainImg) {
                        const activeSlide = this.slides[this.activeIndex];
                        const newImgUrl = activeSlide && activeSlide.getAttribute('data-main-img');
                        if (newImgUrl && !mainImg.src.endsWith(newImgUrl)) {
                            mainImg.style.opacity = '0';
                            mainImg.style.transform = 'scale(0.95)';
                            setTimeout(() => {
                                mainImg.src = newImgUrl;
                                mainImg.style.opacity = '1';
                                mainImg.style.transform = 'scale(1)';
                            }, 400);
                        }
                    }
                    expThumbSwiper.slideTo(activeIndex);
                }
            }
        });

        thumbItems.forEach(thumb => {
            thumb.addEventListener('click', function () {
                expContentSwiper.slideToLoop(parseInt(this.getAttribute('data-exp-index')));
            });
        });
    }

    const navOverlay = document.getElementById('nav-overlay');
    const navGroups = document.querySelectorAll('header nav .group');
    if (navOverlay && navGroups.length) {
        navGroups.forEach(group => {
            group.addEventListener('mouseenter', () => {
                navOverlay.classList.remove('opacity-0', 'invisible');
                navOverlay.classList.add('opacity-100', 'visible');
                navOverlay.style.pointerEvents = 'auto';
            });
            group.addEventListener('mouseleave', () => {
                navOverlay.classList.add('opacity-0', 'invisible');
                navOverlay.classList.remove('opacity-100', 'visible');
                navOverlay.style.pointerEvents = 'none';
            });
        });
    }

    const topbarClose = document.getElementById('topbar-close');
    if (topbarClose) {
        topbarClose.addEventListener('click', () => document.getElementById('site-topbar').remove());
    }

    const heroThumbEl = document.querySelector('.hero-thumb-swiper');
    if (heroThumbEl && window.Swiper) {
        const heroData = [
            { subtitle: 'Education Platform', title: 'Starter A Creative Community Without Limits', desc: 'Education is the most powerful weapon which you can use to change. Leadership is not about a title or a designation it\'s about.', btn: 'Explore Course', img: 'assets/images/hero/hero-slider.webp' },
            { subtitle: 'Marketing & Growth', title: 'Master Digital Marketing Skills Today', desc: 'Unlock real-world marketing techniques used by industry leaders. Build campaigns that convert and grow your brand globally.', btn: 'Start Marketing', img: 'assets/images/hero/hero-slider-2.webp' },
            { subtitle: 'Technology', title: 'Build Your Tech Career From Ground Up', desc: 'Start from basics and climb to full-stack expertise. Join thousands of developers who transformed their careers.', btn: 'Start Coding', img: 'assets/images/hero/hero-slider-3.webp' },
            { subtitle: 'Creative Design', title: 'Explore Creative Arts & Design Fields', desc: 'Express yourself through powerful creative tools. Become a sought-after designer in any industry.', btn: 'Explore Design', img: 'assets/images/hero/hero-slider.webp' },
            { subtitle: 'Business', title: 'Launch Your Business With Expert Guidance', desc: 'Learn business fundamentals from scratch and turn your ideas into profitable ventures with mentorship.', btn: 'Start Business', img: 'assets/images/hero/hero-slider-2.webp' }
        ];

        let heroActiveIdx = -1;
        const hTitle = document.getElementById('hero-title');
        const hDesc = document.getElementById('hero-desc');
        const hSubtitle = document.getElementById('hero-subtitle');
        const hImg = document.getElementById('hero-main-img');
        const hBtn = document.getElementById('hero-btn');
        const hThumbs = document.querySelectorAll('.hero-thumb-item');

        const setHeroActive = (idx) => {
            if (idx === heroActiveIdx) return;
            heroActiveIdx = idx;
            hThumbs.forEach((t, i) => {
                const badge = t.querySelector('.hero-thumb-badge');
                const isActive = i === idx;
                t.classList.toggle('scale-100', isActive);
                t.classList.toggle('opacity-100', isActive);
                t.classList.toggle('scale-90', !isActive);
                t.classList.toggle('opacity-70', !isActive);
                if (badge) badge.classList.toggle('hidden', !isActive);
            });
            [hTitle, hDesc, hSubtitle].forEach(el => {
                if (el) { el.style.opacity = '0'; el.style.transform = 'translateY(10px)'; }
            });
            if (hImg) { hImg.style.opacity = '0'; hImg.style.transform = 'scale(0.96)'; }
            setTimeout(() => {
                const d = heroData[idx];
                if (hSubtitle) hSubtitle.textContent = d.subtitle;
                if (hTitle) hTitle.textContent = d.title;
                if (hDesc) hDesc.textContent = d.desc;
                if (hBtn) hBtn.textContent = d.btn;
                if (hImg) hImg.src = d.img;
                [hTitle, hDesc, hSubtitle].forEach(el => {
                    if (el) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }
                });
                if (hImg) { hImg.style.opacity = '1'; hImg.style.transform = 'scale(1)'; }
            }, 300);
        };

        new Swiper(heroThumbEl, {
            slidesPerView: 4,
            spaceBetween: 16,
            speed: 600,
            navigation: { nextEl: '.hero-thumb-next', prevEl: '.hero-thumb-prev' },
            breakpoints: { 0: { slidesPerView: 1.5, spaceBetween: 12 }, 640: { slidesPerView: 2.5, spaceBetween: 14 }, 1024: { slidesPerView: 4, spaceBetween: 16 } }
        });

        setHeroActive(0);
        hThumbs.forEach((t, i) => t.addEventListener('click', () => setHeroActive(i)));
    }

    // University Category Filter Tabs
    const catTabs = document.querySelectorAll('.cat-tab');
    const catCards = document.querySelectorAll('.cat-card');
    if (catTabs.length && catCards.length) {
        catTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                catTabs.forEach(t => t.classList.remove('active-tab'));
                tab.classList.add('active-tab');
                const filter = tab.dataset.tab;
                catCards.forEach(card => {
                    const show = filter === 'all' || card.dataset.cat === filter;
                    card.style.opacity = show ? '1' : '0.25';
                    card.style.transform = show ? 'scale(1)' : 'scale(0.96)';
                    card.style.pointerEvents = show ? '' : 'none';
                });
            });
        });
    }

    // Pricing Toggle
    const pricingToggle = document.querySelector('[data-pricing-toggle]');
    if (pricingToggle) {
        const toggleBtn = document.getElementById('billing-toggle');
        const toggleDot = document.getElementById('toggle-dot');
        const amounts = document.querySelectorAll('#pricing [data-price-amount]');
        
        if (toggleBtn && toggleDot) {
            let isYearly = false;
            
            toggleBtn.addEventListener('click', () => {
                isYearly = !isYearly;
                
                // Update Dot Position
                if (isYearly) {
                    toggleDot.style.transform = 'translateX(28px)';
                } else {
                    toggleDot.style.transform = 'translateX(0)';
                }
                
                // Update Prices
                amounts.forEach((el) => {
                    el.textContent = isYearly ? el.getAttribute('data-yearly') : el.getAttribute('data-monthly');
                });
            });
        }
    }

    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind('[data-fancybox]');
    }

    const testimonialLanguageSwiperEl = document.querySelector('.testimonial-language-swiper');
    if (testimonialLanguageSwiperEl && window.Swiper) {
        const testimonialLanguageSwiper = new Swiper(testimonialLanguageSwiperEl, {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            navigation: {
                nextEl: '.testimonial-language-next',
                prevEl: '.testimonial-language-prev'
            },
            pagination: {
                el: '.testimonial-language-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + ' w-[8px] h-[8px] rounded-full bg-white/20 transition-all duration-300 cursor-pointer hover:bg-white/40 inline-block swiper-pagination-bullet-inactive"></span>';
                }
            },
            breakpoints: {
                640: { slidesPerView: 1, spaceBetween: 24 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 30 }
            }
        });
    }

    // Instructor Swiper
    const instructorSwiperEl = document.querySelector('.instructor-swiper');
    if (instructorSwiperEl && window.Swiper) {
        new Swiper(instructorSwiperEl, {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            navigation: {
                nextEl: '.instructor-swiper-next',
                prevEl: '.instructor-swiper-prev'
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
            }
        });
    }

    const bookmarkBtns = document.querySelectorAll('[aria-label="Bookmark"]');
    bookmarkBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                this.style.transform = 'scale(1.2) rotate(12deg)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
            }
        });
    });

    // Counter Animation
    const counters1 = document.querySelectorAll('.counter');
    if (counters1.length) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    if (counter.dataset.counterAnimated === 'true') {
                        observer.unobserve(counter);
                        return;
                    }
                    const target = parseInt(counter.getAttribute('data-target'), 10);
                    if (!Number.isFinite(target)) {
                        observer.unobserve(counter);
                        return;
                    }
                    const duration = 2000; // 2 seconds
                    const frameRate = 1000 / 60; // 60fps
                    const totalFrames = Math.round(duration / frameRate);
                    let frame = 0;
                    counter.dataset.counterAnimated = 'true';
                    
                    const updateCounter = () => {
                        frame++;
                        const progress = frame / totalFrames;
                        // Ease out quad function for smoother finish
                        const easeOutQuad = t => t * (2 - t);
                        const current = Math.round(target * easeOutQuad(progress));
                        
                        if (frame <= totalFrames) {
                            renderCounterValue(counter, current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            renderCounterValue(counter, target);
                        }
                    };
                    
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.2 }); // Trigger earlier for better UX

        counters1.forEach(counter => counterObserver.observe(counter));
    }

    document.querySelectorAll('[data-course-detail-tabs]').forEach((root) => {
        const tabs = Array.from(root.querySelectorAll('[data-course-detail-tab]'));
        const panels = Array.from(root.querySelectorAll('[data-course-detail-panel]'));
        if (!tabs.length || !panels.length) return;
        const activate = (id) => {
            tabs.forEach((btn) => {
                const active = btn.getAttribute('data-course-detail-tab') === id;
                btn.classList.toggle('bg-secondary', active);
                btn.classList.toggle('border-secondary', active);
                btn.classList.toggle('text-white', active);
                btn.classList.toggle('shadow-[0px_8px_25px_rgba(147,130,255,0.35)]', active);
                btn.classList.toggle('bg-white/[0.04]', !active);
                btn.classList.toggle('border-white/10', !active);
                btn.classList.toggle('text-white/70', !active);
                btn.setAttribute('aria-selected', active ? 'true' : 'false');
            });
            panels.forEach((panel) => {
                const show = panel.getAttribute('data-course-detail-panel') === id;
                panel.classList.toggle('hidden', !show);
            });
        };
        tabs.forEach((btn) => {
            btn.addEventListener('click', () => activate(btn.getAttribute('data-course-detail-tab')));
        });
        const first = tabs[0].getAttribute('data-course-detail-tab');
        if (first) activate(first);
    });

    const coursesArchive = document.querySelector('[data-courses-archive]');
    if (coursesArchive) {
        const gridEl = coursesArchive.querySelector('#courses-archive-grid');
        const viewBtns = coursesArchive.querySelectorAll('[data-courses-view]');
        const topicChips = coursesArchive.querySelectorAll('.courses-topic-chip');
        const sortSelect = coursesArchive.querySelector('#courses-archive-sort');
        const countEl = coursesArchive.querySelector('#courses-archive-count');
        let items = Array.from(coursesArchive.querySelectorAll('[data-course-archive-item]'));
        const searchInput = coursesArchive.querySelector('#courses-archive-search');
        const gridCls = 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6';
        let activeTopic = '';
        const chipOn =
            'courses-topic-chip shrink-0 min-h-[40px] px-3.5 py-2 rounded-[50px] text-[13px] font-semibold font-inter bg-secondary text-white border border-secondary shadow-[0px_6px_18px_rgba(147,130,255,0.35)] transition-all';
        const chipOff =
            'courses-topic-chip shrink-0 min-h-[40px] px-3.5 py-2 rounded-[50px] text-[13px] font-semibold font-inter bg-white/[0.05] text-[#D6DAF0] border border-white/12 hover:border-white/25 hover:text-white transition-all';
        const setBtn = (btn, on) => {
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
            btn.className = on
                ? 'courses-view-btn w-11 h-11 rounded-[10px] flex items-center justify-center bg-secondary text-white border border-secondary shadow-[0px_8px_20px_rgba(147,130,255,0.35)] transition-all'
                : 'courses-view-btn w-11 h-11 rounded-[10px] flex items-center justify-center bg-white/[0.05] border border-white/10 text-[#D6DAF0] hover:text-white hover:border-white/20 transition-all';
        };
        const setView = (mode) => {
            const list = mode === 'list';
            if (gridEl) gridEl.className = list ? 'flex flex-col gap-5' : gridCls;
            items.forEach((card) => {
                const thumb = card.querySelector('.course-archive-thumb');
                if (list) {
                    card.classList.add('sm:flex-row', 'sm:items-stretch');
                    if (thumb) {
                        thumb.classList.add('sm:w-[280px]', 'sm:shrink-0', 'sm:self-stretch', 'sm:min-h-[200px]', 'sm:aspect-auto');
                    }
                } else {
                    card.classList.remove('sm:flex-row', 'sm:items-stretch');
                    if (thumb) {
                        thumb.classList.remove('sm:w-[280px]', 'sm:shrink-0', 'sm:self-stretch', 'sm:min-h-[200px]', 'sm:aspect-auto');
                    }
                }
            });
            viewBtns.forEach((b) => setBtn(b, (b.getAttribute('data-courses-view') || 'grid') === mode));
        };
        const applyFilters = () => {
            const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
            let visible = 0;
            items.forEach((card) => {
                const topic = (card.getAttribute('data-course-topic') || '').trim();
                const okTopic = !activeTopic || topic === activeTopic;
                const okSearch = !q || (card.textContent || '').toLowerCase().includes(q);
                const show = okTopic && okSearch;
                card.classList.toggle('hidden', !show);
                if (show) visible += 1;
            });
            if (countEl) {
                const total = items.length;
                if (visible === total && !q && !activeTopic) {
                    countEl.innerHTML = '<span class="text-white/90 font-medium">Showing 1–' + total + '</span> of 30 results';
                } else {
                    countEl.innerHTML = '<span class="text-white/90 font-medium">' + visible + '</span> course' + (visible !== 1 ? 's' : '') + ' match your filters';
                }
            }
        };
        const sortItems = () => {
            if (!gridEl || !sortSelect) return;
            const mode = sortSelect.value;
            const sorted = items.slice();
            const title = (el) => (el.querySelector('h2 a') || el.querySelector('h2'))?.textContent?.trim() || '';
            const price = (el) => parseFloat(el.getAttribute('data-course-price') || '0') || 0;
            if (mode === 'title-asc') sorted.sort((a, b) => title(a).localeCompare(title(b)));
            else if (mode === 'title-desc') sorted.sort((a, b) => title(b).localeCompare(title(a)));
            else if (mode === 'price-asc') sorted.sort((a, b) => price(a) - price(b));
            else if (mode === 'price-desc') sorted.sort((a, b) => price(b) - price(a));
            sorted.forEach((n) => gridEl.appendChild(n));
            items = sorted;
        };
        viewBtns.forEach((b) => b.addEventListener('click', () => setView(b.getAttribute('data-courses-view') || 'grid')));
        topicChips.forEach((chip) => {
            chip.addEventListener('click', () => {
                activeTopic = (chip.getAttribute('data-course-topic') || '').trim();
                topicChips.forEach((c) => {
                    const isAll = c.getAttribute('data-course-topic') === '';
                    const t = (c.getAttribute('data-course-topic') || '').trim();
                    const on = isAll ? activeTopic === '' : t === activeTopic;
                    c.className = on ? chipOn : chipOff;
                });
                applyFilters();
            });
        });
        if (sortSelect) sortSelect.addEventListener('change', () => { sortItems(); applyFilters(); });
        if (searchInput && items.length) searchInput.addEventListener('input', applyFilters);
        applyFilters();
    }

    const eventsArchive = document.querySelector('[data-events-archive]');
    if (eventsArchive) {
        const topicChips = eventsArchive.querySelectorAll('.events-topic-chip');
        const countEl = eventsArchive.querySelector('#events-archive-count');
        const items = Array.from(eventsArchive.querySelectorAll('[data-event-archive-item]'));
        const searchInput = eventsArchive.querySelector('#events-archive-search');
        let activeTopic = '';
        const chipOn =
            'events-topic-chip shrink-0 min-h-[40px] px-3.5 py-2 rounded-[50px] text-[13px] font-semibold font-inter bg-secondary text-white border border-secondary shadow-[0px_6px_18px_rgba(147,130,255,0.35)] transition-all';
        const chipOff =
            'events-topic-chip shrink-0 min-h-[40px] px-3.5 py-2 rounded-[50px] text-[13px] font-semibold font-inter bg-white/[0.05] text-[#D6DAF0] border border-white/12 hover:border-white/25 hover:text-white transition-all';
        const applyFilters = () => {
            const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
            let visible = 0;
            items.forEach((card) => {
                const topic = (card.getAttribute('data-event-topic') || '').trim();
                const okTopic = !activeTopic || topic === activeTopic;
                const okSearch = !q || (card.textContent || '').toLowerCase().includes(q);
                const show = okTopic && okSearch;
                card.classList.toggle('hidden', !show);
                if (show) visible += 1;
            });
            if (countEl) {
                const total = items.length;
                if (visible === total && !q && !activeTopic) {
                    countEl.innerHTML = '<span class="text-white/90 font-medium">Showing ' + total + '</span> events';
                } else {
                    countEl.innerHTML =
                        '<span class="text-white/90 font-medium">' +
                        visible +
                        '</span> event' +
                        (visible !== 1 ? 's' : '') +
                        ' match';
                }
            }
        };
        topicChips.forEach((chip) => {
            chip.addEventListener('click', () => {
                activeTopic = (chip.getAttribute('data-event-topic') || '').trim();
                topicChips.forEach((c) => {
                    const isAll = c.getAttribute('data-event-topic') === '';
                    const t = (c.getAttribute('data-event-topic') || '').trim();
                    const on = isAll ? activeTopic === '' : t === activeTopic;
                    c.className = on ? chipOn : chipOff;
                });
                applyFilters();
            });
        });
        if (searchInput && items.length) searchInput.addEventListener('input', applyFilters);
        applyFilters();
    }

    document.querySelectorAll('[data-about-expand]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const sel = btn.getAttribute('data-about-expand');
            const target = sel ? document.querySelector(sel) : null;
            if (!target) return;
            const expanded = target.getAttribute('data-expanded') === 'true';
            if (expanded) {
                target.classList.add('line-clamp-4');
                target.setAttribute('data-expanded', 'false');
                btn.textContent = 'Show more';
            } else {
                target.classList.remove('line-clamp-4');
                target.setAttribute('data-expanded', 'true');
                btn.textContent = 'Show less';
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length && !document.querySelector('[data-faq-accordion]')) {
        const firstItem = faqItems[0];
        const firstAnswer = firstItem.querySelector('.faq-answer');
        const firstIcon = firstItem.querySelector('.faq-icon i');
        if (firstAnswer && firstIcon) {
            firstItem.classList.add('active');
            firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
            firstIcon.classList.remove('fa-plus');
            firstIcon.classList.add('fa-minus');
        }

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon i');
            const number = item.querySelector('.faq-number');

            if (question && answer) {
                question.addEventListener('click', () => {
                    const isOpen = item.classList.contains('active');

                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            const otherIcon = otherItem.querySelector('.faq-icon i');
                            otherItem.classList.remove('active');
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            if (otherAnswer) otherAnswer.style.maxHeight = '0';
                            if (otherIcon) {
                                otherIcon.classList.remove('fa-minus');
                                otherIcon.classList.add('fa-plus');
                            }
                        }
                    });

                    if (!isOpen) {
                        item.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        if (icon) {
                            icon.classList.remove('fa-plus');
                            icon.classList.add('fa-minus');
                        }
                        if (number) {
                            number.style.transform = 'scale(1.1)';
                            setTimeout(() => {
                                number.style.transform = '';
                            }, 300);
                        }
                    } else {
                        item.classList.remove('active');
                        answer.style.maxHeight = '0';
                        if (icon) {
                            icon.classList.remove('fa-minus');
                            icon.classList.add('fa-plus');
                        }
                    }
                });
            }
        });
    }

    (function initEducateCursor() {
        if (!window.matchMedia('(pointer: fine)').matches) {
            return;
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const root = document.createElement('div');
        root.id = 'educate-cursor-root';
        root.setAttribute('aria-hidden', 'true');
        const ring = document.createElement('div');
        ring.id = 'educate-cursor-ring';
        const dot = document.createElement('div');
        dot.id = 'educate-cursor-dot';
        root.appendChild(ring);
        root.appendChild(dot);
        document.body.appendChild(root);

        let mx = -100;
        let my = -100;
        let rx = -100;
        let ry = -100;
        let dx = -100;
        let dy = -100;
        let visible = false;
        let raf = 0;

        const lerp = (a, b, t) => a + (b - a) * t;

        const isFormField = (el) => {
            if (!el || el.nodeType !== 1) return false;
            const n = el.nodeName;
            if (n === 'INPUT' || n === 'TEXTAREA' || n === 'SELECT') return true;
            if (el.isContentEditable || el.getAttribute('contenteditable') === 'true') return true;
            return !!el.closest('input, textarea, select, [contenteditable="true"]');
        };

        const setHover = (on) => {
            root.classList.toggle('is-hover', on);
        };

        const setFormMode = (on) => {
            root.classList.toggle('is-hidden', on);
            document.body.classList.toggle('has-custom-cursor', !on && visible);
        };

        const loop = () => {
            rx = lerp(rx, mx, 0.12);
            ry = lerp(ry, my, 0.12);
            dx = lerp(dx, mx, 0.45);
            dy = lerp(dy, my, 0.45);
            const hover = root.classList.contains('is-hover');
            ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
            dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${hover ? 0.82 : 1})`;
            raf = requestAnimationFrame(loop);
        };

        document.addEventListener(
            'mousemove',
            (e) => {
                mx = e.clientX;
                my = e.clientY;
                if (!visible) {
                    visible = true;
                    root.classList.add('is-visible');
                    document.body.classList.add('has-custom-cursor');
                    cancelAnimationFrame(raf);
                    raf = requestAnimationFrame(loop);
                }
            },
            { passive: true }
        );

        document.addEventListener(
            'mouseover',
            (e) => {
                const t = e.target;
                if (isFormField(t)) {
                    setFormMode(true);
                    setHover(false);
                    return;
                }
                setFormMode(false);
                const interactive = t.closest(
                    'a[href], button, [role="button"], label[for], .cursor-pointer, [data-cursor-hover]'
                );
                setHover(!!interactive);
            },
            true
        );

        const hideCursor = () => {
            root.classList.remove('is-visible');
            document.body.classList.remove('has-custom-cursor');
            visible = false;
            cancelAnimationFrame(raf);
        };

        document.documentElement.addEventListener('mouseleave', hideCursor);

        window.addEventListener('blur', hideCursor);
    })();

    document.body.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-copy-value]');
        if (!btn || btn.closest('a')) return;
        const text = btn.getAttribute('data-copy-value');
        if (!text) return;
        e.preventDefault();
        const label = btn.querySelector('[data-copy-label]');
        const setLabel = function (t) {
            if (label) label.textContent = t;
        };
        const orig = label ? label.textContent : '';
        const done = function () {
            if (label) setLabel('Copied');
            setTimeout(function () {
                if (label) setLabel(orig);
            }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done).catch(function () {});
        }
    });

    const pricingBillingToggle = document.getElementById('pricing-billing-toggle');
    const pricingBillingKnob = document.getElementById('pricing-billing-knob');
    if (pricingBillingToggle) {
        const syncPricingBilling = function () {
            const yr = pricingBillingToggle.checked;
            document.querySelectorAll('.js-pricing-mo').forEach(function (el) {
                el.classList.toggle('hidden', yr);
            });
            document.querySelectorAll('.js-pricing-yr').forEach(function (el) {
                el.classList.toggle('hidden', !yr);
            });
            if (pricingBillingKnob) {
                pricingBillingKnob.classList.toggle('translate-x-7', yr);
            }
        };
        pricingBillingToggle.addEventListener('change', syncPricingBilling);
        syncPricingBilling();
    }
});