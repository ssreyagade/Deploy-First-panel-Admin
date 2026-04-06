import { useEffect, useState } from "react";
import { getEmployees, addEmployee, deleteEmployee } from "../services/api";
import EmployeeTable from "../components/EmployeeTable";
import "../styles/style.css";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const loadEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleAdd = async () => {
    if (!name || !role) return;
    await addEmployee({ name, role });
    setName("");
    setRole("");
    loadEmployees();
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees();
  };

  return (
    <div className="employees-container">
      <div className="employees-box">
        <h2 className="employees-title">Employees</h2>

        {/* ADD FORM */}
        <div className="employee-form">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <button onClick={handleAdd}>Add Employee</button>
        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          <EmployeeTable employees={employees} deleteEmployee={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default Employees;
