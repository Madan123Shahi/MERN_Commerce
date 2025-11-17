import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/products/ProductList';
import ProductCreate from './pages/products/ProductCreate';
import ProductEdit from './pages/products/ProductEdit';
import ProtectedAdmin from './components/ProtectedAdmin';

export default function App(){
  return (
    <Routes>
      <Route path="/admin/login" element={<Login/>} />

      <Route path="/admin" element={<ProtectedAdmin><AdminLayout/></ProtectedAdmin>}>
        <Route index element={<Dashboard/>} />
        <Route path="products" element={<ProductList/>} />
        <Route path="products/create" element={<ProductCreate/>} />
        <Route path="products/edit/:id" element={<ProductEdit/>} />
      </Route>

      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
