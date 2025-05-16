// Main JavaScript functions for MüllBlitz website

// Show the contact form when requested
function showForm() {
    document.getElementById("request-form").classList.remove("hidden");
    
    // Smooth scroll to the form
    document.getElementById("request-form").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

// Form submission handler
function absenden() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const feedback = document.getElementById("feedback");
    
    // Validate the form
    if (name === "" || phone === "") {
        feedback.textContent = "Bitte fülle alle Felder aus.";
        feedback.style.color = "red";
    } else {
        // Success message
        feedback.textContent = `Danke ${name}, wir melden uns bald!`;
        feedback.style.color = "green";
        
        // Clear form fields
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        
        // Hide the form after a delay
        setTimeout(() => {
            document.getElementById("request-form").classList.add("hidden");
        }, 3000);
    }
}

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Simple animation for benefit cards on scroll
    const benefitCards = document.querySelectorAll('.benefit-card');
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to add animation class when element is visible
    function checkVisibility() {
        benefitCards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('animate-fade-in');
            }
        });
        
        serviceCards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('animate-fade-in');
            }
        });
    }
    
    // Check visibility on scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Initial check
    checkVisibility();
    
    // Auto scroll testimonials
    const testimonialSlider = document.querySelector('.testimonial-slider');
    let scrollPosition = 0;
    const testimonialWidth = 330; // Width of testimonial + margin
    const totalTestimonials = document.querySelectorAll('.testimonial').length;
    
    // Auto scroll function for testimonials
    function autoScrollTestimonials() {
        scrollPosition += testimonialWidth;
        
        // Reset when reaching the end
        if (scrollPosition >= testimonialWidth * totalTestimonials) {
            scrollPosition = 0;
        }
        
        testimonialSlider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
    
    // Auto scroll every 5 seconds
    if (totalTestimonials > 1) {
        setInterval(autoScrollTestimonials, 5000);
    }
    
    // Shop form animation
    const shopForm = document.querySelector('.shop-form');
    if (shopForm) {
        shopForm.addEventListener('submit', function(e) {
            const formElements = this.elements;
            let isValid = true;
            
            // Basic validation
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && formElements[i].value.trim() === '') {
                    isValid = false;
                    formElements[i].classList.add('error');
                } else {
                    formElements[i].classList.remove('error');
                }
            }
            
            // If form is valid, add success animation
            if (isValid) {
                this.classList.add('success');
            } else {
                e.preventDefault();
            }
        });
    }
});