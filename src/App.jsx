import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar"; // ✅ fixed path
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Inventory from "./pages/Inventary"; // ✅ spelling fixed
import Orders from "./pages/Orders";
import OrderTable from "./pages/OrderTable";
import ProductDetails from "./pages/ProductDetails";
import Invoice from "./pages/Invoice";
import NotFound from "./pages/NotFound";

import "./styles/style.css";

function App() {
  return (
    <BrowserRouter>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-image.jpeg')" }}
      >
        <div className="min-h-screen bg-white/30 backdrop-sm">
          <div className="flex">
            <Sidebar>
              <Navbar userName="Admin" companyName="MyCompany" />
              <div className="pt-20 px-4">
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
      </div>
    </BrowserRouter>
  );
}

export default App;
