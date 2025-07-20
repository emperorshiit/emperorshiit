// Typing Animation
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Web Developer", "UI/UX Designer", "Graphic Artist", "Video Editor"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio JS running');

    // Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.querySelector('.modal-caption');
    const closeBtn = document.querySelector('.modal-close');

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });

    // Typing Animation
    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Portfolio Initialization
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    console.log('Portfolio grid element:', portfolioGrid);
    console.log('Filter buttons:', filterButtons);

    // Create portfolio items
    const portfolioData = [
        {
            title: 'Web Design',
            category: 'web',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1750162828/Sample_Web_tgd6ck.png'
        },
        {
            title: 'Make.com Sample Automation',
            category: 'web',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1752975583/Untitled_vnjtrg.png'
        },
        {
            title: 'N8N Sample Automation',
            category: 'web',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1752975583/1_cyubjs.png'
        },
        {
            title: 'Certificate: Introduction to C',
            category: 'certificate',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1750167087/Introduction_to_C_certificate_wzontv.jpg'
        },
        // Added Graphic Design samples
        {
            title: 'Graphic Design Sample 1',
            category: 'design',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1750167977/Sample2_gblaue.jpg'
        },
        {
            title: 'Graphic Design Sample 2',
            category: 'design',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1750167966/Sample1_y9kdmg.jpg'
        },
        // Added Email Template under design
        {
            title: 'Email Template',
            category: 'design',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1747938457/Black_and_Grey_Modern_Email_Newsletter_cpabmp.png'
        },
        // Added Graphic Design 3 and 4
        {
            title: 'Graphic Design 3',
            category: 'design',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1752976067/492528421_122238058250032347_235989953308545611_n_dimozb.jpg'
        },
        {
            title: 'Graphic Design 4',
            category: 'design',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1752976067/497401007_122238235664032347_5806304444681862374_n_r9fkc2.jpg'
        },
    ];

    if (portfolioGrid) {
        // Clear existing items
        portfolioGrid.innerHTML = '';

        // Add portfolio items
        portfolioData.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.classList.add('portfolio-item', item.category);
            portfolioItem.style.display = 'block';
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-info">
                    <h4>${item.title}</h4>
                    <p>${item.category}</p>
                </div>
            `;

            // Add click event to show modal
            portfolioItem.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImg.src = item.image;
                modalCaption.textContent = item.title;
                // Use setTimeout to ensure display: block is applied before adding show class
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
            });

            portfolioGrid.appendChild(portfolioItem);
            console.log('Added portfolio item:', item.title);
        });

        // Filter functionality
        function filterPortfolio(filterValue) {
            console.log('Filtering for:', filterValue);
            const items = document.querySelectorAll('.portfolio-item');
            console.log('Found items:', items.length);
            items.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // Add click handlers to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log('Filter button clicked:', button.getAttribute('data-filter'));
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterPortfolio(button.getAttribute('data-filter'));
            });
        });

        // Show all items initially
        filterPortfolio('all');
        console.log('Initial filtering complete');
    }

    // Scroll Animation
    const observerOptions = {
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-top';
    document.body.appendChild(scrollButton);
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 