document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.fixed-navbar');
    if (!navbar) return;

    const navLogo = document.querySelector('.nav-logo');
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

    });

});