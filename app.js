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
const MOBILE_NAV_BREAKPOINT = 1140;

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
