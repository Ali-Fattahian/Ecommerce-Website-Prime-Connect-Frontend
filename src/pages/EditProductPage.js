import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";

import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/slices/productSlice";
import Container from "react-bootstrap/esm/Container";
import EditProductForm from "../components/EditProductForm";
import Message from "../components/Message";

const EditProductPage = () => {
  const { productId } = useParams();
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const { product, error, loading, allSubCategories } = products;
  const { userInfo } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if(userInfo.isAdmin)
      dispatch(fetchProduct(productId));
  }, [dispatch, navigate, productId]);

  // if (!product) window.location.reload(); // I realized no matter what, it's not loading quick enough, but it gets created in localhost anyways, so i decided to reload the page and fetch it from localhost so it gets loaded really fast

  return (
    <Container>
      {loading && <Loader />}
      {!loading && !product && (
        <Message variant="info" className="mt-4">
          This product doesn't exist
        </Message>
      )}
      {!loading && product && (
        <EditProductForm
          product={product}
          error={error}
          loading={loading}
          userInfo={userInfo}
          allSubCategories={allSubCategories}
        />
      )}
    </Container>
  );
};

export default EditProductPage;
