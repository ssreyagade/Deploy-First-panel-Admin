import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();

  const [employeesCount, setEmployeesCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  const [barData, setBarData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [areaData, setAreaData] = useState([]);

  const API_EMPLOYEES = "http://localhost:3000/employees";
  const API_PRODUCTS = "http://localhost:3000/products";
  const API_ORDERS = "http://localhost:3000/orders";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, prodRes, ordRes] = await Promise.all([
          fetch(API_EMPLOYEES),
          fetch(API_PRODUCTS),
          fetch(API_ORDERS),
        ]);

        const [empData, prodData, ordData] = await Promise.all([
          empRes.json(),
          prodRes.json(),
          ordRes.json(),
        ]);

        setEmployeesCount(empData.length);
        setProductsCount(prodData.length);
        setOrdersCount(ordData.length);

        const prices = prodData.map((p) => Number(p.price) || 0);

        const total = prices.reduce((a, b) => a + b, 0);
        const avg = Math.round(total / (prices.length || 1));
        const min = Math.min(...prices);
        const max = Math.max(...prices);

        // BAR
        setBarData([
          { name: "Min", value: min },
          { name: "Avg", value: avg },
          { name: "Max", value: max },
          { name: "Total", value: total },
        ]);

        // LINE
        setLineData(
          prices.map((p, i) => ({
            name: `P${i + 1}`,
            price: p,
          })),
        );

        // PIE
        const categoryMap = {};
        prodData.forEach((p) => {
          categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
        });

        setPieData(
          Object.keys(categoryMap).map((key) => ({
            name: key,
            value: categoryMap[key],
          })),
        );

        // AREA
        let cumulative = 0;
        const area = prices.map((p, i) => {
          cumulative += p;
          return {
            name: `P${i + 1}`,
            total: cumulative,
          };
        });
        setAreaData(area);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      title: "Employees",
      count: employeesCount,
      bg: "from-pink-400 via-pink-500 to-pink-600",
      onClick: () => navigate("/employees"),
    },
    {
      title: "Products",
      count: productsCount,
      bg: "from-green-400 via-green-500 to-green-600",
      onClick: () => navigate("/inventory"),
    },
    {
      title: "Orders",
      count: ordersCount,
      bg: "from-blue-400 via-blue-500 to-blue-600",
      onClick: () => navigate("/ordertable"),
    },
  ];

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h1 className="dashboard-title">Dashboard Analytics</h1>

        {/* CARDS */}
        <div className="card-grid">
          {cards.map((card) => (
            <div
              key={card.title}
              onClick={card.onClick}
              className={`card ${card.title.toLowerCase()}`}
            >
              <h2>{card.title}</h2>
              <p>{card.count}</p>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="chart-grid">
          <div className="chart-box">
            <h3>Sales Comparison</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h3>Price Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#22c55e" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h3>Category Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={80} label>
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h3>Cumulative Sales</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#f59e0b"
                  fill="#fde68a"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
