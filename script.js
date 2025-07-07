//your JS code here. If required.
const form = document.querySelector("form");
const fontsizeInput = document.getElementById("fontsize");
const fontcolorInput = document.getElementById("fontcolor");

// Helper: Set a cookie
function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
}

// Helper: Get cookie by name
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, val] = cookie.split("=");
    if (key === name) return val;
  }
  return null;
}

// Apply styles from cookies (or defaults)
function applyPreferences() {
  const fontsize = getCookie("fontsize") || "16";
  const fontcolor = getCookie("fontcolor") || "#000000";

  // Set CSS variables
  document.documentElement.style.setProperty("--fontsize", `${fontsize}px`);
  document.documentElement.style.setProperty("--fontcolor", fontcolor);

  // Reflect in inputs
  fontsizeInput.value = fontsize;
  fontcolorInput.value = fontcolor;
}

// Save preferences on form submit
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload

  const fontSizeValue = fontsizeInput.value;
  const fontColorValue = fontcolorInput.value;

  // Save to cookies
  setCookie("fontsize", fontSizeValue);
  setCookie("fontcolor", fontColorValue);

  // Apply to page
  applyPreferences();
});

// On load
applyPreferences();
