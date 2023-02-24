import "./custom.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products/:productId" element={<ProductPage />} />
        <Route path="/cart/:id" element={<CartPage />} />
        <Route path="cart/" element={<CartPage />} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/register/" element={<RegisterPage />} />
        {/* <Route path="/profile/" element={<ProfilePage />} /> */}
        <Route path="/shipping/" element={<ShippingPage />} />
        <Route path="/payment/" element={<PaymentPage />} />
        <Route path="/placeorder/" element={<PlaceOrderPage />} />
        {/* <Route path="/order/:orderId" element={<OrderPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
