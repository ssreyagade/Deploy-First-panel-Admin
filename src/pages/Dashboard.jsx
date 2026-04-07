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

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

  useEffect(() => {
    const loadData = async () => {
      try {
        // ✅ Fetch single JSON file
        const res = await fetch("/data.json");
        const data = await res.json();

        const empList = data.employees || [];
        const prodList = data.products || [];
        const ordList = data.orders || [];

        // ✅ CARD COUNTS
        setEmployeesCount(empList.length);
        setProductsCount(prodList.length);
        setOrdersCount(ordList.length);

        // ✅ PRODUCT PRICES
        const prices = prodList.map((p) => Number(p.price) || 0);

        const total = prices.reduce((a, b) => a + b, 0);
        const avg = Math.round(total / (prices.length || 1));
        const min = prices.length ? Math.min(...prices) : 0;
        const max = prices.length ? Math.max(...prices) : 0;

        // ✅ BAR CHART
        setBarData([
          { name: "Min", value: min },
          { name: "Avg", value: avg },
          { name: "Max", value: max },
          { name: "Total", value: total },
        ]);

        // ✅ LINE CHART
        setLineData(
          prices.map((p, i) => ({
            name: `P${i + 1}`,
            price: p,
          })),
        );

        // ✅ PIE CHART
        const categoryMap = {};
        prodList.forEach((p) => {
          categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
        });

        setPieData(
          Object.keys(categoryMap).map((key) => ({
            name: key,
            value: categoryMap[key],
          })),
        );

        // ✅ AREA CHART
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
        console.error("Error loading data:", err);
      }
    };

    loadData();
  }, []);

  const cards = [
    {
      title: "Employees",
      count: employeesCount,
      color: "#ec4899",
      onClick: () => navigate("/employees"),
    },
    {
      title: "Products",
      count: productsCount,
      color: "#22c55e",
      onClick: () => navigate("/inventory"),
    },
    {
      title: "Orders",
      count: ordersCount,
      color: "#3b82f6",
      onClick: () => navigate("/ordertable"),
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h1 className="dashboard-title">Dashboard Analytics</h1>

        {/* ✅ CARDS */}
        <div className="card-grid">
          {cards.map((card) => (
            <div
              key={card.title}
              onClick={card.onClick}
              className="card"
              style={{ backgroundColor: card.color }}
            >
              <h2>{card.title}</h2>
              <p>{card.count}</p>
            </div>
          ))}
        </div>

        {/* ✅ CHARTS */}
        <div className="chart-grid">
          {/* BAR */}
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

          {/* LINE */}
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

          {/* PIE */}
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

          {/* AREA */}
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
