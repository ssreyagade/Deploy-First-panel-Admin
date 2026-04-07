import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaDollarSign, FaBoxes, FaRuler, FaPalette } from "react-icons/fa";
import "../styles/style.css";

const API_URL = "/data.json";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Resolve image URLs
  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/400";
    if (img.startsWith("/images")) return `${window.location.origin}${img}`;
    return img;
  };

  const fetchProduct = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      // For static JSON, data.products = [...]
      const prod = data.products.find((p) => p.id === parseInt(id));
      if (!prod) return;

      // Ensure colors exist
      if (!prod.colors || prod.colors.length === 0) {
        prod.colors = [
          {
            name: prod.color || "Default",
            images: prod["main-image"] ? [prod["main-image"]] : [""],
          },
        ];
      }

      setProduct(prod);
      setSelectedColor(prod.colors[0]);
      setCurrentImage(0);
    } catch (err) {
      console.error("Failed to fetch product:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const nextImage = () =>
    setCurrentImage(
      (prev) => (prev + 1) % (selectedColor?.images?.length || 1),
    );

  const prevImage = () =>
    setCurrentImage((prev) =>
      prev === 0 ? (selectedColor?.images?.length || 1) - 1 : prev - 1,
    );

  const handleAddReview = async () => {
    if (!reviewText.trim()) return;

    const updatedProduct = {
      ...product,
      reviews: [...(product.reviews || []), reviewText],
    };

    // For deploy, you can skip actual PUT request if using static JSON
    setProduct(updatedProduct);
    setReviewText("");
  };

  if (!product || !selectedColor) return <p className="loading">Loading...</p>;

  return (
    <div className="pd-container">
      <div className="pd-box">
        <h1 className="pd-title">{product.name}</h1>
        <p className="pd-category">
          Category: {product.category || "Unspecified"}
        </p>

        <div className="pd-layout">
          {/* IMAGE SECTION */}
          <div className="pd-images">
            <div className="main-image-box">
              <img
                src={getImageUrl(selectedColor.images[currentImage])}
                alt={product.name}
              />

              {selectedColor.images.length > 1 && (
                <>
                  <button className="nav-btn left" onClick={prevImage}>
                    {"<"}
                  </button>
                  <button className="nav-btn right" onClick={nextImage}>
                    {">"}
                  </button>
                </>
              )}
            </div>

            <div className="thumbnails">
              {selectedColor.images.map((img, i) => (
                <img
                  key={i}
                  src={getImageUrl(img)}
                  onClick={() => setCurrentImage(i)}
                  className={i === currentImage ? "active" : ""}
                />
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div className="pd-details">
            {/* COLORS */}
            <div className="color-buttons">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setSelectedColor(c);
                    setCurrentImage(0);
                  }}
                  className={selectedColor.name === c.name ? "active" : ""}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* INFO */}
            <div className="pd-info">
              <p>
                <FaDollarSign /> ₹{product.price}
              </p>
              <p>
                <FaBoxes /> {product.quantity}
              </p>
              <p>
                <FaRuler /> {product.size}
              </p>
              <p>
                <FaPalette /> {selectedColor.name}
              </p>
            </div>

            {/* REVIEWS */}
            <div className="reviews">
              <h2>Customer Reviews</h2>

              <div className="review-input">
                <input
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write a review..."
                />
                <button onClick={handleAddReview}>Submit</button>
              </div>

              <div className="review-list">
                {(product.reviews || []).length > 0 ? (
                  product.reviews.map((r, i) => (
                    <div key={i} className="review-item">
                      {r}
                    </div>
                  ))
                ) : (
                  <p className="no-review">No reviews yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
