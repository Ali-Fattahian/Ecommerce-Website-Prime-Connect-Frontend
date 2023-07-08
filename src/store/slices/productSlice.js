import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const baseURL = "https://prime-connect.onrender.com/api";
const baseURL = 'http://localhost:8000/api'

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const filters = JSON.parse(localStorage.getItem("productFilters"));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      baseURL: baseURL,
    };
    const { data } = await axios.get(
      `/products/?brand=${filters.brandFilter}&subCategory__name=${
        filters.subCategoryFilter
      }&subCategory__category__name=${
        filters.categoryFilter ? filters.categoryFilter : ""
      }&hasDiscount=${filters.hasDiscount}&search=${
        filters.searchQuery
      }&ordering=${filters.orderBy}`,
      config
    );
    return data;
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (id) => {
    const { data } = await axios.get(`${baseURL}/products/${id}`);
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
      baseURL: baseURL,
    };
    const { data } = await axios.get("/products/sub-categories", config);
    return data;
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      baseURL: baseURL,
    };
    const { data } = await axios.get("/products/categories", config);
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
      baseURL: baseURL,
    };
    const { data } = await axios.get("/products/brands", config);
    return data["brands"];
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id, token }) => {
    const { data } = await axios.delete(`${baseURL}/products/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (updateData) => {
    const token = updateData.token;
    const { formData } = updateData;
    delete updateData.token;

    const { data } = await axios.put(
      `/products/product-edit/${updateData.id}`,
      formData,
      {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "multipart/form-data",
        },
        baseURL: baseURL,
      }
    );
    return data;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (createData) => {
    const token = createData.token;
    const { formData } = createData;
    delete createData.token;

    const { data } = await axios.post(
      `${baseURL}/products/create-product`,
      formData,
      {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "multipart/form-data",
        },
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
    allCategories: localStorage.getItem("allCategories")
      ? JSON.parse(localStorage.getItem("allCategories"))
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
          categoryFilter: "",
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
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error =
          "A problem occured while fetching the products, Make sure you have a stable internet connection";
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
      .addCase(fetchSubCategories.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error =
          "A problem occured while fetching the sub categories, Make sure you have a stable internet connection";
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.allCategories = action.payload;
        localStorage.setItem("allCategories", JSON.stringify(action.payload));
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error =
          "A problem occured while fetching the categories, Make sure you have a stable internet connection";
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
      .addCase(fetchBrands.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error =
          "A problem occured while fetching the brands, Make sure you have a stable internet connection";
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
      .addCase(fetchProduct.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error =
          "A problem occured while fetching the product's details, Make sure you have a stable internet connection";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error =
          "A problem occured while deleting the product, Make sure you have a stable internet connection";
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = false;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error =
          "A problem occured while updating the product's information, Make sure you have a stable internet connection";
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error =
          "A problem occured while creating the product, Make sure you have a stable internet connection";
      });
  },
});

export default productSlice.reducer;
export const { updateFetchProductsFilters, clearFetchProductsFilters } =
  productSlice.actions;
