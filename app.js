// Portfolio Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fix "View Projects" button
    const viewProjectsBtn = document.querySelector('a[href="#projects"]');
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const offsetTop = projectsSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Active navigation highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Modal functionality - Fixed
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    // Make modal functions globally available
    window.openModal = openModal;
    window.closeModal = closeModal;

    // Project card click handlers - Fixed
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const modalId = `project${index + 1}`;
            openModal(modalId);
        });
    });

    // Modal close handlers
    document.addEventListener('click', function(e) {
        // Close modal when clicking outside
        if (e.target.classList.contains('modal')) {
            e.target.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
        
        // Close modal when clicking close button
        if (e.target.classList.contains('close')) {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal:not(.hidden)');
            if (openModal) {
                openModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameField = contactForm.querySelector('input[type="text"]');
            const emailField = contactForm.querySelector('input[type="email"]');
            const subjectField = contactForm.querySelectorAll('input[type="text"]')[1];
            const messageField = contactForm.querySelector('textarea');
            
            const fields = [nameField, emailField, subjectField, messageField];
            
            // Simple form validation
            let isValid = true;
            fields.forEach(field => {
                if (field) {
                    field.classList.remove('error');
                    if (!field.value.trim()) {
                        field.classList.add('error');
                        isValid = false;
                    }
                }
            });

            if (isValid) {
                // Show success message
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showNotification('Please fill in all fields.', 'error');
            }
        });
    }

    // Resume Download Functionality - Fixed
    function downloadResume() {
        // Create a comprehensive resume content
        const link = document.createElement('a');
    link.href = 'resume.pdf'; // Path to your existing PDF
    link.download = 'Bojedla_Sai_Ram_Resume.pdf';
    
        link.download = 'Bojedla_Sai_Ram_Resume.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        showNotification('Resume downloaded successfully!', 'success');
    }

    // Download button event listeners - Fixed
    const downloadBtn = document.getElementById('download-resume-btn');
    const navDownloadBtn = document.getElementById('nav-download-btn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            downloadResume();
        });
    }
    
    if (navDownloadBtn) {
        navDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            downloadResume();
        });
    }

    // Contact Links - Fixed to work properly
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        // Remove any existing onclick handlers
        link.removeAttribute('onclick');
        
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle different types of contact links
            if (href && href.startsWith('tel:')) {
                // Phone link - let it work naturally
                showNotification('Opening phone dialer...', 'info');
                // Don't prevent default for tel: links
            } else if (href && href.startsWith('mailto:')) {
                // Email link - let it work naturally  
                showNotification('Opening email client...', 'info');
                // Don't prevent default for mailto: links
            } else if (href && href.includes('linkedin')) {
                // LinkedIn link - let it work naturally
                showNotification('Opening LinkedIn profile...', 'info');
                // Don't prevent default for external links with target="_blank"
            }
        });
    });

    // Animated Counter
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = start + (target - start) * easeOutQuart;
            
            // Handle decimal values
            if (target % 1 !== 0) {
                element.textContent = current.toFixed(2);
            } else {
                element.textContent = Math.floor(current);
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(update);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate counters
                if (entry.target.classList.contains('hero')) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = parseFloat(counter.getAttribute('data-target'));
                        animateCounter(counter, target);
                    });
                }
                
                // Animate skill bars
                if (entry.target.classList.contains('skills')) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        setTimeout(() => {
                            const width = bar.getAttribute('data-width');
                            bar.style.width = width + '%';
                        }, 300);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 4000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (notification.parentNode) {
                    notification.style.transform = 'translateX(400px)';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.remove();
                        }
                    }, 300);
                }
            });
        }
    }

    // Make showNotification globally available
    window.showNotification = showNotification;

    // Scroll to top functionality
    function createScrollToTopButton() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollButton.className = 'scroll-to-top';

        document.body.appendChild(scrollButton);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollButton.style.opacity = '1';
                scrollButton.style.visibility = 'visible';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.visibility = 'hidden';
            }
        });

        // Scroll to top functionality
        scrollButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    createScrollToTopButton();

    // Typing effect for hero tagline
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect for hero tagline
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        const originalText = heroTagline.textContent;
        setTimeout(() => {
            typeWriter(heroTagline, originalText, 30);
        }, 1000);
    }

    // Add loading animation
    function addLoadingAnimation() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p>Loading Portfolio...</p>
            </div>
        `;

        document.body.appendChild(loader);

        // Remove loader after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.remove();
                    }
                }, 500);
            }, 500);
        });
    }

    addLoadingAnimation();

    // Project card hover effects
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add stagger animation to elements
    function staggerAnimation(elements, delay = 100) {
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * delay);
        });
    }

    // Initialize stagger animations when sections come into view
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('projects')) {
                    const projectCards = entry.target.querySelectorAll('.project-card');
                    staggerAnimation(projectCards, 150);
                }
                
                if (entry.target.classList.contains('certifications')) {
                    const certCards = entry.target.querySelectorAll('.cert-card');
                    staggerAnimation(certCards, 100);
                }
                
                if (entry.target.classList.contains('about')) {
                    const highlights = entry.target.querySelectorAll('.highlight-item');
                    staggerAnimation(highlights, 200);
                }
                
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observe sections for stagger animations
    const staggerSections = document.querySelectorAll('.projects, .certifications, .about');
    staggerSections.forEach(section => {
        staggerObserver.observe(section);
    });

    // Enhanced form validation with real-time feedback
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });

        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('error');
            }
        });
    });

    // Add theme detection for better visual feedback
    function detectTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-color-scheme', prefersDark ? 'dark' : 'light');
    }

    detectTheme();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectTheme);

    // Add smooth reveal animations for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        timelineObserver.observe(item);
    });

    // Add click to copy functionality for contact info
    function addCopyToClipboard() {
        const phoneNumber = '+91 9502790429';
        const email = 'bojedlasairam@gmail.com';
        
        document.addEventListener('contextmenu', function(e) {
            const target = e.target.closest('.contact-item, .contact-item-large');
            if (target) {
                e.preventDefault();
                
                let textToCopy = '';
                if (target.textContent.includes(phoneNumber)) {
                    textToCopy = phoneNumber;
                } else if (target.textContent.includes(email)) {
                    textToCopy = email;
                }
                
                if (textToCopy) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        showNotification(`${textToCopy} copied to clipboard!`, 'success');
                    }).catch(() => {
                        showNotification('Failed to copy to clipboard', 'error');
                    });
                }
            }
        });
    }

    addCopyToClipboard();

    // Initialize all interactive features
    console.log('Portfolio loaded successfully! All interactive features are ready.');
    
    // Add a subtle welcome message
    setTimeout(() => {
        showNotification('Welcome to Sai Ram\'s Portfolio! Click contact info to connect.', 'info');
    }, 2000);
});
