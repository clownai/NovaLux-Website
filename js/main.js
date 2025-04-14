// Enhanced interactive features for NovaLux AI Casino website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Animated entrance for sections
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check and add scroll listener
    checkScroll();
    window.addEventListener('scroll', checkScroll);
    
    // Interactive game cards
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
        
        // Add click event for mobile
        card.addEventListener('click', function() {
            // Toggle active class on mobile
            if (window.innerWidth <= 768) {
                this.classList.toggle('active');
            }
        });
    });
    
    // Faction selection interaction
    const factionButtons = document.querySelectorAll('.faction-button');
    const factionInfo = document.querySelectorAll('.faction-info');
    
    factionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const faction = this.getAttribute('data-faction');
            
            // Remove active class from all buttons and info panels
            factionButtons.forEach(btn => btn.classList.remove('active'));
            factionInfo.forEach(info => info.classList.remove('active'));
            
            // Add active class to selected button and info panel
            this.classList.add('active');
            document.querySelector(`.faction-info[data-faction="${faction}"]`).classList.add('active');
        });
    });
    
    // Cyberpunk cursor effect
    const cursorEffect = document.createElement('div');
    cursorEffect.classList.add('cursor-effect');
    document.body.appendChild(cursorEffect);
    
    document.addEventListener('mousemove', function(e) {
        // Only show effect on larger screens
        if (window.innerWidth > 768) {
            cursorEffect.style.left = e.clientX + 'px';
            cursorEffect.style.top = e.clientY + 'px';
            cursorEffect.classList.add('active');
            
            // Add ripple effect on click
            document.addEventListener('click', function() {
                cursorEffect.classList.add('click');
                setTimeout(() => {
                    cursorEffect.classList.remove('click');
                }, 500);
            });
        }
    });
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            }
        });
    }
    
    // Animated counter for statistics
    const statCounters = document.querySelectorAll('.stat-counter');
    
    function animateCounter(counter, target) {
        let count = 0;
        const duration = 2000; // 2 seconds
        const interval = 50; // Update every 50ms
        const steps = duration / interval;
        const increment = target / steps;
        
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                clearInterval(timer);
                counter.textContent = target;
            } else {
                counter.textContent = Math.floor(count);
            }
        }, interval);
    }
    
    function checkCounters() {
        statCounters.forEach(counter => {
            const position = counter.getBoundingClientRect().top;
            
            if (position < window.innerHeight && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            }
        });
    }
    
    // Check counters on scroll
    window.addEventListener('scroll', checkCounters);
    checkCounters(); // Initial check
    
    // Interactive AI components visualization
    const aiComponents = document.querySelectorAll('.ai-component');
    
    aiComponents.forEach(component => {
        component.addEventListener('click', function() {
            // Toggle active state
            const wasActive = this.classList.contains('active');
            
            // Remove active class from all components
            aiComponents.forEach(comp => comp.classList.remove('active'));
            
            // If the clicked component wasn't active before, make it active
            if (!wasActive) {
                this.classList.add('active');
                
                // Scroll component into view if needed
                const rect = this.getBoundingClientRect();
                if (rect.bottom > window.innerHeight || rect.top < 0) {
                    this.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
    });
    
    // Documentation page table of contents highlighting
    const docSections = document.querySelectorAll('.doc-content h2, .doc-content h3');
    const docNavLinks = document.querySelectorAll('.doc-nav a');
    
    function highlightTableOfContents() {
        if (docSections.length === 0) return;
        
        let currentSection = '';
        
        docSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < 100) {
                currentSection = section.textContent.trim();
            }
        });
        
        docNavLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            
            if (link.textContent.trim() === currentSection) {
                link.parentElement.classList.add('active');
            }
        });
    }
    
    // Check table of contents highlighting on scroll
    if (docSections.length > 0) {
        window.addEventListener('scroll', highlightTableOfContents);
        highlightTableOfContents(); // Initial check
    }
    
    // Add cyberpunk glitch effect to headings
    const headings = document.querySelectorAll('h1, h2');
    
    headings.forEach(heading => {
        heading.addEventListener('mouseenter', function() {
            this.classList.add('glitch');
        });
        
        heading.addEventListener('mouseleave', function() {
            this.classList.remove('glitch');
        });
    });
    
    // Theme toggle (cyberpunk vs. neon)
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('neon-theme');
            
            // Save preference to localStorage
            if (document.body.classList.contains('neon-theme')) {
                localStorage.setItem('theme', 'neon');
                this.textContent = 'Switch to Cyberpunk';
            } else {
                localStorage.setItem('theme', 'cyberpunk');
                this.textContent = 'Switch to Neon';
            }
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'neon') {
            document.body.classList.add('neon-theme');
            themeToggle.textContent = 'Switch to Cyberpunk';
        }
    }
    
    // Add interactive district map if present
    const districtMap = document.querySelector('.district-map');
    
    if (districtMap) {
        const districts = districtMap.querySelectorAll('.district');
        const districtInfo = document.querySelector('.district-info');
        
        districts.forEach(district => {
            district.addEventListener('mouseenter', function() {
                const districtId = this.getAttribute('data-district');
                const districtName = this.getAttribute('data-name');
                const districtDesc = this.getAttribute('data-description');
                const controlledBy = this.getAttribute('data-faction');
                
                // Update info panel
                districtInfo.innerHTML = `
                    <h3>${districtName}</h3>
                    <p>${districtDesc}</p>
                    <p class="faction-control">Controlled by: <span class="faction-${controlledBy}">${controlledBy}</span></p>
                `;
                
                districtInfo.style.display = 'block';
                
                // Highlight district
                districts.forEach(d => d.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
});

// Add preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Add dynamic background particles
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = Math.min(100, window.innerWidth / 20); // Responsive particle count
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 200 + 50)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.5 + 0.2})`,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5
        });
    }
    
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Draw connections
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(123, 44, 191, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
    }
    
    animate();
    
    // Resize canvas when window size changes
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize particles if canvas exists
document.addEventListener('DOMContentLoaded', initParticles);
