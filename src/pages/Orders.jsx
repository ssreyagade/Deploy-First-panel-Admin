import { useEffect, useState } from "react";
import "../styles/style.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  const API_ORDERS = "/data.json";

  const fetchOrders = async () => {
    try {
      const res = await fetch(API_ORDERS);
      const data = await res.json();

      // ensure confirmed field exists
      const updated = data.orders.map((o) => ({
        ...o,
        confirmed: o.confirmed || false,
      }));

      setOrders(updated);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const confirmOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, confirmed: true } : o)),
    );
    alert("Order Confirmed ✅");
  };

  return (
    <div className="orders-container">
      <h1 className="orders-title">Orders</h1>

      {/* DESKTOP TABLE */}
      <div className="orders-table-box">
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
                <td>{order.productName}</td>
                <td>{order.category}</td>
                <td>₹{order.price}</td>
                <td>{order.quantity}</td>
                <td className="bold">₹{order.price * order.quantity}</td>
                <td>
                  {order.confirmed ? (
                    <span className="confirmed">Confirmed</span>
                  ) : (
                    <button
                      onClick={() => confirmOrder(order.id)}
                      className="btn-confirm"
                    >
                      Confirm
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
      <div className="orders-mobile">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="card-top">
              {order["main-image"] && (
                <img
                  src={order["main-image"]}
                  alt={order.productName}
                  className="card-img"
                />
              )}

              <div>
                <h2>{order.productName}</h2>
                <p className="gray">{order.category}</p>
                <p>
                  ₹{order.price} × {order.quantity}
                </p>
                <p className="bold">Total: ₹{order.price * order.quantity}</p>
              </div>
            </div>

            <div className="card-action">
              {order.confirmed ? (
                <span className="confirmed">Confirmed</span>
              ) : (
                <button
                  onClick={() => confirmOrder(order.id)}
                  className="btn-confirm full"
                >
                  Confirm Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && <p className="no-orders">No orders available</p>}
    </div>
  );
}

export default Orders;
