(function() {
    'use strict';
    
    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (mobileMenu && !mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }
    
    // Scroll animations for portfolio sections
    const animateElements = document.querySelectorAll(
        '.portfolio-gif-section, .gif-header'
    );
    
    animateElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.6s ease';
    });
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0px)';
                    observer.unobserve(entry.target);
                }
            });
        },
        { 
            threshold: 0.1, 
            rootMargin: '0px 0px -50px 0px' 
        }
    );
    
    animateElements.forEach((el) => {
        observer.observe(el);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle GIF loading errors with retry
    const gifs = document.querySelectorAll('.gif-wrapper img, .gif-wrapper-vertical img');
    gifs.forEach((gif) => {
        gif.addEventListener('error', function() {
            console.log('GIF failed to load:', this.src);
            // Optional: Add a retry mechanism
            setTimeout(() => {
                const originalSrc = this.src;
                this.src = '';
                this.src = originalSrc;
            }, 1000);
        });
        
        // Ensure GIF is loaded
        if (gif.complete) {
            console.log('GIF loaded successfully:', gif.src);
        }
    });
    
    // Page load handler - trigger animations for visible elements
    window.addEventListener('load', () => {
        setTimeout(() => {
            animateElements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0px)';
                }
            });
        }, 100);
    });
    
    // Fix for mobile menu close on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 1024 && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        }, 250);
    });
})();