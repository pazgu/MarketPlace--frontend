/* eslint-disable no-unused-vars */
import useAxios from "../Hooks/useAxios"
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import Product from "../Components/Product";

function AllProducts() {
  const URL ="http://localhost:3000/api/products"
  const { data, error, loading } = useAxios(URL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    <Link to="create">Create product</Link>
      <div>
      { data?.map((product) =>(
        <div key={product._id}>
          <p>{product._id}</p>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <p>{product.category}</p>
          <br></br>
        </div>
      ))}
    </div>
  </>
  )
}

export default AllProducts