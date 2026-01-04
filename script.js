// JavaScript for Portfolio Website

// Page Transition Handler
document.addEventListener('DOMContentLoaded', () => {
    // Handle page transitions for external links
    const transitionLinks = document.querySelectorAll('a[href$=".html"]');

    transitionLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');

            // Add fade-out class
            document.body.classList.add('fade-out');

            // Navigate after animation completes
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in'); // Add fade-in class for CSS handling if added later
        observer.observe(section);
    });

    // --- Modal Logic for Certifications ---
    const modal = document.getElementById("cert-modal");
    const modalImg = document.getElementById("cert-image"); // Now targeting the img tag
    const closeBtn = document.querySelector(".close-modal");
    const viewButtons = document.querySelectorAll(".btn-view-cert");

    viewButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            const pdfSource = this.getAttribute("data-pdf");
            if (pdfSource) {
                modalImg.src = pdfSource;
                modal.classList.add('show');
                document.body.style.overflow = "hidden";
            }
        });
    });

    // Close Modal actions
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modalImg.src = "";
            }, 400);
            document.body.style.overflow = "auto";
        });
    }

    // Close on click outside content
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modalImg.src = "";
            }, 400);
            document.body.style.overflow = "auto";
        }
    });

    // --- Email Toggle Logic ---
    const emailBtn = document.getElementById("email-toggle-btn");
    if (emailBtn) {
        const span = emailBtn.querySelector('.btn-text');
        const originalText = "Email Me";
        const emailAddress = "shubhambalwan803@gmail.com";

        emailBtn.addEventListener("click", () => {
            // 1. Lock current width
            const startWidth = emailBtn.offsetWidth;
            emailBtn.style.width = startWidth + 'px';

            // 2. Change text
            const isExpanded = emailBtn.classList.contains("expanded");

            if (!isExpanded) {
                span.textContent = emailAddress;
                emailBtn.classList.add("expanded");
            } else {
                span.textContent = originalText;
                emailBtn.classList.remove("expanded");
            }

            // 3. Measure new width (temporarily unset width style to measure auto)
            emailBtn.style.width = 'auto';
            const endWidth = emailBtn.offsetWidth;

            // 4. Reset to start width to prepare for animation
            emailBtn.style.width = startWidth + 'px';

            // 5. Force Reflow
            emailBtn.offsetWidth;

            // 6. Animate to new width
            emailBtn.style.width = endWidth + 'px';

            // Optional: reset to auto after transition ends for responsiveness
            // But keeping fixed width prevents other layout jumps. 
            // We can leave it or clear it with a timeout matching CSS.
            setTimeout(() => {
                emailBtn.style.width = 'auto'; // release lock
            }, 350); // > 300ms transition
        });
    }

});
const certCards = document.querySelectorAll('.cert-card:not(.view-more-card)');
const maxVisible = 5;

certCards.forEach((card, index) => {
    if (index >= maxVisible) {
        card.style.display = 'none';
    }
});


const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});



