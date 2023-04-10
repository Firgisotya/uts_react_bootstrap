import React from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import User from "./views/users/index.jsx"
import CreateUser from "./views/users/create.jsx"
import EditUser from "./views/users/edit.jsx"
import Employee from "./views/employee/index.jsx"
import CreateEmployee from "./views/employee/create.jsx"
import EditEmployee from "./views/employee/edit.jsx"
import Product from "./views/products/index.jsx"
import CreateProduct from "./views/products/create.jsx"
import EditProduct from "./views/products/edit.jsx"
import Payment from "./views/payments/index.jsx"
import CreatePayment from "./views/payments/create.jsx"
import EditPayment from "./views/payments/edit.jsx"
import Home from "./views/home";

function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
        <Route path="/" element={<Home/>} />
          {/* user route */}
          <Route path="/user" element={<User />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/editUser/:id" element={<EditUser />} />
          {/* employee route */}
          <Route path="/employee" element={<Employee />} />
          <Route path="/createEmployee" element={<CreateEmployee />} />
          <Route path="/editEmployee/:id" element={<EditEmployee />} />
          {/* product route */}
          <Route path="/product" element={<Product />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
          {/* payment route */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/createPayment" element={<CreatePayment />} />
          <Route path="/editPayment/:id" element={<EditPayment />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
