const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");
const themeBtn = document.querySelector("#themeBtn");
const year = document.querySelector("#year");
const joinForm = document.querySelector(".join-form");
const body = document.body;

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!expanded));
    navMenu.classList.toggle("open");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

const savedTheme = localStorage.getItem("openkg-theme");

if (savedTheme === "dark" && body) {
  body.classList.add("dark");
  themeBtn.textContent = "☀️";
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const isDark = body.classList.contains("dark");
    if (isDark) {
      body.classList.remove("dark");
      localStorage.setItem("openkg-theme", "light");
      themeBtn.textContent = "🌙";
    } else {
      body.classList.add("dark");
      localStorage.setItem("openkg-theme", "dark");
      themeBtn.textContent = "☀️";
    }
  });
}

if (joinForm) {
  joinForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitBtn = joinForm.querySelector("button[type='submit']");
    if (submitBtn) {
      submitBtn.textContent = "已提交，感谢加入！";
      submitBtn.disabled = true;
    }
    joinForm.reset();
  });
}
