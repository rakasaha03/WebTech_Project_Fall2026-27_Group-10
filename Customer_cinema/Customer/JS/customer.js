
(() => {
  const get = id => document.getElementById(id);
  const message = (text, error=false) => {
    const el = get("message");
    if (!el) return;
    el.textContent = text;
    el.className = error ? "message error" : "message";
  };

  get("customerLoginForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const email = get("email").value.trim().toLowerCase();
    const password = get("password").value;
    if (email === "customer@cinebook.demo" && password === "Customer123") {
      window.location.href = "Movies.html";
    } else {
      message("Email or password is incorrect.", true);
    }
  });

  get("customerRegisterForm")?.addEventListener("submit", event => {
    event.preventDefault();
    if (get("password").value !== get("confirmPassword").value) {
      message("Passwords do not match.", true);
      return;
    }
    message("Registration form completed. You can now sign in using the demo customer account.");
    get("customerRegisterForm").reset();
  });

  get("bookingForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const quantity = Number(get("quantity").value);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      message("Please choose between 1 and 10 tickets.", true);
      return;
    }
    message("Booking details submitted successfully. This is a front-end demonstration; no ticket or payment has been saved.");
    get("bookingForm").reset();
  });
})();
