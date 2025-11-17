import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/apiClient';
import ProductForm from '../../components/Admin/ProductForm';

export default function ProductEdit(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const load = async ()=>{
      try{ const res = await api.get(`/products/${id}`); setProduct(res.data); }
      catch(err){ alert('Failed to load'); }
    };
    load();
  }, [id]);

  if(!product) return <p>Loading...</p>;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductForm initial={product} onSaved={() => navigate('/admin/products')} />
    </div>
  );
}
