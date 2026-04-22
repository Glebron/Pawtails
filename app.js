const path = window.location.pathname.replace(/\/$/, "") || "/";

for (const link of document.querySelectorAll(".nav-link")) {
  const href = link.getAttribute("href");
  if (!href) continue;
  if ((href === "/" && path === "/") || (href !== "/" && path === href)) {
    link.classList.add("active");
  }
}

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".top-nav");
const MOBILE_NAV_BREAKPOINT = 1140;

if (menuButton && menu) {
  const closeMenu = () => {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_NAV_BREAKPOINT) closeMenu();
  });
}
