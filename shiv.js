// ===== Slider Drag Scroll =====
let slider = document.querySelector(".slider-container");
let sliderInner = document.querySelector(".slider");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});

// ===== Auto-scroll for slider (desktop & mobile) =====
document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".slider-container");

  let scrollAmount = 0;
  let scrollStep = 1;
  let maxScroll = sliderContainer.scrollWidth - sliderContainer.clientWidth;

  function autoScroll() {
    scrollAmount += scrollStep;
    if (scrollAmount >= maxScroll) {
      scrollAmount = 0;
    }
    sliderContainer.scrollTo({
      left: scrollAmount,
      behavior: "smooth"
    });
  }

  setInterval(autoScroll, 50);
});

// ===== Update Dots Based on Scroll Position =====
const dots = document.querySelectorAll(".slider-dots .dot");
function updateDots() {
  let scrollPos = slider.scrollLeft;
  let itemWidth = sliderInner.querySelector("span").offsetWidth + 20;
  let index = Math.round(scrollPos / itemWidth);
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

// ===== Dots Click Scroll =====
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    let itemWidth = sliderInner.querySelector("span").offsetWidth + 20;
    slider.scrollTo({
      left: i * itemWidth,
      behavior: "smooth"
    });
  });
});

// ===== Arrow Scroll =====
document.querySelector(".slider-arrow.left").addEventListener("click", () => {
  slider.scrollBy({ left: -300, behavior: "smooth" });
});
document.querySelector(".slider-arrow.right").addEventListener("click", () => {
  slider.scrollBy({ left: 300, behavior: "smooth" });
});

// ===== DOM Ready All Features =====
document.addEventListener("DOMContentLoaded", () => {
  // ===== Mobile Menu Toggle =====
  const nav = document.querySelector("nav ul");
  const navToggle = document.querySelector(".mobile-menu-toggle");
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });

  // ===== Formspree Form Submission Alert =====
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            alert("✅ Thank you! Your message has been sent successfully.");
            form.reset();
          } else {
            alert("❌ Oops! Something went wrong. Please try again.");
          }
        })
        .catch(error => {
          console.error("Form error:", error);
          alert("⚠️ Failed to send message. Please check your connection.");
        });
    });
  }

  // ===== Scroll-to-Top Button Logic =====
  const scrollBtn = document.getElementById("scrollToTopBtn");
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) scrollBtn.style.display = 'block';
    else scrollBtn.style.display = 'none';
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
// Reveal sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
});
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));