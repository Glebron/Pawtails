const currentPath = window.location.pathname.replace(/\/$/, "") || "/";

for (const link of document.querySelectorAll(".nav-link")) {
  const href = link.getAttribute("href");
  if (!href) continue;
  if ((href === "/" && currentPath === "/") || (href !== "/" && currentPath === href)) {
    link.classList.add("active");
  }
}

if ("IntersectionObserver" in window) {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries, o) => {
      entries.forEach((entry, idx) => {
        if (!entry.isIntersecting) return;
        const delay = Math.min(idx * 80, 260);
        entry.target.style.animationDelay = `${delay}ms`;
        entry.target.classList.add("visible");
        o.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  document.querySelectorAll(".reveal").forEach((item) => item.classList.add("visible"));
}
