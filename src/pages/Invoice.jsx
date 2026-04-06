import { useState, useEffect } from "react";
import "../styles/style.css";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState(null);

  const categories = ["Men", "Women", "Kids"];

  // Fetch products from public/data.json
  const fetchProducts = async () => {
    try {
      const res = await fetch("/data.json");
      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAddOrUpdate = () => {
    if (!name || !category || !size || !color || !price || !quantity) return;

    const product = {
      id: editId || new Date().getTime(), // temporary id
      name,
      category,
      size,
      color,
      price,
      quantity,
      "main-image": image || "",
      colors: [],
      reviews: [],
    };

    let updatedProducts;
    if (editId) {
      updatedProducts = products.map((p) => (p.id === editId ? product : p));
    } else {
      updatedProducts = [...products, product];
    }

    setProducts(updatedProducts);
    setName("");
    setCategory("");
    setSize("");
    setColor("");
    setPrice("");
    setQuantity("");
    setImage("");
    setEditId(null);
  };

  const handleEdit = (p) => {
    setName(p.name);
    setCategory(p.category);
    setSize(p.size);
    setColor(p.color);
    setPrice(p.price);
    setQuantity(p.quantity);
    setImage(p["main-image"] || "");
    setEditId(p.id);
  };

  const handleDelete = (id) => {
    const filtered = products.filter((p) => p.id !== id);
    setProducts(filtered);
  };

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h1>Clothing Inventory</h1>
        <p>Manage your products, stock, and details easily.</p>
      </div>

      {/* FORM */}
      <div className="inventory-form-box">
        <div className="form-grid">
          <input
            className="input"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Category</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <input
            className="input"
            placeholder="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <input
            className="input"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            className="input"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            className="input"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <input type="file" className="input" onChange={handleImageUpload} />

          {image && <img src={image} alt="preview" className="preview-img" />}
        </div>

        <button
          onClick={handleAddOrUpdate}
          className={`main-btn ${editId ? "update" : ""}`}
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* TABLE */}
      <div className="inventory-table-box">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.category}</td>
                <td>{p.name}</td>
                <td>{p.size}</td>
                <td>₹{p.price}</td>
                <td>{p.quantity}</td>
                <td>
                  {p["main-image"] && (
                    <img src={p["main-image"]} className="table-img" />
                  )}
                </td>
                <td className="actions">
                  <button className="btn-yellow" onClick={() => handleEdit(p)}>
                    Edit
                  </button>
                  <button
                    className="btn-red"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
