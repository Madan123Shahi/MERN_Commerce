import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../api/apiClient';
import { saveUser } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

export default function Login(){
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try{
      const res = await api.post('/auth/login', data);
      saveUser(res.data);
      navigate('/admin');
    }catch(err){
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input {...register('email')} placeholder="Email" className="w-full border p-2" />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <div>
            <input {...register('password')} type="password" placeholder="Password" className="w-full border p-2" />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          <button disabled={isSubmitting} className="w-full bg-emerald-700 text-white py-2 rounded">Login</button>
        </form>
      </div>
    </div>
  );
}
