import React, { Suspense } from "react";
import Row from "react-bootstrap/Row";
import NavbarComponent from "../components/NavbarComponent";

import Footer from "../components/Footer";
import Loader from "../components/Loader";

const NewProducts = React.lazy(() => import("../components/NewProducts"));
const PopularProducts = React.lazy(() =>
  import("../components/PopularProducts")
);

const HomePage = () => {
  return (
    <>
      <NavbarComponent />
      <Suspense fallback={<Loader />}>
        <PopularProducts />
      </Suspense>
      <Row id="homepage-new-products" style={{ justifyContent: "center" }}>
        <div className="text-center p-3">
          <h2
            className="font-family-secondary border-bottom-primary d-inline-block pb-2"
            style={{
              borderColor: "var(--bs-light-cyan)",
              color: "var(--bs-secondary)",
            }}
          >
            NEW PRODUCTS
          </h2>
        </div>
        <Suspense fallback={<Loader />}>
          <NewProducts />
        </Suspense>
      </Row>
      {/* {popularProducts.length > 0 ? <Footer /> : <Footer fixed />} */}
      <Footer />
    </>
  );
};

export default HomePage;
