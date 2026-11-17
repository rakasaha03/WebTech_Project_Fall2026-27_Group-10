
(() => {
  const byId = id => document.getElementById(id);
  const showMessage = (text, isError=false) => {
    const box = byId("message");
    if (!box) return;
    box.textContent = text;
    box.className = isError ? "message error" : "message";
  };

  byId("adminLoginForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const id = byId("adminId").value.trim();
    const password = byId("adminPassword").value;
    if (id === "ADM" && password === "admin123") {
     // window.location.href = "Dashboard.html";
      showMessage("LOGIN SUCCESSFULLY!!!!");
      byId("adminLoginForm").reset();
    } else {
      showMessage("Invalid Admin ID or password.", true);
    }
  });

  byId("adminRegisterForm")?.addEventListener("submit", event => {
    event.preventDefault();
    if (byId("password").value !== byId("confirmPassword").value) {
      showMessage("Passwords do not match.", true);
      return;
    }
    showMessage("Registration Successfully!! You can login now!!!.");
    byId("adminRegisterForm").reset();
  });
})();
