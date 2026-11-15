(() => {
  const pageUrl = new URL(window.location.href);
  const petId = pageUrl.searchParams.get("petId") || pageUrl.searchParams.get("i") || "";
  const token = pageUrl.searchParams.get("token") || pageUrl.searchParams.get("t") || "";
  const openButton = document.getElementById("open-pawtails-invite");
  const alternateLink = document.getElementById("alternate-pawtails-invite");
  const fallback = document.getElementById("invite-fallback");

  if (!openButton || !token) {
    if (openButton) openButton.textContent = "Open PawTails";
    if (fallback) fallback.textContent = "This invite link is missing its token. Ask the household owner to send a fresh invite.";
    return;
  }

  const makeDeepLink = (scheme) => {
    const deepLink = new URL(petId ? `${scheme}://join` : `${scheme}://j`);
    if (petId) deepLink.searchParams.set("petId", petId);
    deepLink.searchParams.set("t", token);
    return deepLink.toString();
  };
  const primaryDeepLink = makeDeepLink("pawtails");
  const fallbackDeepLink = makeDeepLink("petcare");
  openButton.href = primaryDeepLink;
  openButton.textContent = "Open PawTails";
  openButton.setAttribute("aria-label", "Open PawTails invite in the app");
  openButton.addEventListener("click", () => {
    if (fallback) fallback.textContent = "Opening PawTails...";
    window.setTimeout(() => {
      if (document.visibilityState === "visible" && fallback) {
        fallback.textContent = "Still here? Try the alternate app link or paste this page link in PawTails from Household -> Join.";
      }
    }, 1100);
  });
  if (alternateLink) {
    alternateLink.href = fallbackDeepLink;
    alternateLink.hidden = false;
  }
})();
