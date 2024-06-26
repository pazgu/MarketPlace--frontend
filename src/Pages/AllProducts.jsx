/* eslint-disable no-unused-vars */
import useAxios from "../Hooks/useAxios"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PRODUCTS_BASE_URL } from "../constants/url.constant";
import Product from "../Components/Product";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {
    async function getProducts() {
      const page = searchParams.get("page") || 1;
      if (page < 1) searchParams.set("page", 1);
      setSearchParams(searchParams);

      const options = {
        params: {
          name: searchParams.get("name"),
          minPrice: searchParams.get("minPrice"),
          maxPrice: searchParams.get("maxPrice"),
          inStock: searchParams.get("inStock"),
          page: page,
          limit: 6,
        },
      };
      try {
        const response = await axios.get(PRODUCTS_BASE_URL, options);
        const { products, total, page, pages } = response.data;
        setProducts(products);
        setTotalPages(pages);
        setCurrentPage(page);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProducts();
  }, [searchParams]);

  function handleFilterChange(ev) {
    const inputName = ev.target.name;

    if (ev.target.type === "checkbox") {
      const checked = ev.target.checked;
      searchParams.set(inputName, checked);
    } else {
      const value = ev.target.value;
      searchParams.set(inputName, value);
    }

    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  function handlePagination(ev) {
    const value = ev.target.value;
    searchParams.set("page", value);
    setSearchParams(searchParams);
  }

  if(products.length === 0) return;

  return (
    <>
      <Link to="create">Create product</Link>
      <div className="my-8 space-y-2">
        <div>
          <div>
            <label htmlFor="isSomthing">Page: </label>
            <input
              className="outline outline-sky-500"
              min={1}
              id="page"
              name="page"
              type="number"
              value={searchParams.get("page") || "1"}
              onChange={handlePagination}
            />
          </div>
          <label htmlFor="inStock">In stock: </label>
          <input
            className="outline outline-sky-500"
            id="inStock"
            name="inStock"
            type="checkbox"
            checked={searchParams.get("inStock") === "true" || false}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            className="outline outline-sky-500"
            id="name"
            name="name"
            type="text"
            value={searchParams.get("name") || ""}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="minPrice">minPrice: </label>
          <input
            className="outline outline-sky-500"
            id="minPrice"
            name="minPrice"
            type="number"
            value={searchParams.get("minPrice") || 0}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="maxPrice">maxPrice: </label>
          <input
            className="outline outline-sky-500"
            id="maxPrice"
            name="maxPrice"
            type="number"
            value={searchParams.get("maxPrice") || Number.MAX_SAFE_INTEGER}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {products.map((product) => {
          return (
            <Link to={`${product._id}`} key={product._id}>
              <div className="bg-gray-300 p-4">
                <h4>{product.name}</h4>
                <p>{product.price}</p>
                <p>{product.category}</p>
                <p>{product.quantity > 0 ? "In Stock" : "Out of Stock"}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePagination({ target: { value: index + 1 } })}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  )
}

export default AllProducts