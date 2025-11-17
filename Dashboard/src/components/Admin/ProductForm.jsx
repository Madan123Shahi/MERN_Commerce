import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../../api/apiClient';

const schema = yup.object({
  name: yup.string().required('Name required'),
  price: yup.number().required('Price required').min(0),
  stock: yup.number().required('Stock required').min(0),
});

export default function ProductForm({ initial = null, onSaved }){
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });
  const [images, setImages] = useState(initial?.images || []);

  useEffect(()=>{
    if(initial){ setValue('name', initial.name); setValue('price', initial.price); setValue('stock', initial.stock); setValue('description', initial.description || ''); setValue('category', initial.category || ''); setValue('brand', initial.brand || ''); }
  }, [initial]);

  const onSubmit = async (data) => {
    try{
      const payload = { ...data, images };
      if(initial) await api.put(`/products/${initial._id}`, payload);
      else await api.post('/products', payload);
      onSaved && onSaved();
    }catch(err){ alert(err.response?.data?.message || err.message); }
  };

  const handleFiles = async (e) => {
    const files = e.target.files;
    if(!files.length) return;
    const form = new FormData();
    for(const f of files) form.append('images', f);
    try{
      const res = await api.post('/uploads', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      const uploaded = res.data.uploaded || res.data;
      const urls = uploaded.map(u => u.url || u.path || u.secure_url || u.public_id);
      setImages(prev => [...prev, ...urls]);
    }catch(err){ alert('Upload failed'); }
  };

  const removeImage = (url) => setImages(prev => prev.filter(u => u !== url));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow max-w-2xl">
      <div className="grid gap-3">
        <input {...register('name')} placeholder="Name" className="border p-2" />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>

        <textarea {...register('description')} placeholder="Description" className="border p-2 h-24" />

        <div className="grid grid-cols-2 gap-2">
          <input {...register('price')} type="number" placeholder="Price" className="border p-2" />
          <input {...register('stock')} type="number" placeholder="Stock" className="border p-2" />
        </div>
        <p className="text-red-500 text-sm">{errors.price?.message}</p>

        <div className="grid grid-cols-2 gap-2">
          <input {...register('category')} placeholder="Category" className="border p-2" />
          <input {...register('brand')} placeholder="Brand" className="border p-2" />
        </div>

        <div>
          <label className="block mb-2 font-medium">Images</label>
          <input type="file" multiple onChange={handleFiles} />
          <div className="flex gap-2 mt-2 flex-wrap">
            {images.map(url => (
              <div key={url} className="relative">
                <img src={url} alt="img" className="h-24 w-24 object-cover rounded" />
                <button type="button" onClick={() => removeImage(url)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">x</button>
              </div>
            ))}
          </div>
        </div>

        <button className="bg-emerald-700 text-white px-4 py-2 rounded" disabled={isSubmitting}>{initial ? 'Update' : 'Create'}</button>
      </div>
    </form>
  );
}
