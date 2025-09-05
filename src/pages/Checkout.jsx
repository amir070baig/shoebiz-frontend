import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearCart } from "../redux/cartSlice";

export default function Checkout() {
  const cart = useSelector((state) => state.cart.cartItems);
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleOrder = async () => {
    if (!user) {
      alert("Please login to place an order");
      return;
    }
    try {
      const orderData = {
        userId: user._id,
        items: cart.map((item) => ({ product: item.name, qty: item.qty, price: item.price })),
        total,
      };
      await axios.post("http://localhost:5000/api/orders", orderData);
      dispatch(clearCart());
      alert("Order placed successfully!");
    } catch (err) {
      alert("Error placing order", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Checkout</h2>
      <p>Total: ${total}</p>
      <button
        className="bg-green-600 text-white px-4 py-2 mt-2"
        onClick={handleOrder}
      >
        Place Order
      </button>
    </div>
  );
}
