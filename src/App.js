import "./custom.scss";
import { Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
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
import MessageManagementPage from "./pages/MessageManagementPage";
import ReceivedMessageDetailPage from "./pages/ReceivedMessageDetailPage";
import SentMessageDetailPage from "./pages/SentMessageDetailPage";
import DashboadPage from "./pages/Admin/DashboadPage";
import EnterEmailPasswordForgotPage from "./pages/EnterEmailPasswordForgotPage";
import PasswordForgotCheckPage from "./pages/PasswordForgotCheckPage";

function App() {
  return (
    <Router>
      <Suspense>
        <Routes fallback={<Loader />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/enter-email/" element={<EnterEmailPasswordForgotPage />} />
          <Route path="/change-password/:uidb64/:token" element={<PasswordForgotCheckPage />} />
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
            path="admin/message-management/"
            element={<MessageManagementPage />}
          />
          <Route
            path="admin/received-messages-list/:messageId/"
            element={<ReceivedMessageDetailPage />}
          />
          <Route
            path="admin/sent-messages-list/:messageId/"
            element={<SentMessageDetailPage />}
          />
          <Route
            path="/admin/create-product/"
            element={<CreateProductPage />}
          />
          <Route path="/admin/dashboard/" element={<DashboadPage />} />
          <Route path="/users/:userId/edit" element={<EditUserProfilePage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
