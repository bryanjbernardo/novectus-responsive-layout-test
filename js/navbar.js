document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.fixed-navbar');
    if (!navbar) return;

    const navLogo = document.querySelector('.nav-logo');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const scrollThreshold = 50;
    const isAboutPage = window.location.pathname.includes('about.html');
    const isIndexPage = window.location.pathname === '/' || window.location.pathname.includes('index.html');
    let lastScroll = 0;
    let ticking = false;

    function updateNavbar() {
        const currentScroll = window.pageYOffset;
        const shouldScroll = !isIndexPage || currentScroll > scrollThreshold;

        navbar.classList.toggle('scrolled', shouldScroll);
        navLogo?.classList.toggle('shrink', shouldScroll);

        if (isIndexPage && !isAboutPage) {
            navbar.style.transform = currentScroll > lastScroll && currentScroll > scrollThreshold
                ? 'translateY(-100%)'
                : 'translateY(0)';
            }

            // Collapse hamburger menu and nav-links on scroll
            if (hamburger?.classList.contains('active') && navLinks?.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
    
            lastScroll = currentScroll;
    }

    // Initial check
    updateNavbar();

    // Throttle scroll updates
    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Hamburger menu toggle logic
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Handle submenu toggling inside the sidebar
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Dropdown functionality
    const navbars = document.querySelectorAll('.fixed-navbar, .secondary-navbar');

    navbars.forEach(navbar => {
        const dropdowns = navbar.querySelectorAll('.nav-links li, .secondary-nav-links li');

        dropdowns.forEach(dropdown => {
            const submenu = dropdown.querySelector('ul');
            let hideTimeout;
            if (submenu) {
                dropdown.addEventListener('mouseenter', function() {
                    clearTimeout(hideTimeout);
                    submenu.style.display = 'block';
                    submenu.style.pointerEvents = 'auto';
                    setTimeout(() => {
                        submenu.style.opacity = '1';
                        submenu.style.transform = 'translateY(0)';
                    }, 10);
                });

                dropdown.addEventListener('mouseleave', function() {
                    hideTimeout = setTimeout(() => {
                        submenu.style.opacity = '0';
                        submenu.style.transform = 'translateY(-10px)';
                        submenu.style.pointerEvents = 'none';
                        setTimeout(() => {
                            if (!dropdown.matches(':hover')) {
                                submenu.style.display = 'none';
                            }
                        }, 300);
                    }, 200); // Adjust this value to change how long the dropdown stays visible
                });
            }
        });

     // Handle click behavior for mobile devices
    const arrows = document.querySelectorAll('.products-nav .arrow');

    arrows.forEach(arrow => {
        const submenu = arrow.closest('li').querySelector('ul');
        let isSubmenuVisible = false;

        if (submenu) {
            arrow.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default action of the anchor (if any)

                // Toggle submenu visibility
                if (isSubmenuVisible) {
                    submenu.style.opacity = '0';
                    submenu.style.transform = 'translateY(-10px)';
                    submenu.style.pointerEvents = 'none';
                    setTimeout(() => {
                        submenu.style.display = 'none';
                    }, 300);
                } else {
                    submenu.style.display = 'block';
                    submenu.style.pointerEvents = 'auto';
                    setTimeout(() => {
                        submenu.style.opacity = '1';
                        submenu.style.transform = 'translateY(0)';
                    }, 10);
                }

                // Toggle the state for next click
                isSubmenuVisible = !isSubmenuVisible;
            });
        }
    });

    });

});

