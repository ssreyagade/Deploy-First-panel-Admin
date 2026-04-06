import { useEffect, useState } from "react";
import "../styles/style.css";

function OrdersTable() {
  const [orders, setOrders] = useState([]);

  // Fetch from public/data.json
  const fetchConfirmedOrders = async () => {
    try {
      const res = await fetch("/data.json"); // public/data.json
      const data = await res.json();
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
    <div className="ot-container">
      <h2 className="ot-title">Confirmed Orders</h2>

      {orders.length === 0 ? (
        <p className="ot-empty">No confirmed orders yet.</p>
      ) : (
        <div className="ot-table-box">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
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
                        className="ot-img"
                      />
                    )}
                  </td>

                  <td>{order.productName}</td>
                  <td className="gray">{order.category}</td>
                  <td>₹{order.price}</td>
                  <td>{order.quantity}</td>
                  <td className="bold">₹{order.price * order.quantity}</td>

                  <td>
                    <span className="confirmed">Confirmed</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrdersTable;
