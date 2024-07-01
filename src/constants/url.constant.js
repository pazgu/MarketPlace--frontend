/* eslint-disable no-undef */
export const PRODUCTS_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api/products"
    : "//localhost:3000/api/products";

export const AUTH_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api/auth"
    : "//localhost:3000/api/auth";
