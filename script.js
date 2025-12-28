/* ===============================
   DOM READY
================================ */
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contactForm");
  const popup = document.getElementById("successPopup");
  const serviceSelect = document.getElementById("service");
  const subjectField = document.getElementById("emailSubject");

  /* ===== SERVICE CHANGE → SUBJECT UPDATE ===== */
  if (serviceSelect && subjectField) {
    serviceSelect.addEventListener("change", function () {
      if (this.value !== "") {
        subjectField.value = "Website Enquiry – " + this.value;
      }
    });
  }

  /* ===== FORM SUBMIT ===== */
  if (form && popup && subjectField) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (!subjectField.value) {
        subjectField.value = "Website Enquiry – General";
      }

      const formData = new FormData(form);

      popup.style.display = "block";
      popup.innerText = "Sending your enquiry...";

      const submitBtn = form.querySelector("button[type='submit']");
      submitBtn.disabled = true;
      submitBtn.innerText = "Sending...";

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        if (response.ok) {

          /* Google Analytics Lead Event */
          if (typeof gtag === "function") {
            gtag("event", "generate_lead", {
              event_category: "Lead",
              event_label: "Contact Form"
            });
          }

          const name = formData.get("name");

          popup.innerHTML = `
            <strong>Dear ${name},</strong><br>
            Your enquiry has been sent successfully.<br>
            Our team will contact you shortly.
          `;

          submitBtn.disabled = false;
          submitBtn.innerText = "Send Enquiry";

          /* WhatsApp Alert */
          const whatsappText = `New Enquiry Received 🚀
Name: ${name}
Service: ${formData.get("service")}
Message: ${formData.get("message")}

– MDA Royal Technologies`;

          window.open(
            `https://wa.me/918862077609?text=${encodeURIComponent(whatsappText)}`,
            "_blank"
          );

          setTimeout(() => {
            popup.style.display = "none";
          }, 5000);

          form.reset();

        } else {
          popup.innerText = "Something went wrong. Please try again.";
          submitBtn.disabled = false;
          submitBtn.innerText = "Send Enquiry";
        }

      } catch (err) {
        popup.innerText = "Network error. Please try again later.";
        submitBtn.disabled = false;
        submitBtn.innerText = "Send Enquiry";
      }
    });
  }

});


/* ===============================
   PRICING BUTTON SERVICE SELECT
================================ */
function selectService(serviceName) {
  const serviceDropdown = document.getElementById("service");
  const subjectField = document.getElementById("emailSubject");

  if (serviceDropdown && subjectField) {
    serviceDropdown.value = "Custom IT Solution";
    subjectField.value = "Dubai Enquiry – " + serviceName;
  }

  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }
}


/* ===============================
   DISABLE RIGHT CLICK
================================ */
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});


/* ===============================
   DISABLE INSPECT SHORTCUTS
================================ */
document.addEventListener("keydown", function (e) {

  if (e.key === "F12") {
    e.preventDefault();
  }

  if (e.ctrlKey && e.shiftKey &&
    (e.key === "I" || e.key === "J" || e.key === "C")) {
    e.preventDefault();
  }

  if (e.ctrlKey && e.key === "u") {
    e.preventDefault();
  }

});


/* ===============================
   WHATSAPP CLICK TRACKING
================================ */
function trackWhatsApp() {
  if (typeof gtag === "function") {
    gtag("event", "whatsapp_click", {
      event_category: "Engagement",
      event_label: "WhatsApp Contact"
    });
  }
}


/* ===============================
   GOOGLE REVIEW COUNTER ANIMATION
================================ */
function animateRating(id, target) {
  const el = document.getElementById(id);
  if (!el) return;

  let current = 0;
  const interval = setInterval(() => {
    current += 0.1;
    if (current >= target) {
      el.innerText = target.toFixed(1);
      clearInterval(interval);
    } else {
      el.innerText = current.toFixed(1);
    }
  }, 40);
}

function animateReviews(id, target) {
  const el = document.getElementById(id);
  if (!el) return;

  let current = 0;
  const interval = setInterval(() => {
    current++;
    el.innerText = current;
    if (current >= target) clearInterval(interval);
  }, 30);
}

window.addEventListener("load", () => {
  animateRating("ratingValue", 5.0);
  animateReviews("reviewCount", 25);
});


/* ===============================
   FAQ ACCORDION
================================ */
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.parentElement;

    document.querySelectorAll(".faq-item").forEach(faq => {
      if (faq !== item) faq.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});
