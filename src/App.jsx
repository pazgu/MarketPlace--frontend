import { Route, Routes } from "react-router-dom";
import './App.css'
import HomePage from "./Pages/HomePage";
import MyProducts from "./Pages/MyProducts";
import AllProducts from "./Pages/AllProducts";
import ProductDetails from "./Pages/ProductDetails";
import ModalAddProduct from "./Pages/ModalAddProduct";
import NotFoundPage from "./Pages/NotFoundPage";
import CreateNewProduct from "./Pages/CreateNewProduct";
import Navbar from "./Components/Navbar";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";

function App() {

  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="myProducts" element={<MyProducts/>} />
        <Route path="login" element={<LoginPage/>} />
        <Route path="register" element={<RegisterPage/>} />
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
