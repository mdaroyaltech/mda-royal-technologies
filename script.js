const form = document.getElementById("contactForm");
  const popup = document.getElementById("successPopup");
  const serviceSelect = document.getElementById("service");
  const subjectField = document.getElementById("emailSubject");

  serviceSelect.addEventListener("change", function () {
    if (this.value !== "") {
      subjectField.value = "Website Enquiry – " + this.value;
    }
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    popup.style.display = "block";
    popup.innerText = "Sending your enquiry...";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const name = formData.get("name");
        popup.innerHTML = `
          <strong>Dear ${name},</strong><br>
          Your enquiry has been sent successfully.<br>
          Our team will contact you shortly.
        `;
        setTimeout(() => {
          popup.style.display = "none";
        }, 5000);
        form.reset();
      } else {
        popup.innerText = "Something went wrong. Please try again.";
      }
    } catch (err) {
      popup.innerText = "Network error. Please try again later.";
    }
  });

  /* ===== LEVEL 2 PROTECTION ===== */

/* Disable text selection & copy */
document.addEventListener("selectstart", e => e.preventDefault());
document.addEventListener("copy", e => e.preventDefault());
document.addEventListener("cut", e => e.preventDefault());
document.addEventListener("dragstart", e => e.preventDefault());

/* Console warning + clear */
setInterval(() => {
  console.clear();
  console.log(
    "%cSTOP!",
    "color:red;font-size:40px;font-weight:bold;"
  );
  console.log(
    "%cThis website is protected by MDA Royal Technologies.",
    "color:#00c2ff;font-size:16px;"
  );
}, 1500);

/* Blur page when DevTools detected */
const blurStyle = document.createElement("style");
blurStyle.innerHTML = `
  body.devtools-open * {
    filter: blur(6px) !important;
    pointer-events: none !important;
    user-select: none !important;
  }
  #devtools-warning {
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.85);
    color:#fff;
    display:flex;
    align-items:center;
    justify-content:center;
    text-align:center;
    font-size:22px;
    z-index:99999;
  }
`;
document.head.appendChild(blurStyle);

/* Detect DevTools (stronger method) */
let warned = false;
setInterval(() => {
  const widthDiff = window.outerWidth - window.innerWidth;
  const heightDiff = window.outerHeight - window.innerHeight;

  if (widthDiff > 160 || heightDiff > 160) {
    document.body.classList.add("devtools-open");

    if (!warned) {
      warned = true;
      const warning = document.createElement("div");
      warning.id = "devtools-warning";
      warning.innerHTML = `
        ⚠️ Developer Tools Detected<br><br>
        This website is protected.<br>
        Unauthorized inspection is not allowed.
      `;
      document.body.appendChild(warning);
    }
  } else {
    document.body.classList.remove("devtools-open");
    const warnBox = document.getElementById("devtools-warning");
    if (warnBox) warnBox.remove();
    warned = false;
  }

}, 500);

/* ===== LEVEL 3 ULTRA PROTECTION ===== */

/* Block right click completely */
document.addEventListener("contextmenu", e => e.preventDefault());

/* Block key shortcuts */
document.addEventListener("keydown", function(e) {

  // F12
  if (e.keyCode === 123) {
    e.preventDefault();
    location.reload();
  }

  // Ctrl+Shift+I / J / C
  if (e.ctrlKey && e.shiftKey && [73,74,67].includes(e.keyCode)) {
    e.preventDefault();
    location.reload();
  }

  // Ctrl+U / Ctrl+S / Ctrl+P
  if (e.ctrlKey && [85,83,80].includes(e.keyCode)) {
    e.preventDefault();
    location.reload();
  }
});

/* Infinite debugger trap */
(function debugTrap(){
  try {
    (function(){
      debugger;
      debugTrap();
    })();
  } catch(e){}
})();

/* Detect devtools via function toString */
let devtoolsDetected = false;
setInterval(() => {
  const check = /./;
  check.toString = function() {
    devtoolsDetected = true;
  };
  console.log(check);
  if (devtoolsDetected) {
    document.body.innerHTML = `
      <div style="
        background:#000;
        color:#fff;
        height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        text-align:center;
        font-size:24px;
      ">
        ⚠️ Access Blocked<br><br>
        Developer Tools Detected
      </div>`;
  }
}, 1000);

/* Detect devtools resize (dock / undock) */
setInterval(() => {
  const widthDiff = window.outerWidth - window.innerWidth;
  const heightDiff = window.outerHeight - window.innerHeight;

  if (widthDiff > 160 || heightDiff > 160) {
    location.reload();
  }
}, 500);

/* Disable text selection + copy */
["copy","cut","paste","selectstart","dragstart"].forEach(evt => {
  document.addEventListener(evt, e => e.preventDefault());
});

/* Protect source tampering */
let htmlSnapshot = document.documentElement.innerHTML;
setInterval(() => {
  if (document.documentElement.innerHTML !== htmlSnapshot) {
    location.reload();
  }
}, 2000);
