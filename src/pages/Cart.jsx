import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between border p-2 mb-2">
              <span>{item.name} x {item.qty}</span>
              <span>${item.price * item.qty}</span>
              <button
                className="bg-red-500 text-white px-2"
                onClick={() => dispatch(removeFromCart(item._id))}
              >
                Remove
              </button>
            </div>
          ))}
          <h3 className="mt-4 font-bold">Total: ${total}</h3>
          <Link to="/checkout" className="bg-green-500 text-white px-4 py-2 inline-block mt-4">
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
