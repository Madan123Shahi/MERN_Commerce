import React, { useEffect, useState } from 'react';
import api from '../../api/apiClient';
import { Link, useNavigate } from 'react-router-dom';

export default function ProductList(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    try{
      const res = await api.get('/products');
      setProducts(res.data.products || res.data);
    }catch(err){
      console.error(err);
      alert('Failed to load products');
    }finally{ setLoading(false); }
  };

  useEffect(()=>{ load(); }, []);

  const handleDelete = async (id) => {
    if(!confirm('Delete product?')) return;
    try{
      await api.delete(`/products/${id}`);
      setProducts(p => p.filter(x => x._id !== id));
    }catch(err){ alert(err.response?.data?.message || err.message); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Products</h2>
        <Link to="/admin/products/create" className="bg-emerald-700 text-white px-3 py-1 rounded">Create</Link>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="bg-white rounded shadow overflow-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id} className="border-t">
                  <td className="p-2"><img src={p.images?.[0] || 'https://via.placeholder.com/80'} className="h-16 w-16 object-cover" /></td>
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">₹{p.price}</td>
                  <td className="p-2">{p.stock}</td>
                  <td className="p-2">
                    <button onClick={() => navigate(`/admin/products/edit/${p._id}`)} className="mr-2 bg-yellow-400 px-2 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(p._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
