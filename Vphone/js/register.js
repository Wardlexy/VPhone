document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirmPassword");
  const termsInput = document.getElementById("terms");

  // Load dari localStorage
  const saved = JSON.parse(localStorage.getItem("registerFormData") || "{}");
  if (saved) {
    nameInput.value = saved.name || "";
    emailInput.value = saved.email || "";
    passwordInput.value = saved.password || "";
    confirmInput.value = saved.confirmPassword || "";
    termsInput.checked = saved.terms || false;

    if (saved.gender) {
      const genderRadio = document.querySelector(
        `input[name="gender"][value="${saved.gender}"]`
      );
      if (genderRadio) genderRadio.checked = true;
    }
  }

  // Simpan setiap input
  form.addEventListener("input", () => {
    const gender =
      document.querySelector('input[name="gender"]:checked')?.value || "";
    const formData = {
      name: nameInput.value.trim(),
      gender: gender,
      email: emailInput.value.trim(),
      password: passwordInput.value,
      confirmPassword: confirmInput.value,
      terms: termsInput.checked,
    };
    localStorage.setItem("registerFormData", JSON.stringify(formData));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const gender = document.querySelector('input[name="gender"]:checked');
    const nameError = document.getElementById("nameError");
    const genderError = document.getElementById("genderError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmError = document.getElementById("confirmError");
    const termsError = document.getElementById("termsError");

    // Clear pesan error
    [
      nameError,
      genderError,
      emailError,
      passwordError,
      confirmError,
      termsError,
    ].forEach((el) => (el.textContent = ""));

    let isValid = true;

    // Validasi manual
    if (nameInput.value.trim().length < 5) {
      nameError.textContent = "Full name must be at least 5 characters.";
      isValid = false;
    }

    if (!gender) {
      genderError.textContent = "Please select your gender.";
      isValid = false;
    }

    const emailVal = emailInput.value.trim();
    if (
      emailVal.length < 5 ||
      !emailVal.includes("@") ||
      !emailVal.includes(".")
    ) {
      emailError.textContent = "Please enter a valid email.";
      isValid = false;
    }

    if (passwordInput.value.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (confirmInput.value !== passwordInput.value) {
      confirmError.textContent = "Passwords do not match.";
      isValid = false;
    }

    if (!termsInput.checked) {
      termsError.textContent = "You must agree to the terms.";
      isValid = false;
    }

    if (isValid) {
      alert("Registration successful!");
      localStorage.removeItem("registerFormData");
      form.reset();
    }
  });
});
