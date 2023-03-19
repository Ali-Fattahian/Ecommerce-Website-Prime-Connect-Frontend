import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const filters = JSON.parse(localStorage.getItem("productFilters"));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      baseURL: "http://localhost:8000",
    };
    const { data } = await axios.get(
      `api/products/?brand=${filters.brandFilter}&?subCategory__name=${filters.subCategoryFilter}&hasDiscount=${filters.hasDiscount}&search=${filters.searchQuery}&ordering=${filters.orderBy}`,
      config
    );
    return data;
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (id) => {
    const { data } = await axios.get(
      `http://localhost:8000/api/products/${id}`
    );
    return data;
  }
);

export const fetchSubCategories = createAsyncThunk(
  "products/fetchSubCategories",
  async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      baseURL: "http://localhost:8000",
    };
    const { data } = await axios.get("api/products/sub-categories", config);
    return data;
  }
);

export const fetchBrands = createAsyncThunk(
  "products/fetchBrands",
  async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      baseURL: "http://localhost:8000",
    };
    const { data } = await axios.get("api/products/brands", config);
    return data["brands"];
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id, token }) => {
    const { data } = await axios.delete(
      `http://localhost:8000/api/products/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      }
    );
    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (updateData) => {
    const token = updateData.token;
    const { formData } =  updateData
    delete updateData.token;

    const { data } = await axios.put(
      `api/products/${updateData.id}`,
      formData,
      {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "multipart/form-data",
        },
        baseURL: "http://localhost:8000",
      }
    );
    return data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    success: false,
    error: null,
    allProducts: localStorage.getItem("allProducts")
      ? JSON.parse(localStorage.getItem("allProducts"))
      : [],
    allSubCategories: localStorage.getItem("allSubCategories")
      ? JSON.parse(localStorage.getItem("allSubCategories"))
      : [],
    brands: localStorage.getItem("brands")
      ? JSON.parse(localStorage.getItem("brands"))
      : [],
    product: localStorage.getItem("product")
      ? JSON.parse(localStorage.getItem("product"))
      : null,
    productFilters: localStorage.getItem("productFilters")
      ? JSON.parse(localStorage.getItem("productFilters"))
      : {
          searchQuery: "",
          orderBy: "",
          brandFilter: "",
          subCategoryFilter: "",
          hasDiscount: null,
        },
  },
  reducers: {
    updateFetchProductsFilters(state, action) {
      state.productFilters = action.payload;
      localStorage.setItem("productFilters", JSON.stringify(action.payload));
    },
    clearFetchProductsFilters(state) {
      const initialFilter = {
        searchQuery: "",
        orderBy: "",
        brandFilter: "",
        subCategoryFilter: "",
        hasDiscount: null,
      };
      state.productFilters = initialFilter;
      localStorage.setItem("productFilters", JSON.stringify(initialFilter));
      window.location.reload();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.allProducts = action.payload;
        localStorage.setItem("allProducts", JSON.stringify(action.payload));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.allSubCategories = action.payload;
        localStorage.setItem(
          "allSubCategories",
          JSON.stringify(action.payload)
        );
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.brands = action.payload;
        localStorage.setItem("brands", JSON.stringify(action.payload));
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload;
        localStorage.setItem("product", JSON.stringify(action.payload));
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
export const { updateFetchProductsFilters, clearFetchProductsFilters } =
  productSlice.actions;
