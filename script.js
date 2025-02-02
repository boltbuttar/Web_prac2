let images = ["h6.jpg", "h7.jpg"];
let index = 0;

let bg1 = document.querySelector(".bg1");
let bg2 = document.querySelector(".bg2");
let isBg1Visible = true;

// Preload images before switching to avoid flickering
function preloadImages(images) {
    images.forEach((image) => {
        let img = new Image();
        img.src = image;
    });
}
preloadImages(images);

function changeBackground() {
    let nextImage = `url('${images[index]}')`;

    if (isBg1Visible) {
        bg2.style.backgroundImage = nextImage;
        bg2.style.opacity = "1";
        setTimeout(() => {
            bg1.style.opacity = "0"; // Fade out the first image
        }, 2000);
    } else {
        bg1.style.backgroundImage = nextImage;
        bg1.style.opacity = "1";
        setTimeout(() => {
            bg2.style.opacity = "0";
        }, 2000);
    }

    isBg1Visible = !isBg1Visible;
    index = (index + 1) % images.length;
}

setInterval(changeBackground, 5000); 
// HERO SECTION: Smooth Scroll to Contact Section
document.querySelector(".btn input").addEventListener("click", function () {
    document.querySelector(".contact").scrollIntoView({ behavior: "smooth" });
});

// STATISTICS SECTION: Animated Counter When Visible
function animateCounter(element, start, end, duration) {
    let startTime = null;

    function updateCounter(currentTime) {
        if (!startTime) startTime = currentTime;
        let progress = Math.min((currentTime - startTime) / duration, 1);
        element.innerText = Math.floor(progress * (end - start) + start);

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

// Trigger animation when section is in viewport
function triggerStatsAnimation() {
    const stats = document.querySelectorAll(".stat-number");
    const statsSection = document.querySelector(".Statistics");

    if (statsSection.getBoundingClientRect().top < window.innerHeight - 50) {
        stats.forEach(stat => {
            if (!stat.classList.contains("animated")) {
                animateCounter(stat, 0, parseInt(stat.dataset.target), 2000);
                stat.classList.add("animated");
            }
        });
        window.removeEventListener("scroll", triggerStatsAnimation);
    }
}

window.addEventListener("scroll", triggerStatsAnimation);

// FAQ SECTION: Expand/Collapse Effect with Smooth Transition
document.querySelectorAll(".FAQ-card h3").forEach(question => {
    question.addEventListener("click", function () {
        let answer = this.nextElementSibling;

        // Collapse all answers first
        document.querySelectorAll(".FAQ-card p").forEach(p => {
            if (p !== answer) {
                p.style.maxHeight = null;
                p.style.paddingTop = "0"; // Hide extra spacing
            }
        });

        // Toggle the clicked one
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            answer.style.paddingTop = "0"; 
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
            answer.style.paddingTop = "10px"; // Add spacing for a smoother transition
        }
    });
});


// CONTACT SECTION: Form Validation
document.querySelector("#contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.querySelector("#name");
    let email = document.querySelector("#email");
    let phone = document.querySelector("#phone");
    let message = document.querySelector("#message");
    let contactMethod = document.querySelector("input[name='contactMethod']:checked");
    let isValid = true;

    // Helper function to show/hide error messages
    function validateField(field, errorId, condition) {
        document.querySelector(errorId).style.display = condition ? "none" : "block";
        return condition;
    }

    isValid &= validateField(name, "#nameError", name.value.trim() !== "");
    isValid &= validateField(email, "#emailError", /\S+@\S+\.\S+/.test(email.value));
    isValid &= validateField(phone, "#phoneError", phone.value.trim() !== "");
    isValid &= validateField(message, "#messageError", message.value.trim() !== "");
    isValid &= validateField(contactMethod, "#contactMethodError", contactMethod !== null);

    if (isValid) {
        alert("Form submitted successfully!");
        this.reset();
    }
});
