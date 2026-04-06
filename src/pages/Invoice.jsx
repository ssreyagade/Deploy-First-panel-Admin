import { useEffect, useState } from "react";
import "../styles/style.css";

const API_ORDERS = "http://localhost:3000/orders"; // ⚠️ change for deployment

function Invoice() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(API_ORDERS);
        const data = await res.json();
        const confirmedOrders = data.filter((o) => o.confirmed === true);
        setOrders(confirmedOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const handleSendInvoice = (order) => {
    alert(`Invoice sent for order: ${order.id}`);
  };

  const totalPrice = orders.reduce((sum, o) => sum + o.price * o.quantity, 0);

  return (
    <div className="invoice-container">
      <div className="invoice-box">
        <h1 className="invoice-title">Invoices</h1>

        {orders.length === 0 ? (
          <p className="no-data">No confirmed orders yet.</p>
        ) : (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.productName}</td>
                      <td>{order.category}</td>
                      <td>₹{order.price}</td>
                      <td>{order.quantity}</td>
                      <td>₹{order.price * order.quantity}</td>
                      <td>
                        <button
                          className="btn-invoice"
                          onClick={() => handleSendInvoice(order)}
                        >
                          Send Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="total-price">Total Price: ₹{totalPrice}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Invoice;
