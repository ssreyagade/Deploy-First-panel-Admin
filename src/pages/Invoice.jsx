import { useEffect, useState } from "react";
import "../styles/style.css";

const API_ORDERS = "/data.json"; // deploy-ready

function Invoice() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(API_ORDERS);
        const data = await res.json();

        const confirmedOrders = data.orders.filter((o) => o.confirmed === true);

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
    <div className="invoice-page">
      <div className="invoice-box">
        <h1 className="invoice-title">Invoices</h1>

        {orders.length === 0 ? (
          <p className="no-data">No confirmed orders yet.</p>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="invoice-table">
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
                      <td data-label="Order ID">{order.id}</td>
                      <td data-label="Product">{order.productName}</td>
                      <td data-label="Category">{order.category}</td>
                      <td data-label="Price">₹{order.price}</td>
                      <td data-label="Qty">{order.quantity}</td>
                      <td data-label="Total">
                        ₹{order.price * order.quantity}
                      </td>
                      <td data-label="Action">
                        <button
                          onClick={() => handleSendInvoice(order)}
                          className="btn-invoice"
                        >
                          Send Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* TOTAL */}
            <div className="invoice-total">Total Price: ₹{totalPrice}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Invoice;
