const normalizePath = (pathname) => {
  if (!pathname) return "/";
  let normalized = pathname.replace(/\/+$/, "");
  if (normalized === "") return "/";
  normalized = normalized.replace(/\/index\.html$/i, "/");
  normalized = normalized.replace(/\.html$/i, "");
  return normalized === "" ? "/" : normalized;
};

const currentPath = normalizePath(window.location.pathname);

for (const link of document.querySelectorAll(".nav-link")) {
  const href = link.getAttribute("href");
  if (!href) continue;
  const linkPath = normalizePath(new URL(href, window.location.href).pathname);
  if (linkPath === currentPath) {
    link.classList.add("active");
  }
}

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".top-nav");
const MOBILE_NAV_BREAKPOINT = 900;

if (menuButton && menu) {
  const setMenuState = (isOpen) => {
    menu.classList.toggle("is-open", isOpen);
    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  };

  const closeMenu = () => setMenuState(false);

  menuButton.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("is-open");
    setMenuState(isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!menu.classList.contains("is-open")) return;
    if (menuButton.contains(event.target) || menu.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_NAV_BREAKPOINT) closeMenu();
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

for (const stage of document.querySelectorAll("[data-tilt-stage]")) {
  stage.addEventListener("pointermove", (event) => {
    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stage.style.setProperty("--tilt-y", `${x * 4}deg`);
    stage.style.setProperty("--tilt-x", `${y * -4}deg`);
  });

  stage.addEventListener("pointerleave", () => {
    stage.style.setProperty("--tilt-y", "0deg");
    stage.style.setProperty("--tilt-x", "0deg");
  });
}
