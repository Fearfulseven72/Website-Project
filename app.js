const portalLink = document.querySelector(".portal-link");
const ring = document.querySelector(".ring");
portalLink.addEventListener("click", (e) => {
  e.preventDefault(); // stop instant navigation
  // prevent double-click spam
  if (ring.classList.contains("opening")) return;
  ring.classList.add("opening");
  // match this to your CSS animation duration
  setTimeout(() => {
    window.location.href = portalLink.href; // go to dashboard
  }, 900);
});
document.body.classList.add("portal-flash");
