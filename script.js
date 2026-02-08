// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-button');
    const navLinks = document.querySelectorAll('.nav-link, .nav-button');
    
    // Toggle mobile menu
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for all anchor links
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    allAnchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or external link
            if (href === '#' || href.startsWith('http')) return;
            
            e.preventDefault();
            
            const targetId = href;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate offset for navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Navbar scroll effect - Updated for transparent navbar
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Keep navbar transparent always - removed background change on scroll
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Highlight active nav link
        highlightActiveNavLink();
    });
    
    // Highlight active nav link on scroll
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Desktop nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                
                // Mobile nav links
                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Add active class style
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active,
        .mobile-nav-link.active {
            color: #ff914d !important;
        }
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Portfolio item hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const image = this.querySelector('.portfolio-image');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const image = this.querySelector('.portfolio-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    // Animated Counter for Stats
    const counters = document.querySelectorAll('.count');
    const speed = 200;
    
    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => startCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };
    
    // Start counters when section is in view
    const statsSection = document.querySelector('.bg-gray-900');
    if (statsSection && counters.length > 0) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => {
                        startCounter(counter);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        observer.observe(statsSection);
    }
    
    // Social media icons hover effect
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Hide mobile menu on desktop
        if (window.innerWidth >= 1024 && mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // Initialize with current position
    highlightActiveNavLink();
    
    // Initialize image animations
    initImageAnimations();
});

// Image animations functionality
function initImageAnimations() {
    const floatingImages = document.querySelectorAll('.floating-image');
    
    floatingImages.forEach((image, index) => {
        // Get delay from data attribute or calculate
        const delay = image.dataset.delay || (index * 0.2) + 's';
        
        // Set animation delay
        image.style.animationDelay = delay;
        
        // Add different animation delays for floating effect
        const floatDelay = Math.random() * 2;
        image.style.animationDelay += `, ${floatDelay}s`;
        
        // Add random initial tilt
        const randomTilt = (Math.random() * 8) - 4; // -4 to 4 degrees for less extreme tilt
        image.style.setProperty('--tilt-angle', `${randomTilt}deg`);
        
        // Start animations
        setTimeout(() => {
            image.style.animationPlayState = 'running';
        }, 100);
    });
    
    // Start main animations with slight delay
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
}

// Preload images for better performance
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            img.style.opacity = '0';
        }
    });
});


// Add active class to current page in navigation
const currentPage = window.location.pathname.split('/').pop();
if (currentPage === 'about.html' || currentPage === 'about') {
    document.querySelectorAll('.nav-link[href*="about"]').forEach(link => {
        link.classList.add('active');
    });
    document.querySelectorAll('.mobile-nav-link[href*="about"]').forEach(link => {
        link.classList.add('active');
    });
}

// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item-advanced');
    const portfolioSections = document.querySelectorAll('.portfolio-section');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide portfolio sections
            portfolioSections.forEach(section => {
                const category = section.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
            
            // Animate portfolio items
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                }
            });
        });
    });

    // Carousel animation for portfolio items
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dots span');
        let currentSlide = 0;
        
        function showSlide(n) {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === n);
                if (dots[index]) {
                    dots[index].classList.toggle('active', index === n);
                }
            });
        }
        
        // Auto-rotate slides
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 3000);
    });

    // Portfolio item click handlers
    portfolioItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!e.target.closest('.portfolio-link')) {
                const title = this.querySelector('.portfolio-title-advanced');
                const tag = this.querySelector('.portfolio-tag');
                
                // Add click animation
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                console.log(`Clicked on ${tag?.textContent}: ${title?.textContent}`);
                // You can add modal or navigation logic here
            }
        });
    });

    // Video play simulation
    const videoThumbnails = document.querySelectorAll('.video-thumbnail, .video-thumbnail-large');
    
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const playButton = this.querySelector('.play-button, .play-button-large');
            if (playButton) {
                playButton.innerHTML = '<i class="ri-loader-4-line"></i>';
                playButton.style.transform = 'scale(1.2)';
                
                setTimeout(() => {
                    playButton.innerHTML = '<i class="ri-check-line"></i>';
                    playButton.style.background = '#27ca3f';
                    playButton.style.color = 'white';
                    
                    setTimeout(() => {
                        playButton.innerHTML = '<i class="ri-play-fill"></i>';
                        playButton.style.background = '';
                        playButton.style.color = '';
                        playButton.style.transform = '';
                    }, 1000);
                }, 1000);
            }
        });
    });

    // Initialize with all items visible
    portfolioItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
});

// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe portfolio sections
    document.querySelectorAll('.portfolio-section').forEach(section => {
        observer.observe(section);
    });
});