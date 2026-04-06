import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // ⚡ Static JSON for deploy
  const API_ORDERS = "/data.json"; // Place your JSON file in /public folder

  const fetchConfirmedOrders = async () => {
    try {
      const res = await fetch(API_ORDERS);
      const data = await res.json();

      // Assuming your JSON structure: { orders: [ ... ] }
      const confirmedOrders = data.orders.filter((o) => o.confirmed === true);
      setOrders(confirmedOrders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchConfirmedOrders();
  }, []);

  return (
    <div className="orderTable-container">
      {/* HEADER */}
      <div className="orderTable-header">
        <h2>Confirmed Orders</h2>
        <p>View all successfully confirmed orders.</p>
      </div>

      {/* TABLE */}
      <div className="orderTable-box">
        {orders.length === 0 ? (
          <p className="no-data">No confirmed orders yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    {order["main-image"] && (
                      <img
                        src={order["main-image"]}
                        alt={order.productName}
                        className="table-img"
                      />
                    )}
                  </td>

                  <td className="bold">{order.productName}</td>
                  <td className="gray">{order.category}</td>
                  <td>₹{order.price}</td>
                  <td>{order.quantity}</td>
                  <td className="bold">₹{order.price * order.quantity}</td>

                  <td>
                    <span className="badge-confirmed">Confirmed</span>
                  </td>

                  <td>
                    <button
                      onClick={() => navigate(`/product/${order.productId}`)}
                      className="btn-view"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default OrderTable;
