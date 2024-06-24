import { Route, Routes } from "react-router-dom";
import './App.css'
import HomePage from "./Pages/HomePage";
import MyProducts from "./Pages/MyProducts";
import AllProducts from "./Pages/AllProducts";
import ProductDetails from "./Pages/ProductDetails";
import ModalAddProduct from "./Pages/ModalAddProduct";
import NotFoundPage from "./Pages/NotFoundPage";
import CreateNewProduct from "./Pages/CreateNewProduct";

function App() {

  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="myProducts" element={<MyProducts/>} />
        <Route path="/products">
        <Route index element={<AllProducts />} />
          <Route path=":productId" element={<ProductDetails />} />
          <Route path="create" element={<ModalAddProduct />}>
            <Route index element={<CreateNewProduct/>} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
