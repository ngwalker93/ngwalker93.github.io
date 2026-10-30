// addMobileTouchEnhancements is a function that improves mobile touch experience
function addMobileTouchEnhancements() {    
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('touchstart', function() {
            this.style.background = '#333';
        });
        
        link.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.background = '';
            }, 150);
        });
    });
    
    if (window.innerWidth <= 600) {
        console.log('Mobile device detected - touch controls enabled');
    }
}

// initializeNavigation is a function that highlights the current page in the navigation bar
function initializeNavigation(currentPath = (window.location.pathname.split('/').pop() || 'index.html')) {
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}

// initializeSmoothScrolling is a function that enables smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            const menuToggle = document.getElementById('menu__toggle');
            if (menuToggle) {
                menuToggle.checked = false;
            }
        });
    });
}

// initializeBackToTop sets up the sticky back-to-top button for relevant pages
function initializeBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) {
        return;
    }

    const showAfter = 300;
    let lastScrollY = window.scrollY || window.pageYOffset;

    function updateButtonVisibility() {
        const currentY = window.scrollY || window.pageYOffset;
        if (currentY > showAfter) {
            btn.classList.add('show');
            try { 
                btn.style.display = 'block'; 
            } catch (e) {}

            btn.setAttribute('aria-hidden', 'false');
        } else {
            btn.classList.remove('show');
            try { 
                btn.style.display = 'none'; 
            } catch (e) {}

            btn.setAttribute('aria-hidden', 'true');
        }

        lastScrollY = currentY;
    }

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateButtonVisibility();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            window.scrollTo(0, 0);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        document.body.focus({ preventScroll: true });
    });

    try { 
        btn.style.display = 'block'; 
    } catch (e) {}

    btn.setAttribute('aria-hidden', 'false');

    window.requestAnimationFrame(updateButtonVisibility);
}

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSmoothScrolling();
    initializeBackToTop();
});