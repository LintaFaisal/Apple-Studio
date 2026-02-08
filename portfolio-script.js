// Clean Portfolio Script
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images
    const images = document.querySelectorAll('.website-full-image, .social-image-placeholder');
    
    images.forEach(img => {
        // Add loading animation
        img.style.opacity = '0';
        img.style.transform = 'scale(1.1)';
        
        // Simulate image load
        setTimeout(() => {
            img.style.transition = 'all 0.6s ease';
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }, 300);
    });

    // Click effect for website links
    const websiteLinks = document.querySelectorAll('.clean-website-link');
    
    websiteLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click animation
            const image = this.querySelector('.website-full-image');
            if (image) {
                image.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    image.style.transform = '';
                }, 200);
            }
            
            // Show loading indicator in overlay
            const overlay = this.querySelector('.website-overlay');
            const visitText = this.querySelector('.visit-site');
            if (overlay && visitText) {
                const originalText = visitText.textContent;
                visitText.textContent = 'Opening...';
                visitText.style.background = 'var(--accent-hover)';
                
                setTimeout(() => {
                    visitText.textContent = originalText;
                    visitText.style.background = '';
                }, 1500);
            }
        });
    });

    // Hover effect for social items
    const socialItems = document.querySelectorAll('.social-item');
    
    socialItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const image = this.querySelector('.social-image-placeholder');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const image = this.querySelector('.social-image-placeholder');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });

    // Scroll animations
    const portfolioItems = document.querySelectorAll('.clean-website-item, .social-item');
    
    function checkScroll() {
        portfolioItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.85);
            
            if (isVisible) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial state for animations
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check

    // Mobile menu for portfolio page
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }
});