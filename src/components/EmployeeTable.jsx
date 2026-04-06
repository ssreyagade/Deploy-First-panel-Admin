import { useEffect, useState } from "react";
import "../styles/style.css";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:3000/employees"; // ⚠️ change for deploy

  const fetchEmployees = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async () => {
    if (!name || !role) return;

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, role }),
    });

    fetchEmployees();
    setName("");
    setRole("");
  };

  const deleteEmployee = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchEmployees();
  };

  const editEmployee = (emp) => {
    setName(emp.name);
    setRole(emp.role);
    setEditId(emp.id);
  };

  const updateEmployee = async () => {
    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, role }),
    });

    fetchEmployees();
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

export default Employees;
