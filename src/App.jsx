import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"; // ✅ ADD THIS
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Inventory from "./pages/Inventary";
import Orders from "./pages/Orders";
import OrderTable from "./pages/OrderTable";
import ProductDetails from "./pages/ProductDetails";
import Invoice from "./pages/Invoice";
import NotFound from "./pages/NotFound";

import "./styles/style.css";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: "url('/bg-image.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{ minHeight: "100vh", background: "rgba(255,255,255,0.3)" }}
        >
          <Sidebar open={open} setOpen={setOpen}>
            <Navbar setOpen={setOpen} />

            <div className="page-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/ordertable" element={<OrderTable />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Sidebar>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
