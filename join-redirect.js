const target = `/j${window.location.search || ""}`;
document.querySelector("a").href = target;
window.location.replace(target);
