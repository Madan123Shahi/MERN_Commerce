import React from 'react';
import ProductForm from '../../components/Admin/ProductForm';
import { useNavigate } from 'react-router-dom';

export default function ProductCreate(){
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <ProductForm onSaved={() => navigate('/admin/products')} />
    </div>
  );
}
