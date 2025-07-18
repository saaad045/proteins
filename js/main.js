// ============================
// AOS Animation Initialization
// ============================
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
}

// ============================
// Preloader Handling
// ============================
window.addEventListener('load', function () {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ============================
// Navbar Scroll Effect
// ============================
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// ============================
// Showcase Product Card Rotation
// ============================
document.addEventListener('DOMContentLoaded', function () {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('click', function () {
            if (this.classList.contains('active') || this.dataset.position === 'center') return;
            rotateShowcase(this.dataset.position);
        });
    });

    function rotateShowcase(clickedPosition) {
        const cards = Array.from(document.querySelectorAll('.product-card'));
        const positions = {};

        cards.forEach(card => {
            positions[card.dataset.position] = card;
        });

        if (clickedPosition === 'left') {
            positions.left.dataset.position = 'center';
            positions.center.dataset.position = 'right';
            positions.right.dataset.position = 'left';
        } else if (clickedPosition === 'right') {
            positions.right.dataset.position = 'center';
            positions.center.dataset.position = 'left';
            positions.left.dataset.position = 'right';
        }

        cards.forEach(card => {
            card.classList.remove('active');

            const info = card.querySelector('.product-info');
            const image = card.querySelector('.product-image');

            if (info) info.classList.add('hidden');
            if (image) image.classList.add('blurred');

            if (card.dataset.position === 'center') {
                card.classList.add('active');
                if (info) info.classList.remove('hidden');
                if (image) image.classList.remove('blurred');
            }
        });

        const showcase = document.querySelector('.product-showcase');
        if (showcase) {
            const reordered = ['left', 'center', 'right'].map(pos => document.querySelector(`[data-position="${pos}"]`));
            showcase.innerHTML = '';
            reordered.forEach(card => {
                if (card) showcase.appendChild(card);
            });
        }
    }
});

// ============================
// Mobile Sidebar Navigation
// ============================
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('mobileSidebar');
    const openBtn = document.getElementById('mobileMenuButton');
    const closeBtn = document.getElementById('closeSidebar');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('.sidebar .nav-link');

    function openMobileMenu() {
        if (sidebar && overlay) {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.classList.add('no-scroll');
        }
    }

    function closeMobileMenu() {
        if (sidebar && overlay) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }

    if (openBtn) openBtn.addEventListener('click', openMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
    if (overlay) overlay.addEventListener('click', closeMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});

//POPUP HANDLNG/////
document.getElementById('emailForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('userEmail').value;
    // Here you would typically send the email to your backend
    console.log('Email submitted:', email);
    alert('Check your email for a magic link!');
    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('emailModal'));
    modal.hide();
  });