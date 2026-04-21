const path = window.location.pathname.replace(/\/$/, "") || "/";

for (const link of document.querySelectorAll(".nav-link")) {
  const href = link.getAttribute("href");
  if (!href) continue;
  if ((href === "/" && path === "/") || (href !== "/" && path === href)) {
    link.classList.add("active");
  }
}
