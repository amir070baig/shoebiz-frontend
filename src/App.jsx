import { Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/authSlice";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";

export default function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div>
      <nav className="p-4 bg-black text-white flex gap-4">
        <Link to="/">Shoebiz</Link>
        <Link to="/cart">Cart</Link>
        {user ? (
          <>
            <span>Hello, {user.name}</span>
            <button onClick={() => dispatch(logout())} className="bg-red-500 px-2">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}
