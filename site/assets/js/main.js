document.documentElement.classList.add("js");

const currentPath = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("[data-nav-link]").forEach((link) => {
  const linkPath = new URL(link.href, window.location.href).pathname.split("/").pop();

  if (linkPath === currentPath) {
    link.setAttribute("aria-current", "page");
  }
});

