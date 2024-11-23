// Employee Array to Store Employee Data
let employees = [];

// Retrieve Employees from Local Storage on Page Load
window.onload = function() {
    if (localStorage.getItem('employees')) {
        employees = JSON.parse(localStorage.getItem('employees'));
        displayEmployees();
    }
};

// DOM Elements
const employeeForm = document.getElementById('employee-form');
const employeeTableBody = document.querySelector('#employee-table tbody');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');

// Handle Form Submission
employeeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const employeeId = document.getElementById('employee-id').value;
    const name = document.getElementById('name').value.trim();
    const position = document.getElementById('position').value.trim();
    const office = document.getElementById('office').value.trim();
    const age = document.getElementById('age').value;
    const startDate = document.getElementById('start-date').value;
    const salary = document.getElementById('salary').value;

    if (employeeId) {
        // Edit Existing Employee
        employees = employees.map(emp => {
            if (emp.id === parseInt(employeeId)) {
                return {
                    id: emp.id,
                    name,
                    position,
                    office,
                    age,
                    startDate,
                    salary
                };
            }
            return emp;
        });
        formTitle.textContent = 'Add New Employee';
        submitBtn.textContent = 'Add Employee';
        cancelBtn.classList.add('hidden');
    } else {
        // Add New Employee
        const newEmployee = {
            id: Date.now(),
            name,
            position,
            office,
            age,
            startDate,
            salary
        };
        employees.push(newEmployee);
    }

    // Save to Local Storage
    localStorage.setItem('employees', JSON.stringify(employees));

    // Reset Form
    employeeForm.reset();
    document.getElementById('employee-id').value = '';

    // Refresh Employee Table
    displayEmployees();
});

// Display Employees in Table
function displayEmployees() {
    // Clear Existing Rows
    employeeTableBody.innerHTML = '';

    // Populate Rows
    employees.forEach(emp => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${emp.name}</td>
            <td>${emp.position}</td>
            <td>${emp.office}</td>
            <td>${emp.age}</td>
            <td>${emp.startDate}</td>
            <td>${emp.salary}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editEmployee(${emp.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>
        `;

        employeeTableBody.appendChild(tr);
    });
}

// Edit Employee
function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        document.getElementById('employee-id').value = employee.id;
        document.getElementById('name').value = employee.name;
        document.getElementById('position').value = employee.position;
        document.getElementById('office').value = employee.office;
        document.getElementById('age').value = employee.age;
        document.getElementById('start-date').value = employee.startDate;
        document.getElementById('salary').value = employee.salary;

        formTitle.textContent = 'Edit Employee';
        submitBtn.textContent = 'Update Employee';
        cancelBtn.classList.remove('hidden');
    }
}

// Delete Employee
function deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
        employees = employees.filter(emp => emp.id !== id);
        localStorage.setItem('employees', JSON.stringify(employees));
        displayEmployees();
    }
}

// Handle Cancel Button
cancelBtn.addEventListener('click', function() {
    employeeForm.reset();
    document.getElementById('employee-id').value = '';
    formTitle.textContent = 'Add New Employee';
    submitBtn.textContent = 'Add Employee';
    cancelBtn.classList.add('hidden');
});