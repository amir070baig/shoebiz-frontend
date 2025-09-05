import { useEffect, useState } from "react";
import axios from "axios";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🛍️ Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white border rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 p-4 flex flex-col items-center text-center"
          >
            <div className="w-full h-48 overflow-hidden rounded-md mb-4">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover hover:scale-105 transition"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
            <p className="text-gray-600 mt-1">{p.description}</p>
            <p className="text-xl font-bold text-blue-600 mt-2">${p.price}</p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              onClick={() => dispatch(addToCart(p))}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div >
  );
}
