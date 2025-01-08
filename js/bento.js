// Function to detect if the screen width matches mobile breakpoint
const isMobile = window.matchMedia('(max-width: 1279px)').matches;

if (isMobile) {
    // Create an intersection observer only for mobile screens
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'visible' class when the product-group is in the viewport
                entry.target.classList.add('visible');
            } else {
                // Optionally, remove the 'visible' class when the product-group is out of view
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.5  // Trigger when 50% of the element is in the viewport
    });

    // Observe each product group
    const productGroups = document.querySelectorAll('.product-group');
    productGroups.forEach(group => {
        observer.observe(group);
    });
}
