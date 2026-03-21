// ----------------- MENU DRAWER -----------------
const menuBtn = document.getElementById("menuBtn");
const drawer = document.getElementById("drawer");
const closeDrawer = document.getElementById("closeDrawer");
function openDrawer(){
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden","false");
}
function shutDrawer(){
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden","true");
}
menuBtn?.addEventListener("click", openDrawer);
closeDrawer?.addEventListener("click", shutDrawer);
drawer?.addEventListener("click", (e) => {
  if (e.target === drawer) shutDrawer();
});

// ----------------- SLIDER (with arrows + dots + swipe) -----------------
const track = document.getElementById("track");
const slides = Array.from(document.querySelectorAll(".slide"));
const dotsWrap = document.getElementById("dots");
const arrows = Array.from(document.querySelectorAll("[data-dir]"));
let index = 0;
function buildDots(){
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "dot" + (i === index ? " active" : "");
    b.type = "button";
    b.setAttribute("aria-label", `Go to slide ${i+1}`);
    b.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(b);
  });
}
function setDots(){
  dotsWrap.querySelectorAll(".dot").forEach((d,i) => {
    d.classList.toggle("active", i === index);
  });
}
function goTo(i){
  index = Math.max(0, Math.min(i, slides.length - 1));
  const offset = slides[index].offsetLeft;
  track.style.transform = `translateX(${-offset}px)`;
  setDots();
}
buildDots();
goTo(0);
arrows.forEach(btn => {
  const dir = Number(btn.getAttribute("data-dir"));
  btn.addEventListener("click", () => goTo(index + dir));
});

// Swipe / drag
let down = false;
let startX = 0;
let startTranslate = 0;
function getTranslateX(el){
  const t = getComputedStyle(el).transform;
  if (t === "none") return 0;
  const m = t.match(/matrix\((.+)\)/);
  if (!m) return 0;
  return parseFloat(m[1].split(",")[4]) || 0;
}
const slidesViewport = document.querySelector(".slides");
slidesViewport?.addEventListener("pointerdown", (e) => {
  down = true;
  slidesViewport.setPointerCapture(e.pointerId);
  startX = e.clientX;
  startTranslate = getTranslateX(track);
  track.style.transition = "none";
});
slidesViewport?.addEventListener("pointermove", (e) => {
  if (!down) return;
  const dx = e.clientX - startX;
  track.style.transform = `translateX(${startTranslate + dx}px)`;
});
slidesViewport?.addEventListener("pointerup", (e) => {
  if (!down) return;
  down = false;
  track.style.transition = "";
  const dx = e.clientX - startX;
  if (dx < -40) goTo(index + 1);
  else if (dx > 40) goTo(index - 1);
  else goTo(index);
});
