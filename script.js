const form = document.getElementById("contactForm");
const popup = document.getElementById("successPopup");
const serviceSelect = document.getElementById("service");
const subjectField = document.getElementById("emailSubject");

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
            `https://wa.me/918870379373?text=${encodeURIComponent(whatsappText)}`,
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
