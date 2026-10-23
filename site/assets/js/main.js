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

const bookingPanel = document.querySelector("[data-booking-panel]");

if (bookingPanel) {
  const bookingTabs = [...bookingPanel.querySelectorAll("[data-location-tab]")];
  const calendarPanes = [...bookingPanel.querySelectorAll("[data-calendar-pane]")];
  const locationNumber = bookingPanel.querySelector("[data-location-number]");
  const locationName = bookingPanel.querySelector("[data-location-name]");
  const locationAddress = bookingPanel.querySelector("[data-location-address]");
  const locationCity = bookingPanel.querySelector("[data-location-city]");
  const locationPhoto = bookingPanel.querySelector("[data-location-photo]");
  const locationPhotoLabel = bookingPanel.querySelector("[data-location-photo-label]");

  const selectLocation = (tab) => {
    const controlledPaneId = tab.getAttribute("aria-controls");

    bookingTabs.forEach((item) => {
      const isSelected = item === tab;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-selected", String(isSelected));
      item.tabIndex = isSelected ? 0 : -1;
    });

    calendarPanes.forEach((pane) => {
      const isSelected = pane.id === controlledPaneId;
      pane.hidden = !isSelected;
      pane.classList.toggle("is-active", isSelected);
    });

    const name = tab.dataset.name;
    locationNumber.textContent = tab.dataset.number;
    locationName.textContent = name;
    locationAddress.textContent = tab.dataset.address;
    locationCity.textContent = tab.dataset.city;
    locationPhotoLabel.textContent = `Foto centro · ${name}`;
    locationPhoto.setAttribute("aria-label", `Placeholder fotografia di ${name}`);
  };

  bookingTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectLocation(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
        return;
      }

      event.preventDefault();
      let nextIndex = index;

      if (event.key === "ArrowLeft") nextIndex = (index - 1 + bookingTabs.length) % bookingTabs.length;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % bookingTabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = bookingTabs.length - 1;

      bookingTabs[nextIndex].focus();
      selectLocation(bookingTabs[nextIndex]);
    });
  });

  selectLocation(bookingTabs.find((tab) => tab.getAttribute("aria-selected") === "true") || bookingTabs[0]);
}

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
  ".booking-panel > *",
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

