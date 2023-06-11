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
const AllProductsPage = React.lazy(() => import("./pages/AllProductsPage"));
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
      <Suspense>
        <Routes fallback={<Loader />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/enter-email/"
            element={
              <Suspense fallback={<Loader />}>
                <EnterEmailPasswordForgotPage />
              </Suspense>
            }
          />
          <Route
            path="/change-password/:uidb64/:token"
            element={
              <Suspense fallback={<Loader />}>
                <PasswordForgotCheckPage />
              </Suspense>
            }
          />
          <Route
            path="products/:productId"
            element={
              <Suspense fallback={<Loader />}>
                <ProductPage />
              </Suspense>
            }
          />
          <Route
            path="/cart/:id"
            element={
              <Suspense fallback={<Loader />}>
                <CartPage />
              </Suspense>
            }
          />
          <Route
            path="cart/"
            element={
              <Suspense fallback={<Loader />}>
                <CartPage />
              </Suspense>
            }
          />
          <Route
            path="orders/:orderId"
            element={
              <Suspense fallback={<Loader />}>
                <OrderPage />
              </Suspense>
            }
          />
          <Route
            path="pay-order/:orderId"
            element={
              <Suspense fallback={<Loader />}>
                <EnterCardInformationPage />
              </Suspense>
            }
          />
          <Route
            path="/login/"
            element={
              <Suspense fallback={<Loader />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/register/"
            element={
              <Suspense fallback={<Loader />}>
                <RegisterPage />
              </Suspense>
            }
          />
          <Route
            path="/all-products/"
            element={
              <Suspense fallback={<Loader />}>
                <AllProductsPage />
              </Suspense>
            }
          />
          <Route
            path="/edit-products/:productId"
            element={
              <Suspense fallback={<Loader />}>
                <EditProductPage />
              </Suspense>
            }
          />
          {/* <Route path="/profile/" element={<ProfilePage />} /> */}
          <Route
            path="/shipping/"
            element={
              <Suspense fallback={<Loader />}>
                <ShippingPage />
              </Suspense>
            }
          />
          <Route
            path="/payment/"
            element={
              <Suspense fallback={<Loader />}>
                <PaymentPage />
              </Suspense>
            }
          />
          <Route
            path="/placeorder/"
            element={
              <Suspense fallback={<Loader />}>
                <PlaceOrderPage />
              </Suspense>
            }
          />
          {/* <Route path="/order/:orderId" element={<OrderPage />} /> */}
          <Route
            path="/admin/user-list/"
            element={
              <Suspense fallback={<Loader />}>
                <UsersListPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/product-list/"
            element={
              <Suspense fallback={<Loader />}>
                <ProductsListPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/order-list/"
            element={
              <Suspense fallback={<Loader />}>
                <OrderListPage />
              </Suspense>
            }
          />
          <Route
            path="admin/message-management/"
            element={
              <Suspense fallback={<Loader />}>
                <MessageManagementPage />
              </Suspense>
            }
          />
          <Route
            path="admin/received-messages-list/:messageId/"
            element={
              <Suspense fallback={<Loader />}>
                <ReceivedMessageDetailPage />
              </Suspense>
            }
          />
          <Route
            path="admin/sent-messages-list/:messageId/"
            element={
              <Suspense fallback={<Loader />}>
                <SentMessageDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/create-product/"
            element={
              <Suspense fallback={<Loader />}>
                <CreateProductPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/dashboard/"
            element={
              <Suspense fallback={<Loader />}>
                <DashboadPage />
              </Suspense>
            }
          />
          <Route
            path="/users/:userId/edit"
            element={
              <Suspense fallback={<Loader />}>
                <EditUserProfilePage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loader />}>
                <NoMatchPage />
              </Suspense>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
