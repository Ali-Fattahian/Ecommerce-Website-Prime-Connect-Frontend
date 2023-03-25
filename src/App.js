import "./custom.scss";
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import AllProductsPage from "./pages/AllProductsPage";
import Loader from "./components/Loader";
import NoMatchPage from "./pages/NoMatchPage";
import UsersListPage from "./pages/UsersListPage";
import EditUserProfilePage from "./pages/EditUserProfilePage";
import ProductsListPage from "./pages/ProductsListPage";
import EditProductPage from "./pages/EditProductPage";
import OrderListPage from "./pages/OrderListPage";
import OrderPage from "./pages/OrderPage";
import EnterCardInformationPage from "./pages/EnterCardInformationPage";
import CreateProductPage from "./pages/CreateProductPage";

function App() {
  return (
    <Router>
      <Suspense>
        <Routes fallback={<Loader />}>
          <Route path="/" element={<HomePage />} />
          <Route path="products/:productId" element={<ProductPage />} />
          <Route path="/cart/:id" element={<CartPage />} />
          <Route path="cart/" element={<CartPage />} />
          <Route path="orders/:orderId" element={<OrderPage />} />
          <Route
            path="pay-order/:orderId"
            element={<EnterCardInformationPage />}
          />
          <Route path="/login/" element={<LoginPage />} />
          <Route path="/register/" element={<RegisterPage />} />
          <Route path="/all-products/" element={<AllProductsPage />} />
          <Route
            path="/edit-products/:productId"
            element={<EditProductPage />}
          />
          {/* <Route path="/profile/" element={<ProfilePage />} /> */}
          <Route path="/shipping/" element={<ShippingPage />} />
          <Route path="/payment/" element={<PaymentPage />} />
          <Route path="/placeorder/" element={<PlaceOrderPage />} />
          {/* <Route path="/order/:orderId" element={<OrderPage />} /> */}
          <Route path="/admin/user-list/" element={<UsersListPage />} />
          <Route path="/admin/product-list/" element={<ProductsListPage />} />
          <Route path="/admin/order-list/" element={<OrderListPage />} />
          <Route
            path="/admin/create-product/"
            element={<CreateProductPage />}
          />
          <Route path="/users/:userId/edit" element={<EditUserProfilePage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
