tailwind.config = {
    theme: {
      extend: {
        colors: { primary: "#3b82f6", secondary: "#10b981" },
        borderRadius: {
          none: "0px",
          sm: "4px",
          DEFAULT: "4px",
          md: "12px",
          lg: "16px",
          xl: "20px",
          "2xl": "24px",
          "3xl": "32px",
          full: "9999px",
          button: "8px",
        },
      },
    },
  };

/* Mobile Menu Toggle */
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => {
mobileMenu.classList.toggle('hidden');
menuToggle.querySelector('i').classList.toggle('ri-menu-line');
menuToggle.querySelector('i').classList.toggle('ri-close-line');
});
// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
const targetId = this.getAttribute('href');
const targetElement = document.querySelector(targetId);
if (targetElement) {
window.scrollTo({
top: targetElement.offsetTop - 80,
behavior: 'smooth'
});
// Close mobile menu if open
if (!mobileMenu.classList.contains('hidden')) {
mobileMenu.classList.add('hidden');
menuToggle.querySelector('i').classList.add('ri-menu-line');
menuToggle.querySelector('i').classList.remove('ri-close-line');
}
}
});
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
    } else {
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Project Filtering
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button styles
        filterButtons.forEach(btn => {
            btn.classList.remove('bg-primary', 'text-white');
            btn.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
        });
        button.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
        button.classList.add('bg-primary', 'text-white');

        const filter = button.getAttribute('data-filter');
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Project Modal
const projectModal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');
const viewProjectButtons = document.querySelectorAll('.view-project');

// Project data
const projectData = {
    1: {
        title: 'E-commerce Platform Redesign',
        client: 'StyleHub Fashion',
        year: '2024',
        description: 'A complete redesign of an e-commerce platform for a fashion retailer. The project involved extensive user research, wireframing, prototyping, and implementation. The main goals were to improve the shopping experience, streamline the checkout process, and increase conversion rates.',
        challenges: 'The existing platform had poor navigation, a confusing checkout process, and was not mobile-friendly. User testing revealed frustration with product filtering and search functionality.',
        solutions: 'Implemented a new information architecture, redesigned the product browsing experience with advanced filters, simplified the checkout process, and created a fully responsive design that works seamlessly across all devices.',
        results: 'After launching the redesigned platform, the client saw a 35% increase in conversion rate, 28% decrease in cart abandonment, and a 42% increase in mobile sales within the first three months.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Redux', 'Node.js', 'Express', 'MongoDB']
    },
    // ... (Other project objects remain unchanged)
};

// Open modal with project details
viewProjectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const project = projectData[projectId];
        modalTitle.textContent = project.title;
        modalContent.innerHTML = generateProjectModalContent(project, button);
        
        // Show modal
        projectModal.classList.remove('opacity-0', 'invisible');
        document.body.style.overflow = 'hidden';
    });
});

// Generate modal content
function generateProjectModalContent(project, button) {
    return `
        <div class="space-y-6">
            <img src="${button.closest('.project-card').querySelector('img').src}" alt="${project.title}" class="w-full h-auto rounded-lg mb-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="p-4 bg-gray-50 rounded-lg">
                    <h4 class="text-sm font-semibold text-gray-700 mb-2">Client</h4>
                    <p class="text-gray-600">${project.client}</p>
                </div>
                <div class="p-4 bg-gray-50 rounded-lg">
                    <h4 class="text-sm font-semibold text-gray-700 mb-2">Year</h4>
                    <p class="text-gray-600">${project.year}</p>
                </div>
                <div class="p-4 bg-gray-50 rounded-lg">
                    <h4 class="text-sm font-semibold text-gray-700 mb-2">Category</h4>
                    <p class="text-gray-600">${button.closest('.project-card').querySelector('.flex.flex-wrap.gap-2').textContent.trim()}</p>
                </div>
            </div>
            <div>
                <h4 class="text-lg font-semibold text-gray-800 mb-3">Project Overview</h4>
                <p class="text-gray-600 mb-6">${project.description}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Challenges</h4>
                    <p class="text-gray-600">${project.challenges}</p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Solutions</h4>
                    <p class="text-gray-600">${project.solutions}</p>
                </div>
            </div>
            <div>
                <h4 class="text-lg font-semibold text-gray-800 mb-3">Results</h4>
                <p class="text-gray-600 mb-6">${project.results}</p>
            </div>
            <div>
                <h4 class="text-lg font-semibold text-gray-800 mb-3">Technologies Used</h4>
                <div class="flex flex-wrap gap-2">
                    ${project.technologies.map(tech => `<span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

// Close modal
closeModal.addEventListener('click', () => {
    projectModal.classList.add('opacity-0', 'invisible');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.add('opacity-0', 'invisible');
        document.body.style.overflow = 'auto';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // In a real application, you would send this data to a server
    // For this demo, we'll just show a success message
    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);

    // Reset form
    contactForm.reset();
});
