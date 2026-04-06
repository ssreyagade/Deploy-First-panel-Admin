import { useEffect, useState } from "react";
import "../styles/style.css";

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch from static JSON in public folder
  const fetchEmployees = async () => {
    try {
      const res = await fetch("/data.json"); // public/data.json
      const data = await res.json();
      setEmployees(data.employees || []);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add new employee (in-memory only, no backend)
  const addEmployee = () => {
    if (!name || !role) return;

    const newEmployee = {
      id: employees.length ? employees[employees.length - 1].id + 1 : 1,
      name,
      role,
    };

    setEmployees([...employees, newEmployee]);
    setName("");
    setRole("");
  };

  // Delete employee (in-memory only)
  const deleteEmployee = (id) => {
    const filtered = employees.filter((emp) => emp.id !== id);
    setEmployees(filtered);
  };

  // Start editing
  const editEmployee = (emp) => {
    setName(emp.name);
    setRole(emp.role);
    setEditId(emp.id);
  };

  // Update employee
  const updateEmployee = () => {
    const updated = employees.map((emp) =>
      emp.id === editId ? { ...emp, name, role } : emp,
    );
    setEmployees(updated);
    setName("");
    setRole("");
    setEditId(null);
  };

  return (
    <div className="emp-container">
      {/* HEADER */}
      <div className="emp-header">
        <h2>Employee Management</h2>
        <p>Add, edit and manage employees easily.</p>
      </div>

      {/* FORM */}
      <div className="emp-form">
        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        {editId ? (
          <button className="btn-green" onClick={updateEmployee}>
            Update
          </button>
        ) : (
          <button className="btn-indigo" onClick={addEmployee}>
            Add
          </button>
        )}
      </div>

      {/* LIST */}
      <div className="emp-list">
        {employees.length === 0 ? (
          <p className="empty">No employees found</p>
        ) : (
          employees.map((emp) => (
            <div key={emp.id} className="emp-card">
              <div>
                <p className="name">{emp.name}</p>
                <p className="role">{emp.role}</p>
              </div>

              <div className="actions">
                <button
                  className="btn-yellow"
                  onClick={() => editEmployee(emp)}
                >
                  Edit
                </button>

                <button
                  className="btn-red"
                  onClick={() => deleteEmployee(emp.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EmployeeTable;
