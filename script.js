const element = document.getElementById("typewriter");
const text = element.dataset.text;
const speed = 100;

let index = 0;
element.textContent = "";

function type() {
  if (index < text.length) {
    element.textContent += text.charAt(index);
    index++;
    setTimeout(type, speed);
  }
}

document.addEventListener("DOMContentLoaded", type);

// Web3 Forms - Contact Form Handler
const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Hide any previous messages
  successMessage.style.display = "none";
  errorMessage.style.display = "none";

  const formData = new FormData(contactForm);
  const submitButton = contactForm.querySelector("button[type='submit']");
  const originalButtonText = submitButton.textContent;

  try {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      successMessage.style.display = "block";
      contactForm.reset();
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 5000);
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    console.error("Error:", error);
    errorMessage.style.display = "block";
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;

    // Hide error message after 5 seconds
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 5000);
  }
});
