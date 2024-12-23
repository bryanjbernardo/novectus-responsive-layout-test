document.addEventListener('DOMContentLoaded', function() {
    const tracks = document.querySelectorAll('.testimonial-track');
    
    tracks.forEach(track => {
        // Get all original cards
        const originalCards = Array.from(track.children);
        
        // Clone each card twice to ensure smooth infinite scroll
        originalCards.forEach(card => {
            // First clone
            const clone1 = card.cloneNode(true);
            track.appendChild(clone1);
            
            // Second clone for extra smoothness
            const clone2 = card.cloneNode(true);
            track.appendChild(clone2);
        });

        // Function to reset animation
        function resetAnimation() {
            const firstCard = track.firstElementChild;
            const cardWidth = firstCard.offsetWidth;
            const gap = 20; // Match CSS gap value
            const totalWidth = (cardWidth + gap) * originalCards.length;
            
            if (track.closest('.row2')) {
                // For right-to-left scrolling row
                if (Math.abs(track.offsetLeft) >= totalWidth) {
                    track.style.transform = 'translateX(0)';
                    track.style.transition = 'none';
                    // Force reflow
                    void track.offsetWidth;
                    track.style.transition = '';
                }
            } else {
                // For left-to-right scrolling row
                if (Math.abs(track.offsetLeft) >= totalWidth) {
                    track.style.transform = 'translateX(0)';
                    track.style.transition = 'none';
                    // Force reflow
                    void track.offsetWidth;
                    track.style.transition = '';
                }
            }
        }

        // Check animation reset every frame
        function checkReset() {
            resetAnimation();
            requestAnimationFrame(checkReset);
        }

        checkReset();
    });
});