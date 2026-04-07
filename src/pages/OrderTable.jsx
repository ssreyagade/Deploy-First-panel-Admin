import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const API_ORDERS = "/data.json";

  const fetchConfirmedOrders = async () => {
    try {
      const res = await fetch(API_ORDERS);
      const data = await res.json();

      const confirmedOrders = data.orders.filter((o) => o.confirmed === true);
      setOrders(confirmedOrders);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConfirmedOrders();
  }, []);

  return (
    <div className="orderTable-container">
      <div className="orderTable-header">
        <h2>Confirmed Orders</h2>
        <p>View all successfully confirmed orders.</p>
      </div>

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
                  <td data-label="Image">
                    {order["main-image"] && (
                      <img
                        src={order["main-image"]}
                        alt={order.productName}
                        className="table-img"
                      />
                    )}
                  </td>

                  <td data-label="Product" className="bold">
                    {order.productName}
                  </td>

                  <td data-label="Category" className="gray">
                    {order.category}
                  </td>

                  <td data-label="Price">₹{order.price}</td>

                  <td data-label="Qty">{order.quantity}</td>

                  <td data-label="Total" className="bold">
                    ₹{order.price * order.quantity}
                  </td>

                  <td data-label="Status">
                    <span className="badge-confirmed">Confirmed</span>
                  </td>

                  <td data-label="Action">
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
