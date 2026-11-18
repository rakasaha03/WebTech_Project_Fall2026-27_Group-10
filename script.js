const STORAGE_KEY = "cinemaEmployees";

let employees = loadEmployees();

const tableBody = document.getElementById("employeeTable");
const dialog = document.getElementById("employeeDialog");
const form = document.getElementById("employeeForm");

function loadEmployees() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    console.error("Could not read saved employees:", error);
    return [];
  }
}

function saveEmployees() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function updateSummary() {
  document.getElementById("totalEmployees").textContent = employees.length;
  document.getElementById("activeEmployees").textContent =
    employees.filter(employee => employee.status === "Active").length;
  document.getElementById("inactiveEmployees").textContent =
    employees.filter(employee => employee.status === "Inactive").length;
}

function renderEmployees() {
  const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
  const selectedStatus = document.getElementById("statusFilter").value;

  const filteredEmployees = employees.filter(employee => {
    const searchable = [
      employee.id, employee.name, employee.phone,
      employee.email, employee.position
    ].join(" ").toLowerCase();

    return searchable.includes(searchTerm) &&
      (selectedStatus === "all" || employee.status === selectedStatus);
  });

  if (filteredEmployees.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="7" class="empty">No matching employees found.</td></tr>';
    updateSummary();
    return;
  }

  tableBody.innerHTML = filteredEmployees.map(employee => `
    <tr>
      <td><div class="employee-name">${escapeHTML(employee.name)}</div>
          <div class="employee-email">${escapeHTML(employee.email)} · ${escapeHTML(employee.id)}</div></td>
      <td>${escapeHTML(employee.phone)}</td>
      <td>${escapeHTML(employee.position)}</td>
      <td>৳${Number(employee.salary).toLocaleString("en-BD")}</td>
      <td>${escapeHTML(employee.joiningDate)}</td>
      <td><span class="status ${escapeHTML(employee.status)}">${escapeHTML(employee.status)}</span></td>
      <td>
        <button class="action-btn" data-action="edit" data-id="${escapeHTML(employee.id)}">Edit</button>
        <button class="action-btn delete" data-action="delete" data-id="${escapeHTML(employee.id)}">Delete</button>
      </td>
    </tr>
  `).join("");

  updateSummary();
}

function openAddDialog() {
  form.reset();
  document.getElementById("employeeId").value = "";
  document.getElementById("dialogTitle").textContent = "Add Employee";
  document.getElementById("status").value = "Active";
  dialog.showModal();
}

function openEditDialog(id) {
  const employee = employees.find(item => item.id === id);
  if (!employee) return;

  document.getElementById("employeeId").value = employee.id;
  document.getElementById("name").value = employee.name;
  document.getElementById("phone").value = employee.phone;
  document.getElementById("email").value = employee.email;
  document.getElementById("position").value = employee.position;
  document.getElementById("salary").value = employee.salary;
  document.getElementById("joiningDate").value = employee.joiningDate;
  document.getElementById("status").value = employee.status;
  document.getElementById("dialogTitle").textContent = "Update Employee";
  dialog.showModal();
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const id = document.getElementById("employeeId").value;
  const employeeData = {
    id: id || `EMP-${Date.now()}`,
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    position: document.getElementById("position").value,
    salary: Number(document.getElementById("salary").value),
    joiningDate: document.getElementById("joiningDate").value,
    status: document.getElementById("status").value
  };

  if (!employeeData.name || !employeeData.phone || !employeeData.email ||
      !employeeData.position || !employeeData.joiningDate ||
      !Number.isFinite(employeeData.salary) || employeeData.salary < 0) {
    alert("Please enter valid information in all required fields.");
    return;
  }

  if (id) {
    employees = employees.map(employee =>
      employee.id === id ? employeeData : employee
    );
  } else {
    employees.push(employeeData);
  }

  saveEmployees();
  renderEmployees();
  dialog.close();
  form.reset();
});

tableBody.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const { action, id } = button.dataset;
  if (action === "edit") {
    openEditDialog(id);
  } else if (action === "delete") {
    const employee = employees.find(item => item.id === id);
    if (employee && confirm(`Delete ${employee.name}'s record?`)) {
      employees = employees.filter(item => item.id !== id);
      saveEmployees();
      renderEmployees();
    }
  }
});

document.getElementById("addEmployeeBtn").addEventListener("click", openAddDialog);
document.getElementById("closeDialog").addEventListener("click", () => dialog.close());
document.getElementById("cancelBtn").addEventListener("click", () => dialog.close());
document.getElementById("searchInput").addEventListener("input", renderEmployees);
document.getElementById("statusFilter").addEventListener("change", renderEmployees);

renderEmployees();
