document.documentElement.classList.add("js");

const currentPath = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("[data-nav-link]").forEach((link) => {
  const linkPath = new URL(link.href, window.location.href).pathname.split("/").pop();

  if (linkPath === currentPath) {
    link.setAttribute("aria-current", "page");
  }
});

const header = document.querySelector(".site-header");
const heroPhoto = document.querySelector(".hero .photo-placeholder, .hero .profile-photo");
let frameRequested = false;

const updateScrollEffects = () => {
  const scrollY = window.scrollY;

  header?.classList.toggle("is-scrolled", scrollY > 20);

  if (heroPhoto && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const shift = Math.min(scrollY * 0.055, 22);
    heroPhoto.style.setProperty("--photo-shift", `${shift}px`);
  }

  frameRequested = false;
};

window.addEventListener("scroll", () => {
  if (!frameRequested) {
    window.requestAnimationFrame(updateScrollEffects);
    frameRequested = true;
  }
}, { passive: true });

updateScrollEffects();

const revealTargets = document.querySelectorAll([
  ".hero-copy > *",
  ".hero-grid > .photo-placeholder",
  ".hero-grid > .profile-photo",
  ".page-hero .container > *",
  ".trust-item",
  ".section-heading > *",
  ".card",
  ".split > *",
  ".steps li",
  ".location-card",
  ".review-panel > *",
  ".service-detail",
  ".visit-timeline li",
  ".article-index a",
  ".article-aside > *",
  ".article-copy > h2",
  ".article-copy > .article-deck",
  ".cta-inner > *"
].join(","));

revealTargets.forEach((element, index) => {
  element.classList.add("reveal");
  element.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
});

const sections = document.querySelectorAll(".section");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  revealTargets.forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-in-view", entry.isIntersecting);
    });
  }, { rootMargin: "-15% 0px -15% 0px", threshold: 0.05 });

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
  sections.forEach((section) => section.classList.add("is-in-view"));
}

