/* eslint-disable no-undef */
export const PRODUCTS_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api/products"
    : "//localhost:3000/api/products";
