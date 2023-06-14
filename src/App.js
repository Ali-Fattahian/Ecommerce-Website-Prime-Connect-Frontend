import "./custom.scss";
import React, { Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const ProductPage = React.lazy(() => import("./pages/ProductPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const PlaceOrderPage = React.lazy(() => import("./pages/PlaceOrderPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const ShippingPage = React.lazy(() => import("./pages/ShippingPage"));
const PaymentPage = React.lazy(() => import("./pages/PaymentPage"));
const AllProductsPage = React.lazy(() => import(/*webpackPrefetch: true*/"./pages/AllProductsPage"));
const NoMatchPage = React.lazy(() => import("./pages/NoMatchPage"));
const UsersListPage = React.lazy(() => import("./pages/UsersListPage"));
const EditUserProfilePage = React.lazy(() =>
  import("./pages/EditUserProfilePage")
);
const ProductsListPage = React.lazy(() => import("./pages/ProductsListPage"));
const EditProductPage = React.lazy(() => import("./pages/EditProductPage"));
const OrderListPage = React.lazy(() => import("./pages/OrderListPage"));
const OrderPage = React.lazy(() => import("./pages/OrderPage"));
const EnterCardInformationPage = React.lazy(() =>
  import("./pages/EnterCardInformationPage")
);
const CreateProductPage = React.lazy(() => import("./pages/CreateProductPage"));
const MessageManagementPage = React.lazy(() =>
  import("./pages/MessageManagementPage")
);
const ReceivedMessageDetailPage = React.lazy(() =>
  import("./pages/ReceivedMessageDetailPage")
);
const EnterEmailPasswordForgotPage = React.lazy(() =>
  import("./pages/EnterEmailPasswordForgotPage")
);
const SentMessageDetailPage = React.lazy(() =>
  import("./pages/SentMessageDetailPage")
);
const PasswordForgotCheckPage = React.lazy(() =>
  import("./pages/ReceivedMessageDetailPage")
);
const DashboadPage = React.lazy(() => import("./pages/Admin/DashboadPage"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/enter-email/"
            element={<EnterEmailPasswordForgotPage />}
          />
          <Route
            path="/change-password/:uidb64/:token"
            element={<PasswordForgotCheckPage />}
          />
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
