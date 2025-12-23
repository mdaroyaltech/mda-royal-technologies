const form = document.getElementById("contactForm");
const popup = document.getElementById("successPopup");
const serviceSelect = document.getElementById("service");
const subjectField = document.getElementById("emailSubject");

function selectService(serviceName) {
  const serviceDropdown = document.getElementById("service");
  serviceDropdown.value = "Custom IT Solution";
  document.getElementById("emailSubject").value =
    "Dubai Enquiry – " + serviceName;

  document.getElementById("contact").scrollIntoView({
    behavior: "smooth"
  });
}

/* Update subject based on service */
serviceSelect.addEventListener("change", function () {
  if (this.value !== "") {
    subjectField.value = "Website Enquiry – " + this.value;
  }
});

form.addEventListener("submit", async function (e) {
  e.preventDefault(); // ✅ FIRST

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
      gtag('event', 'generate_lead', {
        event_category: 'Lead',
        event_label: 'Contact Form',
      });

      const name = formData.get("name");

      popup.innerHTML = `
        <strong>Dear ${name},</strong><br>
        Your enquiry has been sent successfully.<br>
        Our team will contact you shortly.
      `;

      submitBtn.disabled = false;
      submitBtn.innerText = "Send Enquiry";

      /* 📲 WhatsApp Alert (AFTER SUCCESS) */
      const nameWA = formData.get("name");
      const serviceWA = formData.get("service");
      const messageWA = formData.get("message");

      const whatsappText = `New Enquiry Received 🚀

    Name: ${nameWA}
    Service: ${serviceWA}
    Message: ${messageWA}

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

    /* ===== FINAL PROTECTION (STABLE) ===== */

    /* Disable right click */
    document.addEventListener("contextmenu", function(e) {
      e.preventDefault();
      return false;
    });

    /* Disable inspect keyboard shortcuts */
    document.addEventListener("keydown", function(e) {

      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      if (e.ctrlKey && e.shiftKey && 
        (e.key === "I" || e.key === "J" || e.key === "C")) {
        e.preventDefault();
        return false;
      }

      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        return false;
      }

    });

    /* WhatsApp Click Tracking */
    function trackWhatsApp() {
      if (typeof gtag === "function") {
        gtag('event', 'whatsapp_click', {
          event_category: 'Engagement',
          event_label: 'WhatsApp Contact'
        });
      }
    }

    /* ===== GOOGLE REVIEW COUNTER ANIMATION ===== */

function animateRating(id, target) {
  const el = document.getElementById(id);
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
  let current = 0;
  const interval = setInterval(() => {
    current++;
    el.innerText = current;
    if (current >= target) clearInterval(interval);
  }, 30);
}

window.addEventListener("load", () => {
  animateRating("ratingValue", 5.0);   // ⭐ Rating
  animateReviews("reviewCount", 25);   // 🔥 Change count here
});

/* ===== FAQ ACCORDION TOGGLE ===== */
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.parentElement;

    // close others
    document.querySelectorAll(".faq-item").forEach(faq => {
      if (faq !== item) faq.classList.remove("active");
    });

    // toggle current
    item.classList.toggle("active");
  });
});
