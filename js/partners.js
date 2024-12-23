document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add fade-in class to the section itself
                entry.target.classList.add('fade-in');
                
                // Add fade-in class to child elements
                entry.target.querySelectorAll('.partner-logo, .shop-link').forEach(element => {
                    element.classList.add('fade-in');
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe partners section and its content
    const partnersSection = document.querySelector('.partners-section');
    const partnersContent = document.querySelector('.partners-content');
    const shopLinks = document.querySelector('.shop-links');

    if (partnersSection) observer.observe(partnersSection);
    if (partnersContent) observer.observe(partnersContent);
    if (shopLinks) observer.observe(shopLinks);
});