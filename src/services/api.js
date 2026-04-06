const BASE_URL = "http://localhost:3000";

export const getEmployees = async () => {
  const res = await fetch(`${BASE_URL}/employees`);
  return res.json();
};

export const addEmployee = async (employee) => {
  await fetch(`${BASE_URL}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
};

export const deleteEmployee = async (id) => {
  await fetch(`${BASE_URL}/employees/${id}`, {
    method: "DELETE",
  });
};
