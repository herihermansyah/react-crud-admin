import { Route, Routes } from "react-router-dom";
import Frame from "./routes/Frame";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductsView from "./components/features/products/ProductView";
import ProductsAdd from "./components/features/products/ProductAdd";
import ProductsEdit from "./components/features/products/productEdit";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Frame />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="productsView/:id" element={<ProductsView />} />
          <Route path="productsEdit/:edit_ID" element={<ProductsEdit />} />
          <Route path="productsAdd" element={<ProductsAdd />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}

export default App;
