import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { iProduct } from "@/interface/product";

const productApi = createApi({
  reducerPath: "product",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<iProduct[], void>({
      query: () => `/products`,
      providesTags: ["Product"],
    }),
    getIdProducts: builder.query<iProduct, number | string>({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    removeProduct: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    addProduct: builder.mutation<iProduct,iProduct>({
        query:(product)=>({
            url:'/products',
            method: 'POST',
            body: product
        }),
        invalidatesTags: ["Product"],
    }),
    updateProducts: builder.mutation<iProduct, iProduct>({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetIdProductsQuery,
  useAddProductMutation,
  useRemoveProductMutation,
  useUpdateProductsMutation,
} = productApi;

export const productReducer = productApi.reducer;

export default productApi;
