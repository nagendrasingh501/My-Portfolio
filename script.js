const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");
const theme = document.querySelector("#theme");
const topBtn = document.querySelector("#top");

if (menu && nav) {
  menu.onclick = () => nav.classList.toggle("open");
  document.querySelectorAll("nav a").forEach(a => {
    a.onclick = () => nav.classList.remove("open");
  });
}

/* Theme toggle */
function applyTheme(isLight) {
  document.body.classList.toggle("light", isLight);
  if (theme) {
    theme.textContent = isLight ? "☾" : "☀";
    theme.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    theme.setAttribute("title", isLight ? "Switch to dark mode" : "Switch to light mode");
  }
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "light");

if (theme) {
  theme.addEventListener("click", () => {
    const isLight = !document.body.classList.contains("light");
    applyTheme(isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const obs = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add("visible");
    obs.unobserve(entry.target);
  }
}), {threshold:.1});

document.querySelectorAll(".reveal").forEach(x => obs.observe(x));

window.addEventListener("scroll", () => {
  if (topBtn) topBtn.classList.toggle("show", scrollY > 500);
}, {passive:true});

if (topBtn) topBtn.onclick = () => scrollTo({top:0, behavior:"smooth"});

const modal = document.querySelector("#modal");
const modalImg = document.querySelector("#modalImg");
const modalTitle = document.querySelector("#modalTitle");

document.querySelectorAll(".cert-card").forEach(card => {
  const button = card.querySelector(".view-btn");
  if (button) {
    button.onclick = () => {
      modalImg.src = card.dataset.img;
      modalImg.alt = card.dataset.title;
      modalTitle.textContent = card.dataset.title;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    };
  }
});

function closeModal() {
  if (!modal) return;
  modal.classList.remove("open");
  document.body.style.overflow = "";
  if (modalImg) modalImg.src = "";
}

const closeButton = document.querySelector("#close");
const backdrop = document.querySelector(".backdrop");
if (closeButton) closeButton.onclick = closeModal;
if (backdrop) backdrop.onclick = closeModal;
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

/* Ultra-modern theme interactions */
const cursorGlow = document.querySelector(".cursor-glow");
const progressLine = document.querySelector(".progress-line");
if (cursorGlow) {
  window.addEventListener("pointermove", e => {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
  }, {passive:true});
}
window.addEventListener("scroll", () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  if (progressLine) progressLine.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
}, {passive:true});
